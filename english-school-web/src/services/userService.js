import { BaseService } from "./baseService"

const baseUrl = 'https://localhost:7158/api/user/'

export class UserService extends BaseService {
    constructor() {
        super();
        this.setRefreshToken = this.refreshToken;
    }
    async token(user) {
        let data = await this.Post(baseUrl + 'token',
                                {
                                    'Content-Type': 'application/json'
                                },
                                user);
        if(data.error === undefined || data.errors.length === 0)
        {
            sessionStorage.setItem('accessToken', data.token);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('userImage', data.userImage);
            return true;
        }
        else {
            return data;
        }
    }
    async refreshToken() {
        let refreshToken = sessionStorage.getItem('refreshToken');
        let data = await this.Post(baseUrl + 'refreshToken', this.baseHeaders, refreshToken);
        sessionStorage.setItem('accessToken', data.token);
    }
    async registration(user) {
        return this.PostWithoutJson(baseUrl + 'register', this.baseHeaders, user);
    }
    async updateProfile(user) {
        let data = await this.Post(baseUrl + 'update', this.baseHeaders, user);

        if(data.error === undefined || data.errors.length === 0)
        {
            sessionStorage.setItem('accessToken', data.token);
            sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('userImage', data.userImage);
            return true;
        }
        else {
            return data;
        }
    }
    async updatePassword(password) {
        let data = await this.Post(baseUrl + 'updatePassword', this.baseHeaders, password);

        if(data.error === undefined || data.errors.length === 0)
        {
            sessionStorage.setItem('accessToken', data.token);
            sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('userImage', data.userImage);
            return true;
        }
        else {
            return data;
        }
    }
    async getProfile() {
        return await this.Post(baseUrl + 'getProfile', this.baseHeaders);
    }
    async googleLogin(token) {
        let data = await this.Post(baseUrl + 'googleLogin', 
                                   { 'Content-Type': 'application/json' },
                                   token);
        if(data.error === undefined || data.errors.length === 0)
        {
            console.log(data);
            sessionStorage.setItem('accessToken', data.token);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('userImage', data.userImage);
            return true;
        }
        else {
            return data;
        }
    }
    async tutorAboutList() {
        return this.Get(baseUrl + 'tutorList', this.baseHeaders);        
    }
    async tutorList(tutorCount, page) {
        return this.Get(baseUrl + 'tutorList?tutorsCount=' + tutorCount + '&page=' + page, this.baseHeaders);
    }
    async setTutor(tutorId) {
        return this.PostWithoutJson(baseUrl + 'setTutor', this.baseHeaders, tutorId);
    }
}