import idb from 'idb';


const dbPromised = idb.open("football-match", 1, function (upgradeDb) {
    upgradeDb.createObjectStore("matches", {
        keyPath: "match.id"
    });
});

class LocalServices {

    static async saveMatch(match) {
        const db = await dbPromised;
        const tx = db.transaction("matches", "readwrite");
        const store = tx.objectStore("matches");
        store.add(match);
        return tx.complete;
    }

    static async removeMatch(id) {
        const db = await dbPromised;
        const tx = db.transaction("matches", "readwrite");
        const store = tx.objectStore("matches");
        store.delete(id);
        return tx.complete;
    }

    static async getMatch(id) {
        const db = await dbPromised;
        const tx = db.transaction("matches", "readonly");
        const store = tx.objectStore("matches");
        return store.get(id);
    }

    static async getAllMatch() {
        const db = await dbPromised;
        const tx = db.transaction("matches", "readonly");
        const store = tx.objectStore("matches");
        return store.getAll();
    }
}

export default LocalServices;