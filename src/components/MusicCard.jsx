import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { music: { trackId } } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favorite_songs'));
    const hasFavorite = favorites.some((music) => music.trackId === trackId);
    if (hasFavorite) {
      this.setState({ checked: true });
    }
  }

  handleCheckbox = (e) => {
    const { music, handleFavorite } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked }, () => {
      handleFavorite(e, music);
    });
  };

  render() {
    const { trackName, previewUrl, music } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <label htmlFor="favorite">
          Favorita
          <input
            onChange={ this.handleCheckbox }
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
            checked={ checked }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
};
