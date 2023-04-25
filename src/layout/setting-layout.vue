<template>
  <div class="w-full min-h-screen flex">
    <div class="w-[400px] bg-white pt-[100px]">
      <div class="flex flex-col items-center">
        <img
          :src="
            myAccount.avatar ||
            'https://i.pinimg.com/564x/7c/d4/a1/7cd4a1b2ba0d1eb12b19bcfb47e0f20b.jpg'
          "
          alt="avatar"
          class="w-[150px] h-[150px] rounded-full"
        />
        <h2 class="text-[30px] text-pink-8 font-extralight text-center mt-5">
          {{ myAccount.name || myAccount.username }}
        </h2>
      </div>
      <div class="flex flex-col mt-10">
        <router-link :to="{ name: RouteName.PROFILE }" custom v-slot="{ href, navigate, isActive }">
          <NavLink
            :href="href"
            @click="navigate"
            :class="`w-full h-[50px] flex items-center border-l-4 pl-5 text-lg hover:bg-[#f5f5f5] hover:border-l-pink-8 duration-200 cursor-pointer
              ${isActive ? 'border-l-pink-8 bg-[#f5f5f5]' : 'border-l-transparent bg-transparent'}`"
          >
            Profile
          </NavLink>
        </router-link>

        <router-link
          :to="{ name: RouteName.PASSWORD }"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <NavLink
            :href="href"
            @click="navigate"
            :class="`w-full h-[50px] flex items-center border-l-4 pl-5 text-lg hover:bg-[#f5f5f5] hover:border-l-pink-8 duration-200 cursor-pointer
              ${isActive ? 'border-l-pink-8 bg-[#f5f5f5]' : 'border-l-transparent bg-transparent'}`"
          >
            Password
          </NavLink>
        </router-link>
      </div>
    </div>
    <div class="flex-1 bg-pink-f6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/constants'
import CommonStore from '@/store/Common'
import { storeToRefs } from 'pinia'

const { myAccount } = storeToRefs(CommonStore())
</script>
