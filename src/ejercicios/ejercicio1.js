//! EJEMPLO DE CÓMO CREAR UN REDUCER SIMPLE:

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from "redux";
import './index.css';
import App from './App';

const store = createStore((state = 0, action)=>{ //A createStore se le pasa un reducer como argumento
  //action = {type: "tipo de acción que utilizamos", payload: anyData}  *La propiedad payload es opcional
  switch (action.type) {
    case "incrementar": {
      return state +1;
    }
    case "decrementar": {
      return state -1;
    }
    case "set": {
      return action.payload;
    }
    default:
      return state;
  }
})

store.dispatch({ type: "ejemploQueNoFunciona" });
console.log(store.getState())
store.dispatch({ type: "incrementar" });
console.log(store.getState())
store.dispatch({ type: "decrementar" });
console.log(store.getState())
store.dispatch({ type: "set", payload: 15 });
console.log(store.getState())



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);