/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from '../styles/GlobalStyles';
import { AuthProvider } from '../components/Contexts/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <AuthProvider>
          <GlobalStyles />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </AuthProvider>
      </>
    );
  }
}

export default MyApp;
