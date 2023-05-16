<template>
  <SectionForm
    title="世帯主"
    class="border bg-[#ffff] border-[#E5E7EB] rounded-lg px-8 py-8 shadow-form-shadow mb-10"
  >
    <template #content>
      <ItemForm title="世帯関係者（世帯主も含む）">
        <template #content>
          <div class="mt-2">
            <span class="mb-2">住所（都道府県）</span>
            <InputText
              class="h-[37px] bg-[#F9FAFB] rounded-lg px-4 py-2"
              :value="dataForm.name1"
              @input="changeInput($event, 'name1')"
              name="name1"
            />
          </div>
          <div class="mt-2">
            <span class="mb-2">住所（都道府県）</span>
            <InputText
              class="h-[37px] bg-[#F9FAFB] rounded-lg px-4 py-2"
              :value="dataForm.name2"
              @input="changeInput($event, 'name2')"
              name="name2"
            />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel odit nisi temporibus.
            Recusandae enim id placeat voluptatibus modi minima, est repellendus facere accusamus
            dolorem quas consectetur beatae labore omnis excepturi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Est harum voluptate vel provident soluta cum ratione
            magnam quam exercitationem, voluptatibus dolorum minima deleniti enim, sit quos ipsam
            placeat aperiam doloribus! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur excepturi, totam saepe minima et quas asperiores aut molestias, quod nam
            nihil vero. Mollitia recusandae beatae quam dolor atque laudantium eaque. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Vel odit nisi temporibus. Recusandae enim
            id placeat voluptatibus modi minima, est repellendus facere accusamus dolorem quas
            consectetur beatae labore omnis excepturi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Est harum voluptate vel provident soluta cum ratione magnam quam
            exercitationem, voluptatibus dolorum minima deleniti enim, sit quos ipsam placeat
            aperiam doloribus! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
            excepturi, totam saepe minima et quas asperiores aut molestias, quod nam nihil vero.
            Mollitia recusandae beatae quam dolor atque laudantium eaque. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Vel odit nisi temporibus. Recusandae enim id placeat
            voluptatibus modi minima, est repellendus facere accusamus dolorem quas consectetur
            beatae labore omnis excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Est harum voluptate vel provident soluta cum ratione magnam quam exercitationem,
            voluptatibus dolorum minima deleniti enim, sit quos ipsam placeat aperiam doloribus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur excepturi, totam
            saepe minima et quas asperiores aut molestias, quod nam nihil vero. Mollitia recusandae
            beatae quam dolor atque laudantium eaque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Vel odit nisi temporibus. Recusandae enim id placeat voluptatibus modi
            minima, est repellendus facere accusamus dolorem quas consectetur beatae labore omnis
            excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum voluptate
            vel provident soluta cum ratione magnam quam exercitationem, voluptatibus dolorum minima
            deleniti enim, sit quos ipsam placeat aperiam doloribus! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Consectetur excepturi, totam saepe minima et quas
            asperiores aut molestias, quod nam nihil vero. Mollitia recusandae beatae quam dolor
            atque laudantium eaque.
          </div>
        </template>
      </ItemForm>
    </template>
  </SectionForm>

  <SectionForm
    title="世帯主"
    class="border bg-[#ffff] border-[#E5E7EB] rounded-lg px-8 py-8 shadow-form-shadow"
    ref="scrollToElement"
  >
    <template #content>
      <ItemForm title="世帯関係者（世帯主も含む）">
        <template #content>
          <div class="mt-2">
            <span class="mb-2">住所（都道府県）</span>
            <InputText
              class="h-[37px] bg-[#F9FAFB] rounded-lg px-4 py-2"
              :value="dataForm.email1"
              name="email1"
              @input="changeInput($event, 'email1')"
            />
          </div>
          <div class="mt-2">
            <span class="mb-2">住所（都道府県）</span>
            <InputText
              class="h-[37px] bg-[#F9FAFB] rounded-lg px-4 py-2"
              :value="dataForm.email2"
              @input="changeInput($event, 'email2')"
              name="email2"
            />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel odit nisi temporibus.
            Recusandae enim id placeat voluptatibus modi minima, est repellendus facere accusamus
            dolorem quas consectetur beatae labore omnis excepturi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Est harum voluptate vel provident soluta cum ratione
            magnam quam exercitationem, voluptatibus dolorum minima deleniti enim, sit quos ipsam
            placeat aperiam doloribus! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur excepturi, totam saepe minima et quas asperiores aut molestias, quod nam
            nihil vero. Mollitia recusandae beatae quam dolor atque laudantium eaque. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Vel odit nisi temporibus. Recusandae enim
            id placeat voluptatibus modi minima, est repellendus facere accusamus dolorem quas
            consectetur beatae labore omnis excepturi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Est harum voluptate vel provident soluta cum ratione magnam quam
            exercitationem, voluptatibus dolorum minima deleniti enim, sit quos ipsam placeat
            aperiam doloribus! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
            excepturi, totam saepe minima et quas asperiores aut molestias, quod nam nihil vero.
            Mollitia recusandae beatae quam dolor atque laudantium eaque. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Vel odit nisi temporibus. Recusandae enim id placeat
            voluptatibus modi minima, est repellendus facere accusamus dolorem quas consectetur
            beatae labore omnis excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Est harum voluptate vel provident soluta cum ratione magnam quam exercitationem,
            voluptatibus dolorum minima deleniti enim, sit quos ipsam placeat aperiam doloribus!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur excepturi, totam
            saepe minima et quas asperiores aut molestias, quod nam nihil vero. Mollitia recusandae
            beatae quam dolor atque laudantium eaque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Vel odit nisi temporibus. Recusandae enim id placeat voluptatibus modi
            minima, est repellendus facere accusamus dolorem quas consectetur beatae labore omnis
            excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum voluptate
            vel provident soluta cum ratione magnam quam exercitationem, voluptatibus dolorum minima
            deleniti enim, sit quos ipsam placeat aperiam doloribus! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Consectetur excepturi, totam saepe minima et quas
            asperiores aut molestias, quod nam nihil vero. Mollitia recusandae beatae quam dolor
            atque laudantium eaque.
          </div>
        </template>
      </ItemForm>
    </template>
  </SectionForm>
  <div>
    <button @click="handlePreview" class="px-4 py-2 border border-grey-d9 my-2 rounded-lg mx-auto">
      確認画面へ進む
    </button>
  </div>
</template>
<script setup lang="ts">
import SectionForm from '@/components/Form/SectionForm.vue'
import ItemForm from '@/components/Form/ItemForm.vue'
import InputText from '@/components/common/InputText/InputText.vue'
import { onMounted, ref, type PropType } from 'vue'

interface IData {
  name1: string
  name2: string
  email1: string
  email2: string
}
const scrollToElement = ref<HTMLInputElement | null>(null)
const props = defineProps({
  dataForm: {
    type: Object as PropType<IData>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'preview'): void
  (e: 'change-input', data: string, type: string): void
}>()

function handlePreview() {
  emit('preview')
}

function changeInput(e: Event, type: string) {
  emit('change-input', (e.target as HTMLInputElement).value, type)
}
onMounted(() => {
  console.log(scrollToElement.value)
  scrollToElement.value?.scrollIntoView({ behavior: 'smooth' })
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
