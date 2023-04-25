import { BaseService } from "./baseService";

const baseUrl = 'https://localhost:7158/checkout/'

export class CheckoutService extends BaseService { 
    async createCheckoutSession(body) {
        return this.Post(baseUrl + 'createCheckoutSession', this.baseHeaders, body);
    }
}