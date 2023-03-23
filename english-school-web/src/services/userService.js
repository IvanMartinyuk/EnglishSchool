import { BaseService } from "./baseServer"

export class UserService extends BaseService {    
    baseUrl = 'https://localhost:7158/user/'
    async token(user) {
        let data = await this.Post(this.baseUrl + 'token',
                                {
                                    'Content-Type': 'application/json'
                                },
                                user);
        if(data.error === undefined)
        {
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userId', data.id);
            return true;
        }
        else {
            return false;
        }
    }
    async registration(user) {
        return this.PostWithoutJson(this.baseUrl + 'registration', this.baseHeaders, user);
    }
}