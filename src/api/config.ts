import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const apiConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const api: AxiosInstance = axios.create(apiConfig)

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求前做些什么，如添加认证token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default api
