const db = require('../config/db');

const logAction = (usuari_id, accio, callback) => {
    // Inserim un registre a la taula logs amb l'usuari, l'acció i la data/hora actual
    const query = 'INSERT INTO logs (usuari_id, accio, data_hora) VALUES (?, ?, NOW())';
    db.query(query, [usuari_id, accio], callback);
};

module.exports = { logAction };
