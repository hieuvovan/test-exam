import { AppointmentsDto } from "../zoomcare-api"
import { AxiosService } from "./axios"

const axiosInstance = new AxiosService()

export const getAppointments = async () => {
  try {
    const response: AppointmentsDto = await axiosInstance.get(['api', 'appointments']) as AppointmentsDto

    return response.appointmentSlots

  } catch (error) {
    console.log(error)
  } 
}
