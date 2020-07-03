import './list-item.js';

class MatchList extends HTMLElement {
    set items(items) {
        this._items = items;
        this.render();
    }

    render() {
        this.innerHTML = ``;
        for (let i = 0; i < 10; i++) {
            const listItemElement = document.createElement("list-item");
            listItemElement.item = this._items[i];
            this.appendChild(listItemElement);
        }
    }
}

customElements.define("list-match", MatchList);