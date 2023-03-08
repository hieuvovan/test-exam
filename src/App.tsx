import React, { useEffect, useState } from 'react';
import './App.css';
import { login } from './services/auth';
import Appointments from './components/Appointments';
import { getAppointments } from './services/appointments';
import { AppointmentSlot, Provider } from './zoomcare-api';

function App() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await handleLogin();
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

    const providers = appointmentSlots.reduce((prev, current): any => {
      return [
        ...prev,
        {
          ...current.provider,
          startTime: current.startTime,
          clinicId: current.clinicId,
        },
      ];
    }, []);

    setProviders(providers);
  };

  return (
    <div className="App">
      <Appointments providers={providers} />
    </div>
  );
}

export default App;
