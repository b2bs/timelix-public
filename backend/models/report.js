const db = require('../config/db');

const createReport = (usuari_id, format, callback) => {
    const query = 'INSERT INTO reports (usuari_id, data_generacio, format) VALUES (?, NOW(), ?)';
    db.query(query, [usuari_id, format], callback);
};

module.exports = { createReport };