const db = require('../config/db');

const getAllRoles = (callback) => {
    // Obtenim tots els rols de la taula rols
    db.query('SELECT * FROM rols', callback);
};

module.exports = { getAllRoles };
