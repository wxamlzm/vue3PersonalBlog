<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #card>
        <div class="card-header">
          <h2>用户注册</h2>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="createUserForm"
        :rules="createUserRules"
        label-position="top"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="createUserForm.username"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="createUserForm.password" type="password"> </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="createUserForm.confirmPassword" type="password"> </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="submit-btn"> 注册 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { authAPI } from '@/api/auth'

const formRef = ref<FormInstance>()
const router = useRouter()
const loading = ref(false)

const createUserForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 密码验证器
const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    // 当密码发生变化时，重新验证密码
    if (createUserForm.confirmPassword !== '') {
      if (formRef.value) {
        formRef.value.validateField('confirmPassword')
      }
    }

    callback()
  }
}

// 确认密码验证器
const validateConfirmPassword = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== createUserForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const createUserRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
}

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    await authAPI.register({
      username: createUserForm.username,
      password: createUserForm.password
    })

    // 注册逻辑
    ElMessage.success('注册成功！')
    // 可以在这里添加路由跳转等逻辑
  } catch (error: any) {
    if (error.reponse?.data?.message) {
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
