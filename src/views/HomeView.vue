<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserAPI } from '@/api/user'
import type { User } from '@/api/user'

const user = ref<User[]>([])

onMounted(async () => {
  try {
    console.log(await UserAPI.getUserById(1))
  } catch (error) {
    console.error('failed to fecth user', error)
  }
})
</script>

<template>
  <main></main>
</template>
