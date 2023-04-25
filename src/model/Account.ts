export type TUpdateAccount = {
  name?: string
  address?: string
  birthday?: string
  phone?: string
  avatar?: File | null
}

export type TFormChangePW = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
