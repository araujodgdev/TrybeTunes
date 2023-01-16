import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    const { setLoading } = this.props;
    setLoading(true);
    this.loadChecked();
    this.getFavorites();
    setLoading(false);
  }

  loadChecked = () => {
    const { music: { trackId } } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favorite_songs'));
    const hasFavorite = favorites.some((music) => music.trackId === trackId);
    if (hasFavorite) {
      this.setState({ checked: true });
    }
  };

  getFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favoriteSongs: [...favorite] }, () => {
      const { favoriteSongs } = this.state;
      const { music: { trackId } } = this.props;
      const hasFavorite = favoriteSongs.some((music) => music.trackId === trackId);
      if (hasFavorite) {
        this.setState({ checked: true });
      }
    });
  };

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
  setLoading: PropTypes.func.isRequired,
};
