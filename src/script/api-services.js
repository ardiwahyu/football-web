const baseUrl = "https://api.football-data.org/v2/";
const token = "b58599afa2e04f5b9b56d9e7eeb76686";

function status(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

class ApiServices {

    static getContent(id) {
        const url = `${baseUrl}/competitions/${id}/matches`;
        return fetch(url, {
            headers: {
                "X-Auth-Token": token
            }
        })
            .then(status)
            .then(json)
            .then(function (data) {
                return data
            })
            .catch(error);

    }
}

export default ApiServices;
