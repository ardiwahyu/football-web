import idb from 'idb';


const dbPromised = idb.open("football-match", 1, function (upgradeDb) {
    upgradeDb.createObjectStore("matches", {
        keyPath: "match.id"
    });
});

class LocalServices {

    static saveMatch(match) {
        return dbPromised.then(function (db) {
            const tx = db.transaction("matches", "readwrite");
            const store = tx.objectStore("matches");
            store.add(match);
            return tx.complete;
        });
    }

    static removeMatch(id) {
        return dbPromised.then(function (db) {
            const tx = db.transaction("matches", "readwrite");
            const store = tx.objectStore("matches");
            store.delete(id);
            return tx.complete;
        });
    }

    static getMatch(id) {
        return dbPromised.then(function (db) {
            const tx = db.transaction("matches", "readonly");
            const store = tx.objectStore("matches");
            return store.get(id);
        });
    }

    static getAllMatch(id) {
        return dbPromised.then(function (db) {
            const tx = db.transaction("matches", "readonly");
            const store = tx.objectStore("matches");
            return store.getAll();
        });
    }
}

export default LocalServices;