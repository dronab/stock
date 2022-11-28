
let PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

let db = new PouchDB('yew-storage');

const documents = [
    { id: 'sca3vf5g', selector: 'component', name: 'К155ЛА3', type: 'Микросхема', count: 8, box: 'F3', cell: '2', package: 'SOIC8', spec: 'Типовая микруха', description: 'Описалово 1', note: 'Заметок нет', fileList: [], create: '2022-05-05T02:50:19+04:00' },
    { id: 'sfv56n9', selector: 'component', name: 'К155ЛА7', type: 'Микросхема', count: 10, box: 'F3', cell: '8', package: 'SOIC16', spec: 'Нужно описалово', description: 'Еще данные', note: 'Я бы еще купил', fileList: [], create: '2022-05-05T02:52:19+04:00' },
    { id: 'dsvds1vf', selector: 'component', name: 'RN315', type: 'Транзистор', count: 2, box: 'D2', cell: '12', package: 'SOT-23', spec: 'Классный транзистор', description: 'Мелкий корпус', note: 'Удобно хранить', fileList: [], create: '2022-05-05T02:55:19+04:00' }
]

// db.createIndex({
//     index: {
//         fields: [
//             'selector',
//             'create'
//         ]
//     }
// })

db.bulkDocs(documents);

console.log('Инициализация прошла успешно!');

// Date.now()

/*

{ id: 5424, selector: 'component', name: 'К155ЛА3', type: 'Микросхема', count: 10, box: 'F3', cell: '15', package: 'sot-23', spec: '', description: '', note: '', fileList: []  }

name Название (текст)
type Тип (текст по которому будет ответ со списком доступных типов). Каждый новый тип сохраняется в базу данных.
count Кол-во (цифра)
box Бокс-коробка (текст)
cell Ячейка-пакет (текст)
package Корпус (текст)
spec Параметры (текст)
description Описание (текст)
note Примечание (текст)
fileList Список файлов

*/

