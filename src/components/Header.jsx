import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div>
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{userName}</h1>
        </header>
        <nav>
          <Link data-testid="link-to-search" to="/search">
            {' '}
            Pesquisa
            {' '}
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            {' '}
            Favoritos
            {' '}
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            {' '}
            Perfil
            {' '}
          </Link>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};
