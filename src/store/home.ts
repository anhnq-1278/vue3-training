import type { IList } from '@/type/Todo'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const lists = ref<IList[]>([])

  const remaining = computed(() => {
    return lists.value.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
  })

  function addTask(task: string) {
    if (!task.trim()) return

    lists.value.push({ title: task, isChecked: false, isEdit: false })
  }

  function changeActive(index: number) {
    lists.value[index].isChecked = !lists.value[index].isChecked
  }

  function removeTask(index: number) {
    lists.value.splice(index, 1)
  }

  function editTask(index: number) {
    lists.value[index].isEdit = !lists.value[index].isEdit
  }

  function onBlur(index: number) {
    lists.value[index].isEdit = false

    if (!lists.value[index].title.trim()) {
      removeTask(index)
    }
  }

  function clearCompleted() {
    lists.value = lists.value.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
  }

  function checkAll(isCheckAll: boolean) {
    if (isCheckAll) {
      lists.value.forEach((_, i) => {
        lists.value[i].isChecked = false
      })

      return
    }

    lists.value.forEach((_, i) => {
      lists.value[i].isChecked = true
    })
  }

  return {
    lists,
    addTask,
    editTask,
    clearCompleted,
    onBlur,
    remaining,
    changeActive,
    removeTask,
    checkAll
  }
})
