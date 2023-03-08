import React, { useState, useEffect } from 'react'
import { getAppointments } from '../services/appointments'
import {  AppointmentSlot } from '../zoomcare-api'
import AppointmentItem from './AppointmentItem'

export default function Appointments() {
  const [appointments, setAppointments] = useState<AppointmentSlot[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const appointmentSlots: AppointmentSlot[] = await getAppointments() as AppointmentSlot[]

    setAppointments(appointmentSlots)
  }


  return (
    <ul className='appointment-list'>
      {appointments.map((appointment: AppointmentSlot) => (
        <li key={appointment.id} className='appointment-item'>
          <AppointmentItem appointment={appointment} />
        </li>
      ))}
    </ul>
  )
}