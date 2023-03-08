import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './services/auth';
import Appointments from './components/Appointments';

function App() {

  useEffect(() => {
    handleLogin()
  }, []);

  const handleLogin = () => {
    const loginBody = {
      username: 'HieuVo',
      password: '12345678'
    }
    
    login(loginBody)
  }
  
  return (
    <div className="App">
      <Appointments />
    </div>
  );
}

export default App;
