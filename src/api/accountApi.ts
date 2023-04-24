import axiosClient from './apiClient'
const accountApi = {
  async getAccount() {
    const url = '/my-account'
    return axiosClient.get(url)
  },
}

export default accountApi
