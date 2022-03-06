import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Helmet, HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta charset="utf-8" />
        <title>Me.Moe</title>
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);