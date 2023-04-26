export type TProfile = {
  name: string
  address?: string
  phone?: string
  birthday?: string
  avatar?: any
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
