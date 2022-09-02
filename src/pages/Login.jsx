import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import '../styles/Loguin.css';

export default class Login extends React.Component {
  state = {
    name: '',
    loading: false,
    logged: false,
  };

  // função para o input

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  // Função para o Botão

  handleonClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name })
      .then(() => {
        this.setState({ loading: false, logged: true });
      });
  };

  render() {
    const minCaracters = 3;
    const { name, loading, logged } = this.state;
    if (loading) return <Loading />;
    if (logged) return <Redirect to="/search" />;
    return (
      <div
        className="main-Conteiner"
        id="login"
        data-testid="page-login"
      >
        {' '}
        <h1 className="loguinHeader">Trybe Tunes</h1>
        <form className="loguin-Form">
          <input
            className="loguin-input"
            id="name"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            placeholder="Escreva Seu nome"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleonClick }
            disabled={ name.length < minCaracters }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
