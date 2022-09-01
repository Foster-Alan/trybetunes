import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    artistName: '',
    artworkUrl100: '',
    collectionName: '',
    loading: false,
    listMusic: [],
    favoriteSong: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const collection = await getMusics(id);
      const favoriteSong = await getFavoriteSongs();
      const listMusic = collection.filter((_music, index) => index !== 0);
      this.setState({
        artistName: collection[0].artistName,
        artworkUrl100: collection[0].artworkUrl100,
        collectionName: collection[0].collectionName,
        listMusic,
        favoriteSong,
        loading: false,
      });
    });
  }

  handleChange = async ({ target }) => {
    const { listMusic } = this.state;
    const song = listMusic.find(({ trackId }) => trackId === +target.id);
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      const favoriteSong = await getFavoriteSongs();
      this.setState({
        favoriteSong,
        loading: false,
      });
    });
  };

  render() {
    const {
      loading,
      listMusic,
      artistName,
      artworkUrl100,
      favoriteSong,
      collectionName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {loading
            ? <Loading />
            : (
              <div>
                <h1>Album</h1>
                <img src={ artworkUrl100 } alt={ artistName } />
                <p data-testid="artist-name">{ artistName }</p>
                <p data-testid="album-name">{ collectionName }</p>
                <div>
                  { listMusic.map((music) => (
                    <MusicCard
                      key={ music.trackId }
                      value={ music }
                      checked={ favoriteSong
                        .some(({ trackId }) => +trackId === +music.trackId) }
                      handleChange={ this.handleChange }
                    />
                  )) }
                </div>
              </div>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
