<template>
  <div class="flex items-center justify-center h-screen">
    <section class="w-[1000px] h-[600px] border shadow-xs">
      <div class="h-full">
        <!-- Left column container with background-->
        <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
            class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
          >
            <img src="../assets/images/bg1.webp" class="w-full" alt="image" />
          </div>

          <!-- Right column container -->
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <!-- Email input -->
              <div class="relative mb-6">
                <input
                  type="text"
                  class="peer block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[5px] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Email address"
                />
                <label
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[6px] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >Email address
                </label>
              </div>

              <!-- Password input -->
              <div class="relative mb-6">
                <input
                  type="password"
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[5px] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Password"
                />
                <label
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[6px] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >Password
                </label>
              </div>

              <!-- Login button -->
              <div class="text-center lg:text-left">
                <button
                  type="button"
                  class="inline-block rounded bg-[#3B71CA] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white-fb shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-3b hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Login
                </button>

                <!-- Register link -->
                <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <span
                    @click="router.push({ name: RouterName.Login })"
                    class="text-danger cursor-pointer transition duration-150 ease-in-out hover:text-blue-3b focus:text-danger-600 active:text-danger-700"
                    >Login</span
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'

const router = useRouter()
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
