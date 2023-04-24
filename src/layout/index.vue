<template>
  <div class="base-layout">
    <div class="content-layout">
      <div class="flex min-h-screen">
        <Header />
        <div class="fixed bg-[#F8F8F8] h-screen">
          <Sidebar />
        </div>
        <div class="flex-1 ml-[290px] overflow-hidden">
          <div class="h-full bg-white-fb">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from '@/components/common/Header/HeaderItem.vue'
</script>
