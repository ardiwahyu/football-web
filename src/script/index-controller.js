import ApiServices from './api-services.js';
import "../component/list-match.js";

function main() {
    const matchListElement = document.querySelector("list-match");

    const getContent = async () => {
        const result = await ApiServices.getContent(2015);
        renderResult(result);
    }

    const renderResult = (result) => {
        matchListElement.items = result.matches;
    }

    getContent();
}

export default main;