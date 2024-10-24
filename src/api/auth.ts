import api from './config'
import type { AxiosResponse } from 'axios'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const authAPI = {
  login: (LoginRequest: LoginRequest): Promise<LoginResponse> =>
    api
      .post<LoginResponse>('/auth/login', LoginRequest)
      .then((response: AxiosResponse<LoginResponse>) => response.data)
}
