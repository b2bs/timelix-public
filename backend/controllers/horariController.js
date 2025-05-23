// controllers/horariController.js

// Importa el model de Horari per interactuar amb la base de dades
const Horari = require('../models/horari');

// Crea un nou horari per a un usuari
const createHorari = (req, res) => {
  const { usuari_id, data, hora_inici, hora_fi } = req.body;

  // Comprova que no faltin camps obligatoris
  if (!usuari_id || !data || !hora_inici || !hora_fi) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }

  // Crea l'horari amb els valors proporcionats
  Horari.createHorari(usuari_id, data, hora_inici, hora_fi, (err, result) => {
    if (err) {
      console.error('Error creant horari:', err);
      return res.status(500).json({ message: 'Error creant horari' });
    }

    // Retorna èxit amb l'identificador de l'horari creat
    res.status(201).json({ message: 'Horari creat', id: result.insertId });
  });
};

// Obté els horaris d’un usuari dins d’un rang de dates (o tots si no s’especifica)
const getHorarisByUser = (req, res) => {
  const { usuari_id } = req.params;
  const { startDate, endDate } = req.query;

  // Comprova que s'ha passat l'identificador de l'usuari
  if (!usuari_id) {
    return res.status(400).json({ message: 'Falta usuari_id' });
  }

  // Consulta a la base de dades els horaris de l'usuari dins del rang de dates
  Horari.getHorarisByUser(usuari_id, startDate || '2000-01-01', endDate || '9999-12-31', (err, horaris) => {
    if (err) {
      console.error('Error obtenint horaris:', err);
      return res.status(500).json({ message: 'Error obtenint horaris' });
    }

    // Retorna els horaris trobats
    res.status(200).json(horaris);
  });
};

// Obté l’horari per defecte d’un usuari
const getDefaultHorari = (req, res) => {
  const { usuari_id } = req.params;

  // Comprova que s'ha passat l'identificador de l'usuari
  if (!usuari_id) {
    return res.status(400).json({ message: 'Falta usuari_id' });
  }

  // Consulta l'horari per defecte a la base de dades
  Horari.getDefaultHorari(usuari_id, (err, horari) => {
    if (err) {
      console.error('Error obtenint horari per defecte:', err);
      return res.status(500).json({ message: 'Error obtenint horari per defecte' });
    }

    // Retorna l'horari per defecte
    res.status(200).json(horari);
  });
};

// Actualitza un horari existent per ID
const updateHorari = (req, res) => {
  const { id } = req.params;
  const { data, hora_inici, hora_fi } = req.body;

  // Comprova que no faltin camps obligatoris
  if (!data || !hora_inici || !hora_fi) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }

  // Actualitza l'horari a la base de dades
  Horari.updateHorari(id, data, hora_inici, hora_fi, (err, result) => {
    if (err) {
      console.error('Error actualitzant horari:', err);
      return res.status(500).json({ message: 'Error actualitzant horari' });
    }

    // Retorna confirmació d’actualització
    res.status(200).json({ message: 'Horari actualitzat' });
  });
};

// Elimina un horari per ID
const deleteHorari = (req, res) => {
  const { id } = req.params;

  // Elimina l'horari de la base de dades
  Horari.deleteHorari(id, (err, result) => {
    if (err) {
      console.error('Error eliminant horari:', err);
      return res.status(500).json({ message: 'Error eliminant horari' });
    }

    // Retorna confirmació d’eliminació
    res.status(200).json({ message: 'Horari eliminat' });
  });
};

// Exporta les funcions per poder-les utilitzar en altres parts de l’aplicació
module.exports = { createHorari, getHorarisByUser, getDefaultHorari, updateHorari, deleteHorari };
