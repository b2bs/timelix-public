// controllers/horariController.js
const Horari = require('../models/horari');

const createHorari = (req, res) => {
  const { usuari_id, data, hora_inici, hora_fi } = req.body;
  if (!usuari_id || !data || !hora_inici || !hora_fi) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }
  Horari.createHorari(usuari_id, data, hora_inici, hora_fi, (err, result) => {
    if (err) {
      console.error('Error creant horari:', err);
      return res.status(500).json({ message: 'Error creant horari' });
    }
    res.status(201).json({ message: 'Horari creat', id: result.insertId });
  });
};

const getHorarisByUser = (req, res) => {
  const { usuari_id } = req.params;
  const { startDate, endDate } = req.query;
  if (!usuari_id) {
    return res.status(400).json({ message: 'Falta usuari_id' });
  }
  Horari.getHorarisByUser(usuari_id, startDate || '2000-01-01', endDate || '9999-12-31', (err, horaris) => {
    if (err) {
      console.error('Error obtenint horaris:', err);
      return res.status(500).json({ message: 'Error obtenint horaris' });
    }
    res.status(200).json(horaris);
  });
};

const getDefaultHorari = (req, res) => {
  const { usuari_id } = req.params;
  if (!usuari_id) {
    return res.status(400).json({ message: 'Falta usuari_id' });
  }
  Horari.getDefaultHorari(usuari_id, (err, horari) => {
    if (err) {
      console.error('Error obtenint horari per defecte:', err);
      return res.status(500).json({ message: 'Error obtenint horari per defecte' });
    }
    res.status(200).json(horari);
  });
};

const updateHorari = (req, res) => {
  const { id } = req.params;
  const { data, hora_inici, hora_fi } = req.body;
  if (!data || !hora_inici || !hora_fi) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }
  Horari.updateHorari(id, data, hora_inici, hora_fi, (err, result) => {
    if (err) {
      console.error('Error actualitzant horari:', err);
      return res.status(500).json({ message: 'Error actualitzant horari' });
    }
    res.status(200).json({ message: 'Horari actualitzat' });
  });
};

const deleteHorari = (req, res) => {
  const { id } = req.params;
  Horari.deleteHorari(id, (err, result) => {
    if (err) {
      console.error('Error eliminant horari:', err);
      return res.status(500).json({ message: 'Error eliminant horari' });
    }
    res.status(200).json({ message: 'Horari eliminat' });
  });
};

module.exports = { createHorari, getHorarisByUser, getDefaultHorari, updateHorari, deleteHorari };