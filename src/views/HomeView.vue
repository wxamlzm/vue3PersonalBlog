<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { authAPI } from '@/api/auth'
import SHA256 from 'crypto-js/sha256'

onMounted(async () => {
  try {
    // 对密码进行SHA256加密
    const hashedPassword = SHA256('admin').toString()

    console.log(hashedPassword)

    console.log(await authAPI.login({ username: 'admin', password: hashedPassword }))
  } catch (error) {
    console.error('failed to fecth user', error)
  }
})
</script>

<template>
  <div>home-view</div>
</template>

<style lang="css"></style>
