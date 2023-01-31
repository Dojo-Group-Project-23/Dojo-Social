import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
