import { BaseService } from "./baseService"

const baseUrl = 'https://localhost:7158/lesson/'

export class LessonService extends BaseService {
    async generateLesson(platform, data) {
        return this.PostWithoutJson(baseUrl + 'generate' + platform, this.baseHeaders, data);
    }
    async getLessons() {
        let response = await fetch(baseUrl + 'getLessons', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        return data;
    }
}