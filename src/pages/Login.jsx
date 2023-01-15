import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    validName: false,
    user: {
      name: '',
    },
    loading: false,
  };

  validateName = ({ target }) => {
    const { value } = target;
    const minInputLength = 3;
    const condition = value.length >= minInputLength;
    const newUserInfo = {
      name: value,
    };
    this.setState({ validName: condition, user: newUserInfo });
  };

  handleLoginButton = async (e) => {
    const { user } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ loading: false });
  };

  render() {
    const { validName, loading } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="name">
            Nome:
            <input
              onChange={ this.validateName }
              data-testid="login-name-input"
              name="name"
              type="text"
            />
          </label>
          <button
            disabled={ !validName }
            data-testid="login-submit-button"
            type="submit"
            onClick={ async (e) => {
              await this.handleLoginButton(e);
              return history.push('/search');
            } }
          >
            Entrar
          </button>
          {loading ? <Loading /> : null}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
