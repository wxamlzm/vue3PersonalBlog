<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #card>
        <div class="card-header">
          <h2>用户登录</h2>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-position="top"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"> </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="submit-btn"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { UserAPI } from '@/api/user'
import type { User } from '@/api/user'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { authAPI } from '@/api/auth'
import { useRouter } from 'vue-router'

const formRef = ref<FormInstance>()
const router = useRouter()

let loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    await authAPI.login({
      username: loginForm.username,
      password: loginForm.password
    })
    router.push('/')
  } catch (error: any) {
    if (error.response?.data.message) {
      ElMessage.error(error.response.data.message)
    } else if (error.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('注册失败，请稍后重试')
    }
  } finally {
    loading.value = false
  }
}
</script>
