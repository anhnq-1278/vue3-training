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
  createdAt: string
  updatedAt: string
  token: string
  refreshToken: string
  isActive: boolean
}
