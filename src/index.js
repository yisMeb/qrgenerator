import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

navigator.serviceWorker.register('/storeCache.js')
  .then(registration => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  })
  .catch(error => {
    console.error('ServiceWorker registration failed: ', error);
});

reportWebVitals();
