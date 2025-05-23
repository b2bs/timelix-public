const db = require('../config/db');

const Horari = {};

Horari.createHorari = (usuari_id, data, hora_inici, hora_fi, callback) => {
  // Creem un registre nou a la taula horaris amb la data d'inici i fi iguals per representar un sol dia
  const queryHorari = 'INSERT INTO horaris (usuari_id, data_inici, data_fi) VALUES (?, ?, ?)';
  db.query(queryHorari, [usuari_id, data, data], (err, result) => {
    if (err) return callback(err);

    const horari_id = result.insertId;
    // Afegim la informació específica del dia i hores a la taula horari_dies vinculada al horari creat
    const queryDia = 'INSERT INTO horari_dies (horari_id, dia, hora_inici, hora_fi) VALUES (?, ?, ?, ?)';
    db.query(queryDia, [horari_id, data, hora_inici, hora_fi], (err, resultDia) => {
      if (err) {
        // En cas d'error, eliminem el registre creat a horaris per mantenir la integritat de les dades
        db.query('DELETE FROM horaris WHERE id = ?', [horari_id], () => {});
        return callback(err);
      }
      callback(null, { insertId: horari_id });
    });
  });
};

Horari.getHorarisByUser = (usuari_id, startDate, endDate, callback) => {
  // Obtenim els horaris d'un usuari entre dues dates, juntament amb els dies i hores associades
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
      // Retornem l'horari específic si existeix per al dia actual
      callback(null, rows[0]);
    } else {
      // Si no existeix horari específic, retornem l'horari per defecte
      callback(null, { hora_inici: '08:00:00', hora_fi: '16:00:00' });
    }
  });
};

Horari.updateHorari = (id, data, hora_inici, hora_fi, callback) => {
  // Actualitzem la data d'inici i fi a la taula horaris per l'horari indicat
  const queryHorari = 'UPDATE horaris SET data_inici = ?, data_fi = ? WHERE id = ?';
  db.query(queryHorari, [data, data, id], (err, result) => {
    if (err) return callback(err);

    // Actualitzem el dia i les hores a la taula horari_dies per l'horari indicat
    const queryDia = 'UPDATE horari_dies SET dia = ?, hora_inici = ?, hora_fi = ? WHERE horari_id = ?';
    db.query(queryDia, [data, hora_inici, hora_fi, id], (err, resultDia) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

Horari.deleteHorari = (id, callback) => {
  // Eliminem els dies associats a l'horari de la taula horari_dies
  const queryDia = 'DELETE FROM horari_dies WHERE horari_id = ?';
  db.query(queryDia, [id], (err) => {
    if (err) return callback(err);

    // Eliminem l'horari de la taula horaris
    const queryHorari = 'DELETE FROM horaris WHERE id = ?';
    db.query(queryHorari, [id], callback);
  });
};

module.exports = Horari;
