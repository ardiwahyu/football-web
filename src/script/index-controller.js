import ApiServices from './api-services.js';

function main() {
    const getContent = async () => {
        const result = await ApiServices.getContent(2015);
        console.log(result);
    }
    getContent()
}

export default main;