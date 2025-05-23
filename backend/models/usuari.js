// models/usuari.js
const db = require('../config/db');

// Obtenim tots els usuaris amb els camps específics
const getAllUsers = (callback) => {
    db.query('SELECT id, nom, cognoms, correu, rol_id FROM usuaris', callback);
};

// Creem un nou usuari a la base de dades
const createUser = (nom, cognoms, correu, contrasenya, rol_id, callback) => {
    const query = 'INSERT INTO usuaris (nom, cognoms, correu, contrasenya, rol_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nom, cognoms, correu, contrasenya, rol_id], callback);
};

// Actualitzem només el nom, cognoms i correu d'un usuari (perfil)
const updateUserProfile = (id, nom, cognoms, correu, callback) => {
    const query = 'UPDATE usuaris SET nom = ?, cognoms = ?, correu = ? WHERE id = ?';
    db.query(query, [nom, cognoms, correu, id], (err, result) => {
        if (err) {
            console.error('Error a la consulta SQL d\'updateUserProfile:', {
                error: err.message,
                sqlError: err.sqlMessage,
                sqlState: err.sqlState,
                code: err.code
            });
            return callback(err);
        }
        callback(null, result);
    });
};

// Actualitzem un usuari amb rol inclòs
const updateUser = (id, nom, cognoms, correu, rol_id, callback) => {
    const query = 'UPDATE usuaris SET nom = ?, cognoms = ?, correu = ?, rol_id = ? WHERE id = ?';
    db.query(query, [nom, cognoms, correu, rol_id, id], (err, result) => {
        if (err) {
            console.error('Error a la consulta SQL d\'updateUser:', err);
            return callback(err);
        }
        callback(null, result);
    });
};

// Eliminem un usuari per id
const deleteUser = (id, callback) => {
    const query = 'DELETE FROM usuaris WHERE id = ?';
    db.query(query, [id], callback);
};

// Obtenim un usuari per id amb tots els camps importants
const getUserById = (id, callback) => {
    db.query('SELECT id, nom, cognoms, correu, contrasenya, rol_id FROM usuaris WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error a la consulta SQL de getUserById:', err);
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Comprovem si un correu ja existeix en la base de dades, excloent un usuari concret (per a actualitzacions)
const checkEmailExists = (correu, excludeUserId, callback) => {
    db.query('SELECT id FROM usuaris WHERE correu = ? AND id != ?', [correu, excludeUserId], (err, results) => {
        if (err) {
            console.error('Error a la consulta SQL de checkEmailExists:', err);
            return callback(err);
        }
        callback(null, results.length > 0);
    });
};

module.exports = { getAllUsers, createUser, updateUser, updateUserProfile, deleteUser, getUserById, checkEmailExists };
