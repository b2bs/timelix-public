const db = require('../config/db');

const Tasques = {};

// Inserim una nova tasca a la base de dades
Tasques.createTasca = (usuari_id, data, descripcio, hora_inici, hora_fi, callback) => {
  const query = 'INSERT INTO tasques (usuari_id, data, descripcio, hora_inici, hora_fi) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [usuari_id, data, descripcio, hora_inici, hora_fi], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Obtenim totes les tasques d'un usuari entre dues dates
Tasques.getTasquesByUser = (usuari_id, startDate, endDate, callback) => {
  const query = 'SELECT * FROM tasques WHERE usuari_id = ? AND data BETWEEN ? AND ?';
  db.query(query, [usuari_id, startDate, endDate], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Obtenim una tasca específica per id
Tasques.getTascaById = (id, callback) => {
  const query = 'SELECT * FROM tasques WHERE id = ?';
  db.query(query, [id], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows[0]);
  });
};

// Obtenim l'horari d'un usuari per una data concreta, o retornem horari per defecte si no existeix
Tasques.getHorariByUserAndDate = (usuari_id, data, callback) => {
  const query = `
    SELECT hd.hora_inici, hd.hora_fi
    FROM horaris h
    LEFT JOIN horari_dies hd ON h.id = hd.horari_id AND hd.dia = ?
    WHERE h.usuari_id = ? AND ? BETWEEN h.data_inici AND h.data_fi
  `;
  db.query(query, [data, usuari_id, data], (err, rows) => {
    if (err) return callback(err);
    if (rows.length === 0) {
      return callback(null, { hora_inici: '08:00:00', hora_fi: '16:00:00' });
    }
    const horari = rows[0];
    if (!horari.hora_inici || !horari.hora_fi) {
      return callback(null, { hora_inici: '08:00:00', hora_fi: '16:00:00' });
    }
    callback(null, horari);
  });
};

// Obtenim tasques completes (amb hores d'inici i fi) d'un usuari per una data concreta
Tasques.getTasquesByUserAndDate = (usuari_id, data, callback) => {
  const query = 'SELECT * FROM tasques WHERE usuari_id = ? AND data = ? AND hora_inici IS NOT NULL AND hora_fi IS NOT NULL';
  db.query(query, [usuari_id, data], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Actualitzem una tasca per id
Tasques.updateTasca = (id, data, descripcio, hora_inici, hora_fi, callback) => {
  const query = 'UPDATE tasques SET data = ?, descripcio = ?, hora_inici = ?, hora_fi = ? WHERE id = ?';
  db.query(query, [data, descripcio, hora_inici, hora_fi, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Eliminem una tasca per id
Tasques.deleteTasca = (id, callback) => {
  const query = 'DELETE FROM tasques WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Marquem una tasca com a completada o no completada
Tasques.completarTasca = (id, completada, callback) => {
  const query = 'UPDATE tasques SET completada = ? WHERE id = ?';
  db.query(query, [completada, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = Tasques;
