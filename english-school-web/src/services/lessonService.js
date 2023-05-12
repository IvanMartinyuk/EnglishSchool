import { BaseService } from "./baseService"
import { UserService } from "./userService";

const baseUrl = 'https://localhost:7158/api/lesson/'

export class LessonService extends BaseService {
    constructor() {
        super();
        let userService = new UserService();
        this.setRefreshToken = userService.refreshToken;
    }
    async generateLesson(platform, data) {
        return this.PostWithoutJson(baseUrl + 'generate' + platform, this.baseHeaders, data);
    }
    async studentPrevLessons(page) {
        let response = await fetch(baseUrl + 'studentPrevLessons?page=' + page, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(baseUrl + 'studentPrevLessons?page=' + page, {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'
                }
            });
        }
        let data = await response.json();
        return data;
    }
    
    async studentFutureLessons(page) {
        let response = await fetch(baseUrl + 'studentFutureLessons?page=' + page, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(baseUrl + 'studentFutureLessons?page=' + page, {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'
                }
            });
        }
        let data = await response.json();
        return data;
    }
    async studentPrevLessonsCount() {
        let response = await fetch(baseUrl + 'studentPrevLessonsCount', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(baseUrl + 'studentPrevLessonsCount', {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'
                }
            });
        }
        let data = await response.json();
        return data;
    }
    async studentFutureLessonsCount() {
        let response = await fetch(baseUrl + 'studentFutureLessonsCount', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(baseUrl + 'studentFutureLessonsCount', {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'
                }
            });
        }
        let data = await response.json();
        return data;
    }
    async deactivateLesson(lessonId) {
        return this.PostWithoutJson(baseUrl + 'deactivateLesson', this.baseHeaders, lessonId);
    }
}