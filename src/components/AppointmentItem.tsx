import React, { useCallback, useEffect, useState } from 'react';
import { getClinicById } from '../services/appointments';
import { AppointmentSlot, Clinic, Provider } from '../zoomcare-api';
import ProviderImage from '../provider.png';
import { formatAMPM, formatPhonenumber } from '../utils';

interface Props {
  provider: Provider;
}

export default function AppointmentItem({ provider }: Props) {
  const [clinic, setClinic] = useState<Clinic>();

  useEffect(() => {
    if (provider.clinicId) fetchClinic();
  }, [provider.clinicId]);

  const fetchClinic = async () => {
    const clinic = await getClinicById(String(provider.clinicId));

    setClinic(clinic);
  };

  const renderTimeButton = useCallback(() => {
    const date = provider.startTime?.split(' ')[0];
    const time = provider.startTime?.split(' ')[1];
    const secondTime = `${date} ${time?.split('-')[1]} UTC`;
    const firstTime = `${date} ${time?.split('-')[0]} UTC`;

    return (
      <div className="btn-group">
        <button className="btn-time">{formatAMPM(firstTime)}</button>
        <button className="btn-time">{formatAMPM(secondTime)}</button>
      </div>
    );
  }, [provider.startTime]);

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
          alt={provider.name}
        />
        <div className="provider-info">
          <h4 className="provider-title">{`${provider.name}, ${provider.credentials}`}</h4>
          <p className="provider-phone text-gray">
            {formatPhonenumber(provider.phoneNumber + '')}
          </p>
          {renderTimeButton()}
        </div>
      </div>
    </div>
  ) : null;
}
