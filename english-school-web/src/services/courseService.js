import { BaseService } from "./baseService";

const baseUrl = 'https://localhost:7158/course/'

export class CourseService extends BaseService { 
    async getList() {
        return this.Get(baseUrl + 'getList');
    }
}