/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { AuthProvider } from '../components/Contexts/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <AuthProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </AuthProvider>
      </>
    );
  }
}

export default MyApp;
