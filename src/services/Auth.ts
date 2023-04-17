import APIService from './api';
import type { TLogin } from '@/model/Auth';


class AuthService extends APIService {
    constructor() {
        super();
    }

    login(data: TLogin) {
        return this.axios.post<{
            value: { token: string };
        }>('/login', data);
    }
}

export default AuthService;