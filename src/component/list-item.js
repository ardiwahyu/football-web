import ApiServices from '../script/api-services.js';

const dateFormat = require('dateformat');
async function getLogo(id) {
    const result = await ApiServices.getLogo(id);
    return result;
}

class ListItem extends HTMLElement {

    set item(item) {
        this._item = item;
        this.render();
    }

    set from(from) {
        this._from = from;
    }

    async render() {
        if (this._from == "favorite") {
            this._item = this._item.match;
        }
        this.innerHTML = `
            <a href="detail.html?id=${this._item.id}&from=${this._from}">
                <div class="container center">
                    <div class="card">
                        <h6>${dateFormat(this._item.utcDate, "dd mmmm yyyy")}</h6>
                        <p>${dateFormat(this._item.utcDate, "HH:MM")} WIB</p>
                        <div class="container">
                            <div class="row  container-match">
                                <div class="logo col s4">
                                    <img class="materialboxed" src="${await getLogo(this._item.homeTeam.id)}" alt="">
                                </div>
                                <div class="score  col s4">
                                    <h2>${this._item.score.fullTime.homeTeam}-${this._item.score.fullTime.awayTeam}</h2>
                                </div>
                                <div class="logo  col s4">
                                    <img class="materialboxed" src="${await getLogo(this._item.awayTeam.id)}" alt="">
                                </div>
                            </div>
                            <div class="row">
                                <div class="logo col s4">
                                    <p>${this._item.homeTeam.name}</p>
                                </div>
                                <div class="score  col s4">
                                </div>
                                <div class="logo  col s4">
                                    <p>${this._item.awayTeam.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
}

customElements.define("list-item", ListItem);