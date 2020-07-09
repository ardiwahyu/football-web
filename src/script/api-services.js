import logos from "../data/data-logo.js";

const baseUrl = "https://api.football-data.org/v2";
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

    static async getContent(id) {
        const url = `${baseUrl}/competitions/${id}/matches`;
        try {
            const response = await fetch(url, {
                headers: {
                    "X-Auth-Token": token
                }
            });
            const response_1 = await status(response);
            const data = await json(response_1);
            return data.matches;
        }
        catch (error) {
            return error(error);
        }
    }

    static async getLogo(id) {
        const url = (resolve, reject) => {
            for (let i = 0; i < logos.length; i++) {
                if (logos[i].id == id) {
                    resolve(logos[i].logo);
                }
            }
            reject("/src/img/icon.jpg")
        }
        const urlPromise = new Promise(url);
        try {
            const data = await urlPromise;
            return data;
        }
        catch (error) {
            return error;
        }

    }

    static async getDetail(id) {
        const url = `${baseUrl}/matches/${id}`;
        try {
            const response = await fetch(url, {
                headers: {
                    "X-Auth-Token": token
                }
            });
            const response_1 = await status(response);
            const data = await json(response_1);
            return data;
        }
        catch (error) {
            return error(error);
        }
    }
}

export default ApiServices;
