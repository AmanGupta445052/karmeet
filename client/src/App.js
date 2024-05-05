import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Register from './components/Auth/Register/register.component';
import Login from './components/Auth/Login/Login.component';
import Dashboard from './dashboard';
import Lobby from './screens/Lobby';
import Room from './screens/Room';
import DashboardloggedIn from './dashboard-loggedIn';
import ChatScreen from './components/ChatScreen';
function App() {
  return (
    <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard-loggedIn" element={<DashboardloggedIn />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/ChatScreen" element={<ChatScreen />} />
      </Routes>
    </Router>
  </React.StrictMode>
  );
}

export default App;
