export interface TRequestAuth {
  username?: string
  email: string
  password: string
}

export interface TResAccount {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  token: string
  refreshToken: string
  isActive: boolean
  avatar: string
  address: string
  phone: string
  name: string
  birthday: string
}

export interface IChangePW {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
