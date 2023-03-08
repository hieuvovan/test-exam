import React from 'react'

interface Props {
  appointment: {}
}

export default function AppointmentItem({ appointment }: Props) {
  return (
    <div className='appointment'>
      { JSON.stringify(appointment)}
    </div>
  )
}