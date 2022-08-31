import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    music: [],
    loading: true,
  };

  componentDidMount() {
    this.getSound();
  }

  // Função para buscar a musica.
  getSound = async () => {
    const { match: { params: { id } } } = this.props;
    const song = await getMusics(id);
    this.setState({
      music: song,
      loading: false,
    });
  };

  render() {
    const { music, loading } = this.state;
    const musics = music.filter((song) => song.kind === 'song'); // .Kind para buscar a track no MusicCard.
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <section>
            <div>
              <img
                src={ music[0].artworkUrl100 }
                alt={ music[0].collectionName }
                id={ music[0].collectionName }
              />
              <p data-testid="album-name">{ music[0].collectionName }</p>
              <p data-testid="artist-name">{ music[0].artistName }</p>
            </div>
            <div>
              { musics.map((song) => { // .map Para exibir as musicas.
                const { trackId, trackName, previewUrl } = song;
                return (
                  <MusicCard
                    trackId={ trackId }
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;

export default Album;
