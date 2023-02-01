import PouchDb from "pouchdb";
import PouchFind from 'pouchdb-find';

PouchDb.plugin(PouchFind)

const db = new PouchDb('../stock-storage');

// await db.createIndex({
//     index: { fields: ['doc_selector', 'create_doc'] }
// })

// await db.createIndex({
//     index: { fields: ['doc_selector', 'createdoc'] }
// }).then(function (result) {
//     console.log('индекс создан ', result);
// }).catch(function (err) {
//     console.log('ошибка ', err);
// });

const documents = [
    { id: 'sca3vf5g', doc_selector: 'component', name: 'К155ЛА3', type: 'Микросхема', count: 8, box: 'F3', cell: '2', package: 'SOIC8', spec: 'Типовая микруха', description: 'Описалово 1', note: 'Заметок нет', fileList: [], createdoc: 1675202881451 },
    { id: 'sfv56n9', doc_selector: 'component', name: 'К155ЛА7', type: 'Микросхема', count: 10, box: 'F3', cell: '8', package: 'SOIC16', spec: 'Нужно описалово', description: 'Еще данные', note: 'Я бы еще купил', fileList: [], createdoc: 1675202881452 },
    { id: 'dsvds1vf', doc_selector: 'component', name: 'RN315', type: 'Транзистор', count: 2, box: 'D2', cell: '12', package: 'SOT-23', spec: 'Классный транзистор', description: 'Мелкий корпус', note: 'Удобно хранить', fileList: [], createdoc: 1675202881453 }
]


await db.bulkDocs(documents);

console.log('Инициализация прошла успешно!');

// try {
//     const doc = await db.find({
//         selector: { doc_selector: 'component' },
//         sort: ['createdoc']
//         // sort: [{ create_doc: 'desc' }]
//     });
//     console.log('doc', doc);
// } catch (err) {
//     console.log('err', err);

// }

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

