import React, { Component } from 'react';
import '../styles/Loading.css';

// rendeziar  "Carregando"
export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }
}
