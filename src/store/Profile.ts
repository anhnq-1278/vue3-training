import { defineStore } from 'pinia'
import { profileService } from '@/services'
import type { TChangePassword, TProfile } from '@/model/Profile'
import { useNotification } from '@kyvg/vue3-notification'
import { NotificationTypes } from '@/constants'

const { notify } = useNotification()

export default defineStore('profile', () => {
  async function getProfile() {
    return await profileService.getProfile()
  }

  async function updateProfile(data: TProfile) {
    await profileService.updateProfile(data)

    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Profile successfully updated'
    })
  }

  async function changePassword(data: TChangePassword) {
    await profileService.changePassword(data)

      notify({
        type: NotificationTypes.SUCCESS,
        title: 'Password successfully updated'
      })
  }

  return { getProfile, updateProfile, changePassword }
})
