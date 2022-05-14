import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from "redux";
import './index.css';
import App from './App';

//EJEMPLO DE CÓMO CREAR UN REDUCER SIMPLE:


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
