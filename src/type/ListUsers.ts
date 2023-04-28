export type TDataUser = {
  email: string
  name: string
  phone: string
  address: string
  birthday: string
  avatar: string
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

export type TSearch = {
  q: string
}
