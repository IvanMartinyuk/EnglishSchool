import { BaseService } from "./baseService"

const baseUrl = 'https://localhost:7158/lesson/'

export class LessonService extends BaseService {
    async generateLesson(platform, data) {
        return this.PostWithoutJson(baseUrl + 'generate' + platform, this.baseHeaders, data);
    }
}