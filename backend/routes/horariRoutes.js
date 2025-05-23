// routes/horariRoutes.js
const express = require('express');
const router = express.Router();
const horariController = require('../controllers/horariController');
const { auth } = require('../middleware/auth');

// Ruta per crear un horari, autenticació requerida
router.post('/', auth, horariController.createHorari);

// Ruta per obtenir horaris d'un usuari específic, autenticació requerida
router.get('/:usuari_id', auth, horariController.getHorarisByUser);

// Ruta per obtenir l'horari per defecte d'un usuari, autenticació requerida
router.get('/default/:usuari_id', auth, horariController.getDefaultHorari); // Nova ruta

// Ruta per actualitzar un horari segons ID, autenticació requerida
router.put('/:id', auth, horariController.updateHorari);

// Ruta per eliminar un horari segons ID, autenticació requerida
router.delete('/:id', auth, horariController.deleteHorari);

module.exports = router;
