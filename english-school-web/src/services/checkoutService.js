import { BaseService } from "./baseService";
import { UserService } from "./userService";

const baseUrl = 'https://localhost:7158/api/checkout/'

export class CheckoutService extends BaseService { 
    constructor() {
        super();
        let userService = new UserService();
        this.setRefreshToken = userService.refreshToken;
    }
    async createCheckoutSession(body) {
        return this.Post(baseUrl + 'createCheckoutSession', this.baseHeaders, body);
    }
    async savePayment(courseId) {
        return this.PostWithoutJson(baseUrl + 'savePayment', this.baseHeaders, courseId);
    }
}