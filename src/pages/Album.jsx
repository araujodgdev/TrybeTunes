import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    loading: true,
    userName: '',
    musics: [],
    albumInfo: {},
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const user = await getUser();
    const musicsResult = await getMusics(id);
    this.setState(
      { userName: user.name, musics: musicsResult, albumInfo: musicsResult[0] },
      () => this.setState({ loading: false }),
    );
  }

  render() {
    const { loading, userName, musics, albumInfo } = this.state;
    const musicsList = musics
      .filter((music, _i, arr) => arr.indexOf(music) > 0)
      .map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />
      ));
    return (
      <div data-testid="page-album">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
        <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
        <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
        {musicsList}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
