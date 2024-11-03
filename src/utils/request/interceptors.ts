import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ignoreErrors } from './config'

// 定义后端响应数据类型
interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

export function setupInterceptors (instance: AxiosInstance): void {
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      // 获取token
      const token = localStorage.getItem('token')
      // 添加token到请求头
      if (token && config?.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        ElMessage.error('请求配置错误：' + error.message)
      }
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<BaseResponse>) => {
      // 假设后端返回格式为{code:number, data:any, message:string}
      const { code, data, message } = response.data

      // 这里假设后端返回格式为
      if (code === 0 || code === 200) {
        return data
      }
      //显示错误信息
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    },
    (error: unknown) => {
      // 处理非axios错误
      if (!axios.isAxiosError(error)) {
        ElMessage.error('发生未知错误')
        return Promise.reject(error)
      }

      // 类型断言为AxiossError
      const axiosError = error as AxiosError<BaseResponse>

      if (axiosError.response) {
        const { status, data } = axiosError.response
        const { config } = axiosError

        // 忽略特定接口的错误处理
        if (config?.url && ignoreErrors.includes(config.url)) {
          return Promise.reject(error)
        }

        switch (status) {
          case 401: {
            handleUnauthorized()
            break
          }
          case 403:
            ElMessage.error('没有权限访问')
            break
          case 404:
            ElMessage.error('请求资源不存在')
            break
          case 500:
            ElMessage.error('服务器错误')
            break
          default:
            ElMessage.error(data?.message || '未知错误')
        }
      } else if (error.request) {
        ElMessage.error('网络错误，请检查网络连接')
      } else {
        ElMessage.error('请求配置错误')
      }

      return Promise.reject(error)
    }
  )
}

/**
 * 处理未授权（401）的情况
 */
function handleUnauthorized (): void {
  try {
    const userStore = useUserStore()
    userStore.logout()

    // 保存当前路由，登录后可以重新定向回来
    const currentPath = router.currentRoute.value.fullPath

    router.push({
      path: '/login',
      query: {
        redirect: currentPath
      }
    })

    ElMessage.error('登录已过期，请重新登录')
  } catch (error) {
    console.error('处理未授权错误失败：', error)
  }
}
