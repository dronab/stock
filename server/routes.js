// let { nanoid } = require("nanoid");
import { nanoid } from 'nanoid'
// const multer = require('multer');
import multer from 'multer';

import {
    getComponents,
    getComponentByID,
    saveComponentByID,
    addComponent,
    deleteComponent
} from './storage.js';

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        // callBack(null, `${nanoid()}_${file.originalname}`)
        callBack(null, file.originalname)
    }
})
// let upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })


export const router = app => {

    app.get('/components', async (req, res) => {
        let data = await getComponents(req.query);
        res.status(200).send(data);
    });

    app.post("/upload", upload.single('file'), function (req, res, next) {
        let filedata = req.file;
        if (!filedata) {
            res.send({ code: 500, msg: 'Ошибка загрузки файла' });
        }
        else {
            const addInfo = {
                info: filedata,
                id: nanoid()
            }
            res.send({ code: 200, msg: 'Файл успешно загружен', addInfo });
        }

    });

    app.get('/item/:id', async (req, res) => {
        const data = await getComponentByID(req.params.id);
        res.status(200).send(data);
    });

    app.post('/item/:id', async (req, res) => {
        const data = await saveComponentByID(req.params.id, req.body);
        res.status(200).send(data);
    });

    app.post('/add', async (req, res) => {
        const data = await addComponent(req.body);
        res.status(200).send(data);
    });

    app.post('/take', async (req, res) => {
        res.status(200).send({ ok: true });
    });

    app.delete('/item/:id/:rev', async (req, res) => {
        const data = await deleteComponent(req.params.id, req.params.rev);
        res.status(200).send(data);
    });
}

// module.exports = router;
// export default router;

