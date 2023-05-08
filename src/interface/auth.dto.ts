export interface UserRegister {
  username: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface ChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface Account {
  _id: string;
  email: string;
  username: string;
  isActive?: boolean;
  createAt: string;
  updateAt: string;
  token: string;
  refreshToken: string;
  address: string;
  birthday: string;
  phone: string;
  name: string;
  avatar: string;
}

export interface AccountResponse {
  data: {
    data: Account
  }
}
