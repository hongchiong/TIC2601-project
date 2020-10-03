/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { UserLogin, UserSignup } from '../../actions/auth';

const AuthContext = React.createContext({});

const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: {},
      loading: false,

      login: this.login,
      signup: this.signup,
      logout: this.logout,
    };
  }

  componentDidMount() {}

  async login(data) {
    const [err, res] = await UserLogin(data);

    if (err) {
      console.log(err);
      return;
    }

    this.setState({ user: res.data });
    return res;
  }

  async signup(data) {
    const [err, res] = await UserSignup(data);

    if (err) {
      console.log(err);
      return;
    }

    console.log(err, res);
    this.setState({ user: res.data });
    return res;
  }

  logout() {
    this.setState({ user: {} });

    Router.push('/');
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <AuthContext.Provider value={this.state}>
          <>{children}</>
        </AuthContext.Provider>
      </>
    );
  }
}

AuthProvider.defaultProps = {};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default AuthContext;

export { AuthProvider, AuthConsumer };
