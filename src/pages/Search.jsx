import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsList from '../components/AlbumsList';

export default class Search extends Component {
  state = {
    loading: false,
    loadingHeader: true,
    userName: '',
    searchValue: '',
    validSearch: false,
    albums: [],
    showResults: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name }, () => this.setState({ loadingHeader: false }));
  }

  handleSearchInput = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    const hasMinLength = value.length >= minLength;
    this.setState({ searchValue: value, validSearch: hasMinLength });
  };

  handleSearchButton = async (e) => {
    e.preventDefault();
    const { searchValue } = this.state;
    const searchInput = searchValue;
    localStorage.setItem('artist', JSON.stringify(searchInput));
    this.setState({ searchValue: '', loading: true });
    const result = await searchAlbumsAPI(searchInput);
    this.setState({ albums: result, loading: false, showResults: true });
  };

  render() {
    const {
      albums,
      loading,
      userName,
      validSearch,
      searchValue,
      loadingHeader,
      showResults,
    } = this.state;
    const form = (
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
          onClick={ this.handleSearchButton }
        >
          Pesquisar
        </button>
      </form>
    );
    const artist = JSON.parse(localStorage.getItem('artist'));
    const presentationTitle = <h2>{`Resultado de álbuns de: ${artist}`}</h2>;
    return (
      <div data-testid="page-search">
        {loadingHeader ? <Loading /> : <Header userName={ userName } />}
        {loading ? <Loading /> : form}
        {albums.length !== 0 ? presentationTitle : null}
        {showResults ? <AlbumsList list={ albums } /> : null}
      </div>
    );
  }
}
