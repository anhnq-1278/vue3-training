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
            <Breadcrumb class="mt-[50px] ml-[26px] py-5">
              <template v-for="(crumb, index) in crumbs" :key="index">
                <BreadcrumbItem
                  :isClick="crumb.isClick"
                  :home="crumb.home"
                  @click="goTo(crumb.name)"
                >
                  {{ crumb.text }}
                </BreadcrumbItem>
              </template>
            </Breadcrumb>
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
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@/components/common/Breadcrumb/BreadcrumbItem.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface IBreadCrumb {
  text: string
  name: string
  home: boolean
  isClick: boolean
}

const crumbs = computed<IBreadCrumb[]>(() => {
  let pathArray: string[] = route.path.split('/')

  let breadcrumbs: IBreadCrumb[] = pathArray.reduce((breadcrumbArray: any, path, idx) => {
    if (route.matched[idx]?.meta) {
      const crumb: IBreadCrumb = {
        text: route.matched[idx].meta.breadcrumb as string,
        name: route.matched[idx].meta.routerName as string,
        home: path === '' ? true : false,
        isClick: idx !== pathArray.length - 1
      }
      breadcrumbArray.push(crumb)
    }
    return breadcrumbArray as IBreadCrumb[]
  }, [])

  return breadcrumbs
})

function goTo(name: string) {
  router.push({ name })
}
</script>
