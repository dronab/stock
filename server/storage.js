import PouchDb from "pouchdb";
import PouchFind from 'pouchdb-find';
PouchDb.plugin(PouchFind)

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { unlink } from 'node:fs/promises';

const db = new PouchDb('../stock-storage');
const distFiles = path.resolve(__dirname, '../stock-storage-files');

export async function getComponents(props = { text: null }) {
    if (!props.text) {
        try {
            const doc = await db.find({
                selector: { doc_selector: 'component' },
                limit: 10
                // sort: ['create']
                // sort: [{ updatedAt: 'desc' }]
            });

            return doc;
        } catch (err) {
            return { error: err }
        }
    }
    if (props.text) {
        try {
            const doc = await db.find({
                selector: { name: { $regex: RegExp(props.text, "i") } }
            });
            return doc;
        } catch (err) {
            return { error: err }
        }
    }
}

export async function getComponentByID(id) {
    try {
        const doc = await db.get(id)
        return doc;
    } catch (err) {
        return err
    }
}

export async function saveComponentByID(id, document) {
    try {
        const doc = await db.put(document)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

// db.post генерация с ID
export async function addComponent(document) {
    let upgrade = document;
    upgrade.doc_selector = 'component';
    // upgrade.create = new Date(); // new Date().toISOString()
    // upgrade.create = new Date().toISOString(); // 
    upgrade.create_doc = Date.now();

    try {
        const doc = await db.post(upgrade)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

export async function deleteComponent(id, rev) {
    try {
        const doc = await db.remove(id, rev)
        return doc;
    } catch (err) {
        console.log(err);
        return { error: err }
    }
}

export async function deleteAttachedFile(id, name) {
    const fullPatch = path.resolve(distFiles, id, name);
    try {
        await unlink(fullPatch);
        return {code: 200, msg: 'Файл успешно удален', path: fullPatch};
    } catch (error) {
        return {code: 500, msg: error, path: fullPatch}
    }
}

// const format =  require('date-fns/formatISO');
// const russianLocale = require('date-fns/locale/ru');

// const formattedDate = format(new Date(), null , { locale: russianLocale });
// console.log(formattedDate); // 2022-05-05T02:50:19+04:00


// const doc = await db.find({
//     selector: { doc_selector: { $eq: 'component' } },
//     limit: 10,
// });

