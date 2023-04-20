export type TTodo = {
  _id?: string
  title: string
}

export type TTodoList = {
  _id: string
  title: string
  isCompleted: boolean
}

export type TTodoListParams = {
  filter?: string
}
