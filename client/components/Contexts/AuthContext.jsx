/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Router from 'next/router';
import { toast } from 'react-toastify';

import {
  UserLogin,
  UserSignup,
  LikeItem,
  DeleteLikeItem,
} from '../../actions/auth';

const AuthContext = React.createContext({});

const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    this.likeItem = this.likeItem.bind(this);
    this.deleteLikeItem = this.deleteLikeItem.bind(this);

    this.state = {
      user: {},
      cart: [],
      loading: false,

      login: this.login,
      signup: this.signup,
      logout: this.logout,
      addToCart: this.addToCart,
      emptyCart: this.emptyCart,
      likeItem: this.likeItem,
      deleteLikeItem: this.deleteLikeItem,
    };
  }

  componentDidMount() {
    const savedCart = JSON.parse(localStorage.getItem('TIC2601Cart'));
    const loggedInUser = JSON.parse(localStorage.getItem('TIC2601User'));

    this.setState({ user: loggedInUser ? loggedInUser : {} });
    this.setState({ cart: savedCart ? savedCart : [] });
  }

  async addToCart(item) {
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

  async emptyCart() {
    localStorage.setItem('TIC2601Cart', JSON.stringify([]));
    this.setState({ cart: [] });
  }

  async likeItem(userId, itemId) {
    const [err, res] = await LikeItem(userId, itemId);
    if (err) {
      console.log(err);
      return;
    }
    toast.success(`You liked item ID:${itemId}`);
    return res;
  }

  async deleteLikeItem() {
    const [err, res] = await DeleteLikeItem(userId, itemId);
    if (err) {
      console.log(err);
      return;
    }
    toast.success(`You deleted your like on item ID:${itemId}`);
    return res;
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
    localStorage.setItem('TIC2601User', JSON.stringify(res.data.data[0]));
    this.setState({ user: res.data.data[0] });
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
