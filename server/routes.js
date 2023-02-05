// let { nanoid } = require("nanoid");
import { nanoid } from 'nanoid'
// const multer = require('multer');
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
    getComponents,
    getComponentByID,
    saveComponentByID,
    addComponent,
    deleteComponent,
    deleteAttachedFile
} from './storage.js';
import { getFileList } from './util/files.js';

const distFiles = path.resolve(__dirname, '../stock-storage-files');
if (!fs.existsSync(distFiles)) {
    fs.mkdirSync(distFiles);
}

const storage = multer.diskStorage({
    destination: distFiles,
    filename: (req, file, callBack) => {
        callBack(null, `\\${req.params.id}\\${file.originalname}`);
    }
});
const upload = multer({ storage: storage }).single('file');

export const router = app => {

    app.get('/components', async (req, res) => {
        let data = await getComponents(req.query);
        res.status(200).send(data);
    });

    app.post('/upload/:id', function (req, res, next) {
        const idFolder = path.resolve(__dirname, distFiles, req.params.id);
        if (!fs.existsSync(idFolder)) {
            fs.mkdirSync(idFolder);
        }
        upload(req, res, function (err) {
            if (err) {
                res.send({ code: 500, msg: 'Ошибка загрузки файла' });
            } else {
                res.send({ code: 200, msg: 'Файл успешно загружен' });
            }
        });
    });

    app.get('/item/:id', async (req, res) => {
        const data = await getComponentByID(req.params.id);
        res.status(200).send(data);
    });

    app.post('/item/:id', async (req, res) => {
        const data = await saveComponentByID(req.params.id, req.body);
        res.status(200).send(data);
    });

    app.delete('/item/:id/:rev', async (req, res) => {
        const data = await deleteComponent(req.params.id, req.params.rev);
        res.status(200).send(data);
    });

    app.post('/add', async (req, res) => {
        const data = await addComponent(req.body);
        res.status(200).send(data);
    });

    app.get('/files/attached/:id', async (req, res) => {
        const folder = path.resolve(distFiles, req.params.id);
        const found = await getFileList(folder);
        res.status(200).send(found)
    });

    // Добавить сохранение в базе компонента с последующим обновление склада
    app.post('/take', async (req, res) => {
        res.status(200).send({ ok: true });
    });

    app.delete('/files/attached/:id/:name', async (req, res) => {
        const data = await deleteAttachedFile(req.params.id, req.params.name);
        res.status(200).send(data);
    });
}

// module.exports = router;
// export default router;

