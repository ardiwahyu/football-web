import './list-item.js';

class MatchList extends HTMLElement {
    set items(items) {
        this._items = items;
        this.render();
    }

    set itemLogo1(logo1) {
        this._logo1 = logo1;
    }

    set itemLogo2(logo2) {
        this._logo2 = logo2;
    }

    render() {
        this.innerHTML = ``;
        this._items.forEach(item => {
            const listItemElement = document.createElement("list-item");
            listItemElement.itemType = this._type;
            listItemElement.item = item;
            this.appendChild(listItemElement);
        });
    }
}

customElements.define("list-match", MatchList);