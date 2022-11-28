// let { nanoid } = require("nanoid");
let storage = require('./storage');

// Получение списка всех
function getAllComponent() {
    return storage.getAllComponent();
}

function getComponentByID(id) {
    return storage.getComponentByID(id);
}

function saveComponentByID(id, doc) {
    return storage.saveComponentByID(id, doc);
}

function addComponent(doc) {
    return storage.addComponent(doc);
}

function deleteComponent(id, rev) {
    return storage.deleteComponent(id, rev);
}

module.exports.getAllComponent = getAllComponent;
module.exports.getComponentByID = getComponentByID;
module.exports.saveComponentByID = saveComponentByID;
module.exports.addComponent = addComponent;
module.exports.deleteComponent = deleteComponent;
