import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker.js';
import 'semantic-ui-css/semantic.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

=======
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
>>>>>>> 01afc2851b5017008f2e127f5a86a33c157135f8
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<<<<<<< HEAD
serviceWorker.unregister();
=======
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> 01afc2851b5017008f2e127f5a86a33c157135f8
