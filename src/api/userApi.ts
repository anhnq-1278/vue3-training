import axiosClient from './apiClient'

const userApi = {
  signUp({ email, password }: { email: string; password: string }) {
    const url = '/login'
    return axiosClient.post(url, {
      email,
      password
    })
  },
  register({ username, email, password }: { username: string; email: string; password: string }) {
    const url = '/register'

    return axiosClient.post(url, {
      email,
      username,
      password
    })
  }
}

export default userApi
