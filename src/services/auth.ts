import { Login, LoginResponse } from "../zoomcare-api"
import { AxiosService } from "./axios"
import { AuthStorageService } from "./auth-storage"

const axiosInstance = new AxiosService()
const authStorageService = new AuthStorageService()

export const login = async (body: Login) => {
  try {
    const response: LoginResponse = await axiosInstance.post(['api', 'login'], body) as LoginResponse

    authStorageService.token = response.authToken
  } catch (error) {
    console.log(error)
  } 
}
