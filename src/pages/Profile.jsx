import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Profile.css';

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
              <div className="content-profile">
                <h1>Profile</h1>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <h2>Nome</h2>
                <p>{ name }</p>
                <h2>E-mail</h2>
                <p>{ email }</p>
                <h2>Descrição</h2>
                <p>{ description }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </>
    );
  }
}
