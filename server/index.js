const express = require('express');
// const multer  = require("multer");
const app = express();
let cors = require('cors');

// "type": "module",

let corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Если нужно раздать статику из папки
// app.use(express.static('folder'));

// app.use(multer({dest:"uploads"}).single("file"));


// Подгружаем роуты
const routes = require('./routes');

routes(app);


const port = 7777;
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Storage service run port: ${server.address().port}`);
});




