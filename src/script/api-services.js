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

    static getContent(id) {
        return new Promise((resolve, reject) => {
            const url = `${baseUrl}/competitions/${id}/matches`;
            if ('caches' in window) {
                caches.match(url).then(async function (response) {
                    const response_1 = await status(response);
                    const data = await json(await status(response_1));
                    resolve(data.matches);
                })
            }
            fetch(url, {
                headers: {
                    "X-Auth-Token": token
                }
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    resolve(data.matches);
                })
                .catch(error);
        })
    }

    static async getLogo(id) {
        const url = (resolve, reject) => {
            for (let i = 0; i < logos.length; i++) {
                if (logos[i].id == id) {
                    resolve(logos[i].logo);
                }
            }
            reject("./src/icon/icon.png")
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
        return new Promise((resolve, reject) => {
            const url = `${baseUrl}/matches/${id}`;
            if ('caches' in window) {
                caches.match(url).then(async function (response) {
                    const response_1 = await status(response);
                    const data = await json(response_1);
                    resolve(data);
                })
            }
            fetch(url, {
                headers: {
                    "X-Auth-Token": token
                }
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    resolve(data);
                })
                .catch(error);
        })
    }
}

export default ApiServices;
