import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App"; //Ponemos aquí el reducer solo para ver un ejemplo, pero NO es una buena práctica
import { asyncMiddleware } from './middlewares/async';
import { reducer } from "./features/todos";

//EJEMPLO DE CÓMO CREAR UN REDUCER SIMPLE:

const store = createStore(reducer, applyMiddleware(asyncMiddleware));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);
