import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ignoreErrors } from './config'

export function setupInterceptors (axios: AxiosInstance) {
  // 请求拦截器
  axios.interceptors.request.use(
    config => {
      // 获取token
      const token = localStorage.getItem('token')
      // 添加token到请求头
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  axios.interceptors.response.use(
    response => {
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
    error => {
      if (error.response) {
        const { status, config } = error.response

        // 忽略特定接口的错误处理
        if (ignoreErrors.includes(config.url)) {
          return Promise.reject(error)
        }

        switch (status) {
          case 401: {
            // 清除用户信息
            const userStore = useUserStore()
            userStore.logout()
            // 跳转登录页
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.fullPath
              }
            })
            ElMessage.error('登录已过期，请重新登录')
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
            ElMessage.error(error.response.data?.message || '未知错误')
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
