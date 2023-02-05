import express, { json, urlencoded } from 'express';
const app = express();
import cors from 'cors';

// "type": "module",

let corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// Если нужно раздать статику из папки
// app.use(express.static('../stock-storage-files'));

app.use('/files', express.static('../stock-storage-files'));

// app.use(multer({dest:"uploads"}).single("file"));


// Подгружаем роуты
import { router } from './routes.js';
router(app);


const port = 7777;
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Storage service run port: ${server.address().port}`);
});

export default app;



