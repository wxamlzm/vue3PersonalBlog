import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import axios from '@/utils/axios'

interface UserInfo {
  id: number
  username: string
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>(localStorage.getItem('token') || '')
  const userinfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(false)

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userinfo.value = info
    isLoggedIn.value = true
  }

  // 登录
  const login = async (username: string, password: string) => {
    try {
      const { data } = await axios.post('/api/login', { username, password })

      if (data.token) {
        setToken(data.token)
        setUserInfo(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // 登出
  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    userinfo.value = null
    isLoggedIn.value = false
  }

  return {
    login,
    logout
  }
})
