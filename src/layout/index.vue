<template>
  <div class="base-layout">
    <div class="content-layout">
      <div class="flex min-h-screen">
        <div class="fixed bg-white-fb">
          <Sidebar />
        </div>
        <div class="flex-1 ml-[290px] overflow-hidden">
          <div class="h-full bg-white-f1 ">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
</script>
