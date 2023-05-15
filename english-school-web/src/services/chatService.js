import { BaseService } from "./baseService";

const baseUrl = 'https://localhost:7158/api/chat/'

export class ChatService extends BaseService {
    async getChats() {
        return this.GetWithHeaders(baseUrl + 'getChats');
    }
    async getMessages(chatId) {
        return this.GetWithHeaders(baseUrl + 'getMessages?chatId=' + chatId);
    }
}