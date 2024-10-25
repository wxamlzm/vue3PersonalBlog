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

const formRef = ref(null)

const createUserForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const createUserRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    // 注册逻辑
    ElMessage.success('注册成功！')
    // 可以在这里添加路由跳转等逻辑
  } catch (error) {
    console.log('表单验证失败', error)
  }
}
</script>
