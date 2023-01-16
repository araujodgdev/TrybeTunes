import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    loadingHeader: true,
    loading: false,
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
      () => this.setState({ loadingHeader: false }),
    );
  }

  setLoading = (bool) => {
    this.setState({ loading: bool });
  };

  handleFavorite = async (e, music) => {
    e.preventDefault();
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
  };

  render() {
    const { loading, userName, musics, albumInfo, loadingHeader } = this.state;
    const musicsList = musics
      .filter((music, _i, arr) => arr.indexOf(music) > 0)
      .map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          music={ music }
          handleFavorite={ this.handleFavorite }
          setLoading={ this.setLoading }
        />
      ));
    return (
      <div data-testid="page-album">
        {loadingHeader ? <Loading /> : <Header userName={ userName } />}
        {loading ? (
          <Loading />
        ) : (
          <div className="album-card">
            <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
            <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
            <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
            {musicsList}
          </div>
        )}
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
