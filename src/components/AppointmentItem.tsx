import React, { useCallback, useEffect, useState } from 'react';
import { getClinicById } from '../services/appointments';
import { AppointmentSlot, Clinic } from '../zoomcare-api';
import ProviderImage from '../provider.png';
import { formatAMPM, formatPhonenumber } from '../utils';

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

  const renderTimeButton = useCallback(() => {
    const secondTime = appointment.startTime.split(' ')[1].split('-')[0];
    const firstTime = appointment.startTime.split(' ')[1].split('-')[1];

    return (
      <div className="btn-group">
        <button className="btn-time">{formatAMPM(firstTime)}</button>
        <button className="btn-time">{formatAMPM(secondTime)}</button>
      </div>
    );
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
            {formatPhonenumber(appointment.provider.phoneNumber + '')}
          </p>
          {renderTimeButton()}
        </div>
      </div>
    </div>
  ) : null;
}
