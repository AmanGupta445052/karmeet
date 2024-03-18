import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Register from './components/Auth/Register/register.component';
import Login from './components/Auth/Login/Login.component';
import Dashboard from './dashboard';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  </React.StrictMode>
  );
}

export default App;
