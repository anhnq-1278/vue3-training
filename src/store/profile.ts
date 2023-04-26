import { profileService } from '@/services'
import type { IProfile } from '@/type/Profile'
import { useNotification } from '@kyvg/vue3-notification'
import { defineStore } from 'pinia'

const { notify } = useNotification()

export default defineStore('profile', () => {
  async function editProfile(params: IProfile) {
    const { message } = await profileService.editProfile(params)

    notify({
      type: 'success',
      title: message
    })
  }

  return {
    editProfile
  }
})
