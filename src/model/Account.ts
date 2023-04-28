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

export type TDataUser = {
  _id: string
  email: string
  username: string
  name?: string
  phone?: string
  address?: string
  birthday?: string
  avatar?: string
  isActive: boolean
  createdAt: string
}

export type TMeta = {
  totalItem: number
  totalPage: number
  page: number
  limit: number
}

export type TParams = {
  page: number
  limit: number
}

export type TResponse = {
  data: TDataUser[]
  meta: TMeta
}

export type TResponseSearchUser = {
  _id: string
  name: string
}
