export type TTodo = {
  _id?: string
  title: string
}

export type TTodoItem = {
  _id: string
  title: string
  isCompleted: boolean
}

export type TTodoListParams = {
  filter?: string
}
