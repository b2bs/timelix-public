// models/horari.js
const db = require('../config/db');

const Horari = {};

Horari.createHorari = (usuari_id, data, hora_inici, hora_fi, callback) => {
  // Primer, creem un registre a la taula horaris amb data_inici i data_fi iguals (per a un sol dia)
  const queryHorari = 'INSERT INTO horaris (usuari_id, data_inici, data_fi) VALUES (?, ?, ?)';
  db.query(queryHorari, [usuari_id, data, data], (err, result) => {
    if (err) return callback(err);

    const horari_id = result.insertId;
    // Després, afegim el dia específic a la taula horari_dies
    const queryDia = 'INSERT INTO horari_dies (horari_id, dia, hora_inici, hora_fi) VALUES (?, ?, ?, ?)';
    db.query(queryDia, [horari_id, data, hora_inici, hora_fi], (err, resultDia) => {
      if (err) {
        // Si hi ha un error, eliminem el registre de la taula horaris per mantenir consistència
        db.query('DELETE FROM horaris WHERE id = ?', [horari_id], () => {});
        return callback(err);
      }
      callback(null, { insertId: horari_id });
    });
  });
};

Horari.getHorarisByUser = (usuari_id, startDate, endDate, callback) => {
  const query = `
    SELECT h.id, h.usuari_id, hd.dia AS data, hd.hora_inici, hd.hora_fi
    FROM horaris h
    JOIN horari_dies hd ON h.id = hd.horari_id
    WHERE h.usuari_id = ? AND hd.dia BETWEEN ? AND ?
  `;
  db.query(query, [usuari_id, startDate, endDate], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

Horari.getDefaultHorari = (usuari_id, callback) => {
  // Comprovem si l'usuari té un horari específic per al dia actual
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT h.id, h.usuari_id, hd.dia AS data, hd.hora_inici, hd.hora_fi
    FROM horaris h
    JOIN horari_dies hd ON h.id = hd.horari_id
    WHERE h.usuari_id = ? AND hd.dia = ?
  `;
  db.query(query, [usuari_id, today], (err, rows) => {
    if (err) return callback(err);
    if (rows.length > 0) {
      callback(null, rows[0]);
    } else {
      // Si no hi ha horari específic, retornem l'horari per defecte
      callback(null, { hora_inici: '08:00:00', hora_fi: '16:00:00' });
    }
  });
};

Horari.updateHorari = (id, data, hora_inici, hora_fi, callback) => {
  // Actualitzem la taula horaris
  const queryHorari = 'UPDATE horaris SET data_inici = ?, data_fi = ? WHERE id = ?';
  db.query(queryHorari, [data, data, id], (err, result) => {
    if (err) return callback(err);

    // Actualitzem la taula horari_dies
    const queryDia = 'UPDATE horari_dies SET dia = ?, hora_inici = ?, hora_fi = ? WHERE horari_id = ?';
    db.query(queryDia, [data, hora_inici, hora_fi, id], (err, resultDia) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

Horari.deleteHorari = (id, callback) => {
  // Eliminem de la taula horari_dies
  const queryDia = 'DELETE FROM horari_dies WHERE horari_id = ?';
  db.query(queryDia, [id], (err) => {
    if (err) return callback(err);

    // Eliminem de la taula horaris
    const queryHorari = 'DELETE FROM horaris WHERE id = ?';
    db.query(queryHorari, [id], callback);
  });
};

module.exports = Horari;