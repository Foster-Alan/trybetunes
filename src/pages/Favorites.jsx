import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import '../styles/Favorites.css';

export default class Favorites extends Component {
  state = {
    favoriteSounds: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSounds = await getFavoriteSongs();
      this.setState({
        favoriteSounds,
        loading: false,
      });
    });
  }

  handleChange = async ({ target }) => {
    const { favoriteSounds } = this.state;
    const song = favoriteSounds.find(({ trackId }) => trackId === +target.id);
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      this.setState({
        favoriteSounds: await getFavoriteSongs(),
        loading: false,
      });
    });
  };

  render() {
    const {
      favoriteSounds,
      loading,
    } = this.state;
    return (
      <>
        <Header />
        <div className="content-favorite" data-testid="page-favorites">
          {loading
            ? <Loading />
            : (
              <>
                <h1>Favorites</h1>
                { favoriteSounds.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    value={ music }
                    trackName={ music.trackName }
                    checked={ favoriteSounds
                      .some(({ trackId }) => +trackId === +music.trackId) } // Tentando achar o erro das musicas fantasmas.
                    handleChange={ this.handleChange }
                  />
                )) }
              </>
            )}
        </div>
      </>
    );
  }
}
