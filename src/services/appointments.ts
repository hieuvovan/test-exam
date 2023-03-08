import { AppointmentsDto, Clinic } from '../zoomcare-api';
import { AxiosService } from './axios';

const axiosInstance = new AxiosService();

export const getAppointments = async () => {
  try {
    const response: AppointmentsDto = (await axiosInstance.get([
      'api',
      'appointments',
    ])) as AppointmentsDto;

    return response.appointmentSlots;
  } catch (error) {
    console.log(error);
  }
};

export const getClinicById = async (clinicId: string) => {
  try {
    const response: Clinic = (await axiosInstance.get([
      'api',
      'clinics',
      clinicId,
    ])) as Clinic;

    return response;
  } catch (error) {
    console.log(error);
  }
};
