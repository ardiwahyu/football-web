import './list-item.js';

class MatchList extends HTMLElement {
    set items(items) {
        this._items = items;
        this.render();
    }

    set from(from) {
        this._from = from;
    }

    render() {
        this.innerHTML = ``;
        if (this._items.length > 10) {
            for (let i = 0; i < 10; i++) {
                const listItemElement = document.createElement("list-item");
                listItemElement.from = this._from;
                listItemElement.item = this._items[i];
                this.appendChild(listItemElement);
            }
        } else {
            for (let i = 0; i < this._items.length; i++) {
                const listItemElement = document.createElement("list-item");
                listItemElement.from = this._from;
                listItemElement.item = this._items[i];
                this.appendChild(listItemElement);
            }
        }
    }
}

customElements.define("list-match", MatchList);