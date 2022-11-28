let PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

let db = new PouchDB('yew-storage');

async function getAllComponent() {
    try {
        const doc = await db.find({
            selector: { selector: { $eq: 'component' } },
            limit: 10,
        });
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

async function getComponentByID(id) {
    try {
        const doc = await db.get(id)
        return doc;
    } catch (err) {
        return err
    }
}

async function saveComponentByID(id, document) {
    try {
        const doc = await db.put(document)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

// db.post генерация с ID
async function addComponent(document) {
    let upgrade = document;
    upgrade.selector = 'component';
    upgrade.create = new Date();

    try {
        const doc = await db.post(upgrade)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

async function deleteComponent(id, rev) {
    try {
        const doc = await db.remove(id, rev)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}


module.exports.getAllComponent = getAllComponent;
module.exports.getComponentByID = getComponentByID;
module.exports.saveComponentByID = saveComponentByID;
module.exports.addComponent = addComponent;
module.exports.deleteComponent = deleteComponent;

// const format =  require('date-fns/formatISO');
// const russianLocale = require('date-fns/locale/ru');

// const formattedDate = format(new Date(), null , { locale: russianLocale });
// console.log(formattedDate); // 2022-05-05T02:50:19+04:00
