const dateFormat = require('dateformat');

class ListItem extends HTMLElement {

    set item(item) {
        this._item = item;
        this.render();
    }

    set itemLogo1(logo1) {
        this._logo1 = logo1;
    }

    set itemLogo2(logo2) {
        this._logo2 = logo2;
    }

    render() {
        this.innerHTML = `
            <a href="">
                <div class="container center">
                    <div class="card">
                        <h6>${dateFormat(this._item.utcDate, "dd mmmm yyyy")}</h6>
                        <p>Mumbai</p>
                        <div class="container">
                            <div class="row">
                                <div class="logo col s4">
                                    <img class="materialboxed" src="/src/img/icon.jpg" alt="">
                                    <p>${this._item.homeTeam.name}</p>
                                </div>
                                <div class="score  col s4">
                                    <h2>${this._item.score.fullTime.homeTeam}-${this._item.score.fullTime.awayTeam}<</h2>
                                    <h5>FINAL</h5>
                                </div>
                                <div class="logo  col s4">
                                    <img class="materialboxed" src="/src/img/icon.jpg" alt="">
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