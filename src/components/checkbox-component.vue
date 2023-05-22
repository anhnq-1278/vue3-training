<template>
  <checkbox-input :checked="value" @change="value = !value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import checkboxInput from './checkbox-input.vue'

const value = ref(false)
</script>
