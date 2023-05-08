<template>
  <tr class="cursor-pointer" @click="showDetailUser(user._id)">
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>
      <input type="checkbox" :checked="user.isActive" />
    </td>
    <td>
      <IconTrash />
    </td>
  </tr>
</template>

<script setup lang="ts">
import IconTrash from '@/assets/icons/IconTrash.vue'
import type { UserDTO } from '@/interface/user.dto'
defineProps<{
  user: UserDTO
}>()

const emit = defineEmits(['showDetailUser'])

const showDetailUser = (id: string) => {
  emit('showDetailUser', id)
}
</script>
