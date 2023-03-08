import React, { useCallback, useEffect, useState } from 'react';
import { getClinicById } from '../services/appointments';
import { AppointmentSlot, Clinic } from '../zoomcare-api';
import ProviderImage from '../provider.png';

interface Props {
  appointment: AppointmentSlot;
}

export default function AppointmentItem({ appointment }: Props) {
  const [clinic, setClinic] = useState<Clinic>();

  useEffect(() => {
    if (appointment.clinicId) fetchClinic();
  }, [appointment.clinicId]);

  const fetchClinic = async () => {
    const clinic = await getClinicById(String(appointment.clinicId));

    setClinic(clinic);
  };

  const formatTime = useCallback(() => {
    const date = new Date(appointment.startTime);

    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }, [appointment.startTime]);

  return clinic ? (
    <div className="appointment">
      <div className="clinic">
        <h4 className="clinic-name">{clinic?.name}</h4>
        <p className="clinic-location text-gray">
          {`${clinic?.address} ${clinic?.city}, ${clinic?.state} ${clinic?.zipcode}`}
        </p>
      </div>
      <div className="provider">
        <img
          className="provider-img"
          src={ProviderImage}
          alt={appointment.provider.name}
        />
        <div className="provider-info">
          <h4 className="provider-title">{`${appointment.provider.name}, ${appointment.provider.credentials}`}</h4>
          <p className="provider-phone text-gray">
            {appointment.provider.phoneNumber}
          </p>
          <button className="btn-time">{formatTime()}</button>
        </div>
      </div>
    </div>
  ) : null;
}
