export interface TodoDTO {
  createdAt: string;
  _id: string;
  title: string;
  isCompleted: boolean;
  userId: string;
  updatedAt: string;
}
export interface UpdateTodoDTO {
  id: string;
  title?: string;
  isCompleted?: boolean;
}