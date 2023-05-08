export type TSearchUser = {
  _id: string
  name: string
}

export type TUserListParams = {
  page: number
  limit: number
}

export type TUser = {
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

export interface IUserListResponse {
  data: TUser[]
  meta: TMeta
}

export type TSearchUserParams = {
  q?: string
}
