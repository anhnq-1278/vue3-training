export interface UserDTO {
  _id: string;
  email: string;
  username: string;
  isActive: boolean;
  createAt: string;
}

export interface SearchUserDTO {
  _id: string;
  name: string;
}