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

export interface MetaDTO {
  limit: number,
  page: number,
  totalItem: number,
  totalPage: number
}

export interface UserResponse {
  data: {
    data: UserDTO[]
    meta: MetaDTO
  };
}

export interface SearchUserResponse {
  data: {
    data: SearchUserDTO[]
  };
}

export interface UserDetailResponse {
  data: {
    data: UserDTO
  };
}
