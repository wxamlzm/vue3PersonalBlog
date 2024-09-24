import api from './config'
import type { AxiosResponse } from 'axios'
export interface User {
  id: Number
  name: String
  email: String
}

export const UserAPI = {
  getUserById: (id: number): Promise<User> =>
    api.get<User>(`/users/${id}`).then((response: AxiosResponse<User>) => response.data)
}
