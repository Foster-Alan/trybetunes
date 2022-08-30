import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    username: '',
    loading: false,
  };

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      username: userInfo,
      loading: false,
    });
  };

  render() {
    const {
      username,
      loading,
    } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { loading ? <Loading /> : `${username.name} está aqui` }
        </p>

      </header>
    );
  }
}
