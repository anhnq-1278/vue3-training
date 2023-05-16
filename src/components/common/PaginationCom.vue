<template>
  <ul id="componentContainer" class="pagination-container">
    <li>
      <button
        @click.prevent="onClickHandler(currentPageRef - 1)"
        :class="['paginate-buttons', 'back-button', disablePagination && 'disabled']"
        :disabled="disablePagination"
      >
        <slot name="prev-button">
          <IconPrev />
        </slot>
      </button>
    </li>

    <li v-if="showBreakpointButtons && firstButtonIfCondition">
      <button
        @click.prevent="onClickHandler(1)"
        :class="['paginate-buttons', 'first-button', disablePagination && 'disabled']"
        :disabled="disablePagination"
      >
        1
      </button>
    </li>

    <li v-if="showBreakpointButtons && startingBreakPointButtonIfCondition">
      <button
        @click.prevent="onClickHandler(currentPageRef - Math.ceil(maxPagesShown / 2))"
        :disabled="disablePagination"
        :class="['paginate-buttons', disablePagination && 'disabled']"
      >
        ...
      </button>
    </li>

    <li v-for="(page, index) in paginate" :key="index">
      <button
        @click.prevent="() => onClickHandler(page)"
        :class="[
          'paginate-buttons',
          'number-buttons',
          page === currentPageRef ? 'active-page' : '',
          disablePagination && 'disabled'
        ]"
        :disabled="disablePagination"
      >
        {{ page }}
      </button>
    </li>

    <li v-if="showBreakpointButtons && endingBreakPointButtonIfCondition">
      <button
        @click.prevent="onClickHandler(currentPageRef + Math.ceil(maxPagesShown / 2))"
        :disabled="disablePagination"
        :class="['paginate-buttons', disablePagination && 'disabled']"
      >
        ...
      </button>
    </li>

    <li v-if="showBreakpointButtons && lastButtonIfCondition">
      <button
        @click.prevent="onClickHandler(totalPages)"
        :class="['last-button', 'paginate-buttons', disablePagination && 'disabled']"
        :disabled="disablePagination"
      >
        {{ totalPages }}
      </button>
    </li>

    <li>
      <button
        @click.prevent="onClickHandler(currentPageRef + 1)"
        :class="['paginate-buttons', 'next-button', disablePagination && 'disabled']"
        :disabled="disablePagination"
      >
        <slot name="next-button"><IconNext /> </slot>
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { toRef, computed } from 'vue'
import IconPrev from '@/assets/icons/IconPrev.vue'
import IconNext from '@/assets/icons/IconNext.vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10,
    validator: (value: number) => {
      if (value <= 0) {
        const message = 'itemsPerPage attribute must be greater than 0.'
        throw new TypeError(message)
      }
      return true
    }
  },
  currentPage: {
    type: Number,
    default: 1,
    validator: (value: number) => {
      const message = 'currentPage attribute must be greater than 0.'
      if (value <= 0) {
        throw new TypeError(message)
      }
      return true
    }
  },
  modelValue: {
    type: Number,
    required: true,
    validator: (value: number) => {
      const message = 'v-model is required and must be greater than 0.'
      if (value <= 0) {
        throw new TypeError(message)
      }
      return true
    }
  },
  maxPagesShown: {
    type: Number,
    default: 5,
    validator: (value: number) => {
      const message = 'maxPagesShown attribute must be greater than 0.'
      if (value <= 0) {
        throw new TypeError(message)
      }
      return true
    }
  },
  showBreakpointButtons: {
    type: Boolean,
    default: true
  },
  disablePagination: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onClick'])
const currentPageRef = toRef(props, 'modelValue')

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const paginate = computed(() => {
  let startPage: number, endPage: number
  let pages: Array<number>
  // if total pages are less than maximum pages to be displayed (maxPagesShown), then show all pages
  if (totalPages.value <= props.maxPagesShown) {
    startPage = 1
    endPage = totalPages.value
  } else {
    // total pages is more than maxPagesShown...
    // calculating start and end pages
    let maxPagesShownBeforeCurrentPage = Math.floor(props.maxPagesShown / 2)
    let maxPagesShownAfterCurrentPage = Math.ceil(props.maxPagesShown / 2) - 1

    if (currentPageRef.value <= maxPagesShownBeforeCurrentPage) {
      // current page is at the start of the pagination
      startPage = 1
      endPage = props.maxPagesShown
    } else if (currentPageRef.value + maxPagesShownAfterCurrentPage >= totalPages.value) {
      // current page is at the end of the pagination
      startPage = totalPages.value - props.maxPagesShown + 1
      endPage = totalPages.value
    } else {
      // current page is somewhere in the middle of the pagination
      startPage = currentPageRef.value - maxPagesShownBeforeCurrentPage
      endPage = currentPageRef.value + maxPagesShownAfterCurrentPage
    }
  }

  pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i)
  return pages
})

const startingBreakPointButtonIfCondition = computed(() => {
  return paginate.value[0] >= 3
})

const endingBreakPointButtonIfCondition = computed(() => {
  return paginate.value[paginate.value.length - 1] < totalPages.value - 1
})

const firstButtonIfCondition = computed(() => {
  return paginate.value[0] >= 2
})

const lastButtonIfCondition = computed(() => {
  return paginate.value[paginate.value.length - 1] < totalPages.value
})

const onClickHandler = (number: number) => {
  if (number === currentPageRef.value) return
  if (number > totalPages.value) return
  if (number < 1) return
  if (props.disablePagination) return

  emit('onClick', number)
}
</script>
<style scoped lang="scss">
#componentContainer {
  list-style-type: none;
  display: inline-flex;

  .pagination-container {
    display: flex;
    column-gap: 10px;
  }

  .paginate-buttons {
    padding: 6px 12px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    color: #6b7280;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }
  .active-page {
    background-color: #e1effe;
    border: 1px solid #3498db;
  }

  .disabled {
    cursor: not-allowed;
  }
  .next-button {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .back-button {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>
