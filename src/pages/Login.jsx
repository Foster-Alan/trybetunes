import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input data-testid="login-name-input" type="text" placeholder="Loguin" />
      </div>
    );
  }
}
