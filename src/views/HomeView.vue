<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { userAPI } from '@/api/user'

onMounted(async () => {
  try {
    // 对密码进行SHA256加密
    const hashedPassword = 'admin'

    console.log(hashedPassword)

    console.log(await userAPI.getUserById(1))
  } catch (error) {
    console.error('failed to fecth user', error)
  }
})
</script>

<template>
  <div>home-view</div>
</template>

<style lang="css"></style>
