import React from 'react';
import { AppointmentSlot, Provider } from '../zoomcare-api';
import AppointmentItem from './AppointmentItem';

interface Props {
  providers: Provider[];
}

export default function Appointments({ providers }: Props) {
  return (
    <ul className="appointment-list">
      {providers?.map((provider: Provider) => (
        <li
          key={provider.id}
          className="appointment-item"
        >
          <AppointmentItem provider={provider} />
        </li>
      ))}
    </ul>
  );
}
