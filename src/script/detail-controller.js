import ApiServices from './api-services.js';
import LocalServices from './local-services.js';
import "../component/list-match.js";
const dateFormat = require('dateformat');

function detail() {

    const btnSave = document.getElementById("btn-save");

    let result;
    const getContent = async () => {
        const url = new URL(window.location)
        result = await ApiServices.getDetail(url.searchParams.get("id"));
        cekIfFavorite(result);
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

    async function cekIfFavorite(result) {
        const isFavorite = await LocalServices.getMatch(result.match.id);
        if (isFavorite != null) {
            btnSave.classList.remove("black");
            btnSave.classList.add("red");
        } else {
            btnSave.classList.remove("red");
            btnSave.classList.add("black");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {

        btnSave.addEventListener("click", function () {
            if (btnSave.classList.contains("black")) {
                LocalServices.saveMatch(result);
                M.toast({ html: 'Berhasil menyimpan match!' });
                btnSave.classList.remove("black");
                btnSave.classList.add("red");
            } else {
                LocalServices.removeMatch(result.match.id);
                M.toast({ html: 'Menghapus dari favorite!' });
                btnSave.classList.remove("red");
                btnSave.classList.add("black");
            }
        });

        getContent();
    });
}

export default detail;