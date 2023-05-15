export class BaseService {
    baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("accessToken")
    }
    setRefreshToken = () => {};
    async Get(url)
    {
        let response = await fetch(url);
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(url);
        }
        let data = await response.json();
        return data;
    }
    async GetWithHeaders(url)
    {
        let response = await fetch(url, {
            method: "GET",
            headers: this.baseHeaders,
        });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(url);
        }
        let data = await response.json();
        return data;
    }
    async Post(url, headers, data)
    {
        let response = await fetch(url,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(url,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
        }
        let responseData = response.json();
        return responseData;
    }
    async PostWithoutJson(url, headers, data)
    {
        let response = await fetch(url,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(url,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
        }
        return response;
    }
    async Put(url, headers, data)
    {
        let response = await fetch(url,
            {
                method: "PUT",
                headers,
                body: JSON.stringify(data)
            });
        if(response.status == 401) {
            await this.setRefreshToken();
            response = await fetch(url,
            {
                method: "PUT",
                headers,
                body: JSON.stringify(data)
            });
        }
        return response;
    }
}