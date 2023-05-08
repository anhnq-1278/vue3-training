<template>
  <div>
    <h3>user-name: {{ user.username }}</h3>
    <p>email: {{ user.email }}</p>
  </div>
</template>
<script setup lang="ts">
import type { UserDTO } from '@/interface/user.dto'

defineProps<{
  user: UserDTO
}>()
</script>
