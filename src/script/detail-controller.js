import ApiServices from './api-services.js';
import "../component/list-match.js";
const dateFormat = require('dateformat');

function detail() {
    const matchListElement = document.querySelector("list-match");

    const getContent = async () => {
        const url = new URL(window.location)
        const result = await ApiServices.getDetail(url.searchParams.get("id"));
        renderResult(result);
    }

    async function getLogo(id) {
        const result = await ApiServices.getLogo(id);
        return result;
    }

    const renderResult = async (result) => {
        const body = document.querySelector("#body-content")
        body.innerHTML = `
            <div class="container center">
                <div class="card">
                    <h6>${dateFormat(result.match.utcDate, "dd mmmm yyyy")}</h6>
                    <p>${dateFormat(result.match.utcDate, "HH:MM")} WIB</p>
                    <p>Location: <span class="bold">${result.match.competition.area.name}</span></p>
                </div>
                <div class="card">
                    <div class="container">
                        <h5>Home Team</h5>
                        <hr>
                        <div class="row  container-match">
                            <div class="col s3"></div>
                            <div class="logo-detail col s6"><img class="materialboxed" src="${await getLogo(result.match.homeTeam.id)}" alt=""></div>
                            <div class="col s3"></div>
                        </div>
                        <h5>${result.match.homeTeam.name}</h5>
                        <hr class="mt-20">
                        <div class="row  container-match mt-20">
                            <div class="col s4">
                                <p>Wins: <span class="bold">${result.head2head.homeTeam.wins}</span></p>
                            </div>
                            <div class="col s4">
                                <p>Draws: <span class="bold">${result.head2head.homeTeam.draws}</span></p>
                            </div>
                            <div class="col s4">
                                <p>Losses: <span class="bold">${result.head2head.homeTeam.losses}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h5>Away Team</h5>
                        <hr>
                        <div class="row  container-match">
                            <div class="col s3"></div>
                            <div class="logo-detail col s6"><img class="materialboxed" src="${await getLogo(result.match.awayTeam.id)}" alt=""></div>
                            <div class="col s3"></div>
                        </div>
                        <h5>${result.match.awayTeam.name}</h5>
                        <hr class="mt-20">
                        <div class="row  container-match mt-20">
                            <div class="col s4">
                                <p>Wins: <span class="bold">${result.head2head.awayTeam.wins}</span></p>
                            </div>
                            <div class="col s4">
                                <p>Draws: <span class="bold">${result.head2head.awayTeam.wins}</span></p>
                            </div>
                            <div class="col s4">
                                <p>Losses: <span class="bold">${result.head2head.awayTeam.wins}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h5>Score Half Time</h5>
                        <hr>
                        <h1>${result.match.score.halfTime.homeTeam}-${result.match.score.halfTime.awayTeam}</h1>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h5>Score Full Time</h5>
                        <hr>
                        <h1>${result.match.score.fullTime.homeTeam}-${result.match.score.fullTime.awayTeam}</h1>
                    </div>
                </div>
            </div>
        `
    }

    document.addEventListener("DOMContentLoaded", function () {
        getContent();
    });
}

export default detail;