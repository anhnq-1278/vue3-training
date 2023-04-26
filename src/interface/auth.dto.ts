export interface UserRegister {
  username: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface Account {
  _id: string;
  email: string;
  username: string;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  token: string;
  refreshToken: string
}

export interface AccountResponse {
  data: {
    data: Account
  }
}
