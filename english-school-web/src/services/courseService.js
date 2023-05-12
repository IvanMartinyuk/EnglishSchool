import { BaseService } from "./baseService";
import { UserService } from "./userService";

const baseUrl = 'https://localhost:7158/api/course/'

export class CourseService extends BaseService { 
    constructor() {
        super();
        let userService = new UserService();
        this.setRefreshToken = userService.refreshToken;
    }
    async getList() {
        return this.Get(baseUrl + 'getList');
    }
}