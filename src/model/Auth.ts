export type TFormRequestRegister = {
  username: string
  email: string
  password: string
}

export type TFormRequestLogin = {
  email: string
  password: string
}

export type TDataAccount = {
  _id: string
  email: string
  username: string
  name?: string
  phone?: string
  address?: string
  birthday?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  token: string
  refreshToken: string
  isActive: boolean
}
