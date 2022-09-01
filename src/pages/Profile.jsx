import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    userName: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userName = await getUser();
      this.setState({
        userName,
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
    const { name, email, image, description } = userName;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading
            ? <Loading />
            : (
              <div>
                <h1>Profile</h1>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <h3>Nome</h3>
                <p>{ name }</p>
                <h3>E-mail</h3>
                <p>{ email }</p>
                <h3>Descrição</h3>
                <p>{ description }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </>
    );
  }
}
