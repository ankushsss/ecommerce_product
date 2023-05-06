import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/animation.css'
import './assets/css/auth.css'
import './assets/css/bootstrap.min.css'
import './assets/css/color-themes.css'
import './assets/css/confirmDialog.css'
import './assets/css/custom.css'
import './assets/css/flaticon.css'
import './assets/css/main.css'
import './assets/css/media.css'
import './assets/css/left-sidebar.css'



import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/reducer/combineReducer';

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
