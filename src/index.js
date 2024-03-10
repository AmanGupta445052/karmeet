import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker.js';
import 'semantic-ui-css/semantic.min.css';
import Register from './components/Auth/Register/register.component';
import Login from './components/Auth/Login/Login.component';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

serviceWorker.unregister();
