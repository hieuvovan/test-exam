import React, { useEffect, useState } from 'react';
import './App.css';
import { login } from './services/auth';
import Appointments from './components/Appointments';
import { getAppointments } from './services/appointments';
import { AppointmentSlot } from './zoomcare-api';
import { AuthStorageService } from './services/auth-storage';

const authStorage = new AuthStorageService();

function App() {
  const [appointments, setAppointments] = useState<AppointmentSlot[]>([]);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    if (!authStorage.token) await handleLogin();
    fetchAppointments();
  };

  const handleLogin = async () => {
    const loginBody = {
      username: 'HieuVo',
      password: '12345678',
    };

    await login(loginBody);
  };

  const fetchAppointments = async () => {
    const appointmentSlots: AppointmentSlot[] =
      (await getAppointments()) as AppointmentSlot[];

    setAppointments(appointmentSlots);
  };

  return (
    <div className="App">
      <Appointments appointments={appointments} />
    </div>
  );
}

export default App;
