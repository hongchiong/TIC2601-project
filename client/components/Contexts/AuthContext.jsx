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
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      user: {},
      cart: [],
      loading: false,

      login: this.login,
      signup: this.signup,
      logout: this.logout,
      addToCart: this.addToCart,
    };
  }

  componentDidMount() {
    const savedCart = JSON.parse(localStorage.getItem('TIC2601Cart'));
    const loggedInUser = JSON.parse(localStorage.getItem('TIC2601User'));

    this.setState({ user: loggedInUser ? loggedInUser : {} });
    this.setState({ cart: savedCart ? savedCart : [] });
  }

  async addToCart(item) {
    console.log(item);

    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].id === item.id) {
        const newCart = this.state.cart;
        newCart[i] = { ...newCart[i], quantity: newCart[i].quantity + 1 };

        localStorage.setItem('TIC2601Cart', JSON.stringify(newCart));
        this.setState({ cart: newCart });
        return;
      }
    }

    const newCart = this.state.cart;
    newCart.push({ ...item, quantity: 1 });
    localStorage.setItem('TIC2601Cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
  }

  async login(data) {
    const [err, res] = await UserLogin(data);

    if (err) {
      console.log(err);
      return;
    }

    localStorage.setItem('TIC2601User', JSON.stringify(res.data.data[0]));
    this.setState({ user: res.data.data[0] });
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
    localStorage.removeItem('TIC2601User');
    this.setState({ user: {} });
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
