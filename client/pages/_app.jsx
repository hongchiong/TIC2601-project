/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';

import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
