import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  render() {
    const { value, handleChange, checked } = this.props;
    const { trackName, previewUrl, trackId } = value;
    return (
      <div className="content-music">
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ handleChange }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  value: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
}.isRequired;
