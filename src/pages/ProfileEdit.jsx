import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/ProfileEdit.css';
import { Redirect } from 'react-router-dom';

export default class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  };

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const user = await getUser();
        const { name, email, image, description } = user;
        this.setState({
          loading: false,
          name,
          email,
          description,
          image,
        });
      },
    );
  }

  handlechange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value }, () => {
      const { name, email, description, image } = this.state;
      const validate = [name, email, description, image]
        .some((item) => item.length === 0);
      this.setState({ Disabled: validate });
    });
  };

  handleClick = () => {
    this.setState(
      { loading: true },
      async () => {
        const { name, email, description, image } = this.state;
        await updateUser({ name, email, description, image });
        this.setState({
          loading: false,
        });
        const { history } = this.props;
        history.push('/profile');
      },
    );
  };

  render() {
    const { loading, name, email, description, image, Disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form className="content-edit">
            <img data-testid="profile-image" src={ image } alt={ name } />
            <div>
              <label htmlFor="image">
                Imagem:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  value={ image }
                  id="image"
                  onChange={ this.handlechange }
                  placeholder="Insira uma url"
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  id="name"
                  value={ name }
                  onChange={ this.handlechange }
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  value={ email }
                  id="email"
                  onChange={ this.handlechange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  value={ description }
                  id="description"
                  onChange={ this.handlechange }
                  cols="30"
                  rows="4"
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ Disabled }
                onClick={ this.handleClick }
              >
                Salvar

              </button>

            </div>
          </form>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
