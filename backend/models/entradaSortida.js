const db = require('../config/db');

const registrarEntrada = (usuari_id, data, callback) => {
    const query = `
        INSERT INTO entrades_sortides (usuari_id, data, hora_entrada)
        VALUES (?, ?, NOW())
        ON DUPLICATE KEY UPDATE hora_entrada = NOW()
    `;
    db.query(query, [usuari_id, data], callback);
};

const registrarSortida = (usuari_id, data, callback) => {
    const query = `
        INSERT INTO entrades_sortides (usuari_id, data, hora_sortida)
        VALUES (?, ?, NOW())
        ON DUPLICATE KEY UPDATE hora_sortida = NOW()
    `;
    db.query(query, [usuari_id, data], callback);
};

// Modifiquem getEntradesSortides per afegir el filtre de dates
const getEntradesSortides = (usuari_id, startDate, endDate, callback) => {
    const query = `
        SELECT * 
        FROM entrades_sortides 
        WHERE usuari_id = ? 
        AND data BETWEEN ? AND ? 
        ORDER BY data DESC
    `;
    db.query(query, [usuari_id, startDate, endDate], callback);
};

const getHoresTreballades = (usuari_id, callback) => {
    const query = 'SELECT data, hora_entrada, hora_sortida FROM entrades_sortides WHERE usuari_id = ?';
    db.query(query, [usuari_id], callback);
};

module.exports = { registrarEntrada, registrarSortida, getEntradesSortides, getHoresTreballades };