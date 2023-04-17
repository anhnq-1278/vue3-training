import axios, { type AxiosInstance } from "axios";

export default class APIService {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_BASE_API_URL,
            headers: { 'Content-Type': 'application/json' },
        });
        this.axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        )
        this.axios.interceptors.response.use(
            this.handleSuccessResponse,
            this.handleErrorResponse
        )
    }

    handleSuccessResponse(response: any) {
        return response.data;
    }

    handleErrorResponse(error: any) {
        return Promise.reject(error.response);
    }
}
