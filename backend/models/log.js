const db = require('../config/db');

const logAction = (usuari_id, accio, callback) => {
    const query = 'INSERT INTO logs (usuari_id, accio, data_hora) VALUES (?, ?, NOW())';
    db.query(query, [usuari_id, accio], callback);
};

module.exports = { logAction };
