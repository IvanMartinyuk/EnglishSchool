import { BaseService } from "./baseServer"

export class UserService extends BaseService {    
    baseUrl = 'https://localhost:7158/user/'
    async token(user) {
        let data = await this.Post(this.baseUrl + 'token',
                                {
                                    'Content-Type': 'application/json'
                                },
                                user);
        if(data.error === undefined || data.errors.length === 0)
        {
            sessionStorage.setItem('accessToken', data.token);
            sessionStorage.setItem('username', data.userName);
            return true;
        }
        else {
            return data;
        }
    }
    async registration(user) {
        return this.PostWithoutJson(this.baseUrl + 'registration', this.baseHeaders, user);
    }
}