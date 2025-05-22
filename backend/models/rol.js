const db = require('../config/db');

const getAllRoles = (callback) => {
    db.query('SELECT * FROM rols', callback);
};

module.exports = { getAllRoles };