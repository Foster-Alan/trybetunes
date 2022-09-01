import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    artist: '',
    albums: [],
    search: '',
    ButtonDisabled: true,
    loading: false,
  };

  // Função procurar nome

  handlechange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { artist } = this.state;
      if (artist.length > 1) {
        this.setState({ ButtonDisabled: false });
      }
    });
  };

  // Função botão

  handleclick = () => {
    const { artist } = this.state;
    this.setState(
      { loading: true, search: artist },
      async () => {
        const albums = await searchAlbumsAPI(artist);
        this.setState({
          albums,
          artist: '',
          loading: false,
        });
      },

    );
  };

  render() {
    const {
      artist,
      albums,
      search,
      ButtonDisabled,
      loading,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <input
              type="text"
              name="artist"
              data-testid="search-artist-input"
              placeholder="Banda / Artista"
              value={ artist }
              onChange={ this.handlechange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ ButtonDisabled }
              onClick={ this.handleclick }
            >
              Pesquisar
            </button>
          </div>
        )}
        <div>
          {!albums.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <p>{`Resultado de álbuns de: ${search}`}</p>
              {albums.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h4>{ artistName }</h4>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
