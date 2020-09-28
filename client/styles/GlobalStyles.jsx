import React from 'react';

const GlobalStyles = () => (
  <style global jsx>
    {`
      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      label {
        margin: 0;
      }
    `}
  </style>
);

export default GlobalStyles;
