import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Favorites extends Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading ? <Loading /> : <Header userName={ userName } />}
      </div>
    );
  }
}
