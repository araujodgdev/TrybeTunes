import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Search extends Component {
  state = {
    loading: true,
    userName: '',
    searchValue: '',
    validSearch: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name }, () => this.setState({ loading: false }));
  }

  handleSearchInput = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    const hasMinLength = value.length >= minLength;
    this.setState({ searchValue: value, validSearch: hasMinLength });
  };

  render() {
    const { loading, userName, validSearch, searchValue } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <form action="">
          <label htmlFor="search-input">
            <input
              name="search-input"
              type="text"
              placeholder="Banda ou artista..."
              data-testid="search-artist-input"
              onChange={ this.handleSearchInput }
              value={ searchValue }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !validSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
