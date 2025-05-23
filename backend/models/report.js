const db = require('../config/db');

const createReport = (usuari_id, format, callback) => {
    // Inserim un nou informe a la taula reports amb l'usuari, la data de generació actual i el format especificat
    const query = 'INSERT INTO reports (usuari_id, data_generacio, format) VALUES (?, NOW(), ?)';
    db.query(query, [usuari_id, format], callback);
};

module.exports = { createReport };
