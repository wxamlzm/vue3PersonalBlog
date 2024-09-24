<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import { ref, onMounted } from 'vue'
import { UserAPI } from '@/api/user'
import type { User } from '@/api/user'

const user = ref<User[]>([])

onMounted(async () => {
  try {
    console.log(await UserAPI.getUser(1))
  } catch (error) {
    console.error('failed to fecth user', error)
  }
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
