import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorite: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      favorite: await getFavoriteSongs(),
    });
  }

  // Função para adicionar favorito.//
  addFavorite = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { favorite } = this.state;
      this.setState({
        favorite: [...favorite, this.props],
        loading: false,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    const favoriteSongs = favorite.some((song) => trackId === song.trackId);

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="myCheckBox">
          Favorita
          <input
            id="myCheckBox"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.addFavorite }
            checked={ favoriteSongs }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
