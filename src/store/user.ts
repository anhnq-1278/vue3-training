import { defineStore } from 'pinia'
import userApi from '../api/userApi'
import type { AxiosResponse } from 'axios'

interface UserResponse {
  data: {
    data: {
      _id: string;
      email: string;
      username: string;
      isActive: boolean;
      createAt: string;
      updateAt: string;
      token: string;
      refreshToken: string
    }
  };
}

export const useUserStore = defineStore('user', () => {
  const login = async (email: string, password: string) => {
    const data: UserResponse = await userApi.login({
      email,
      password
    })
    const { token }: { token: string } = data.data.data
    localStorage.setItem('token', token)
  }

  const register = async (username: string, email: string, password: string) => {
    await userApi.register({
      username,
      email,
      password
    })
  }

  return {
    login,
    register
  }
})
