import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './services/store';
import * as t from './services/reducers/user/types';
import AnwyrTest from './services/utils/axios';


if(localStorage['anwyr_test_user']){
  const token = localStorage.getItem('anwyr_test_user');
  const decoded = jwt_decode(token);
  const now = Date.now() / 1000;
  let user = {};
  if(now - decoded.iat > decoded.exp - decoded.iat){
    user = {};
  }else{
    AnwyrTest.defaults.headers['Authorization'] = `Bearer ${token}`;
    user = {
      username: decoded.username,
      email: decoded.email,
    }
  }

  store.dispatch({
    type: t.SET_USER,
    payload: user,
  });

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
