import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumsList extends Component {
  render() {
    const { list } = this.props;
    const cardList = list.map(
      ({ collectionId, collectionName, artworkUrl100 }) => (
        <div key={ collectionId }>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            {' '}
            {collectionName}
            {' '}
          </Link>
        </div>
      ),
    );
    const noResult = <p>Nenhum álbum foi encontrado</p>;
    return (
      <div>
        {list.length === 0 ? noResult : cardList}
      </div>
    );
  }
}

AlbumsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
