import api from './config'
import type { AxiosResponse } from 'axios'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterResponse {
  id: number
  username: string
}

export const authAPI = {
  login: (LoginRequest: LoginRequest): Promise<LoginResponse> =>
    api
      .post<LoginResponse>('/auth/login', LoginRequest)
      .then((response: AxiosResponse<LoginResponse>) => response.data),
  register: (registerRequest: RegisterRequest): Promise<RegisterResponse> =>
    api
      .post<RegisterResponse>('/auth/register', registerRequest)
      .then((response: AxiosResponse<RegisterResponse>) => response.data)
}
