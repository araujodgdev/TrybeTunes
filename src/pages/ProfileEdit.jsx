import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
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
      <div data-testid="page-profile-edit">
        {loading ? <Loading /> : <Header userName={ userName } />}
      </div>
    );
  }
}
