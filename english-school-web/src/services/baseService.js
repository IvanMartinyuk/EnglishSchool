export class BaseService
{
    baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("accessToken")
    }
    async Get(url)
    {
        let response = await fetch(url);
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
        return response;
    }
}