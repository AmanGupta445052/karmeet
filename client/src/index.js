import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker.js';
import 'semantic-ui-css/semantic.min.css';
import { SocketProvider } from './context/SocketProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <SocketProvider>
  <App />
  </SocketProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
