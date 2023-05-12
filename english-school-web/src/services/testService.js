import { BaseService } from "./baseService";

const baseUrl = 'https://localhost:7158/api/test/'

export class TestService extends BaseService {
    async getQuestion(number) {
        return this.Get(baseUrl + 'question?number=' + number);
    }
    async getQuestionCount() {
        return this.Get(baseUrl + 'questionCount');
    }
}