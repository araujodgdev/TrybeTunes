import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { userName } = this.props;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{userName}</h1>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};
