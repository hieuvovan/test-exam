import React from 'react';
import { AppointmentSlot } from '../zoomcare-api';
import AppointmentItem from './AppointmentItem';

interface Props {
  appointments: AppointmentSlot[];
}

export default function Appointments({ appointments }: Props) {
  return (
    <ul className="appointment-list">
      {appointments?.map((appointment: AppointmentSlot) => (
        <li
          key={appointment.id}
          className="appointment-item"
        >
          <AppointmentItem appointment={appointment} />
        </li>
      ))}
    </ul>
  );
}
