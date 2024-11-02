import type { AxiosRequestConfig } from 'axios'

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// 添加需要忽略错误处理的接口路径
export const ignoreErrors: string[] = ['/auth/login']
