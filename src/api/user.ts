import api from './config'
import type { AxiosResponse } from 'axios'
export interface User {
  id: Number
  name: String
  email: String
}

export const UserAPI = {
  getUser: (id: number): Promise<User> =>
    api.get<User>(`/user/${id}`).then((response: AxiosResponse<User>) => response.data)
}
