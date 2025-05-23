// routes/tasquesRoutes.js
const express = require('express');
const router = express.Router();
const tasquesController = require('../controllers/tasquesController');
const { auth } = require('../middleware/auth');

// Ruta per crear una tasca, només accessible amb autenticació
router.post('/', auth, tasquesController.createTasca);

// Ruta per obtenir les tasques de l'usuari autenticat
router.get('/', auth, tasquesController.getTasques);

// Ruta per actualitzar una tasca per ID
router.put('/:id', auth, tasquesController.updateTasca);

// Ruta per eliminar una tasca per ID
router.delete('/:id', auth, tasquesController.deleteTasca);

// Ruta per marcar o desmarcar una tasca com completada, per ID (nova ruta)
router.put('/:id/completar', auth, tasquesController.completarTasca);

module.exports = router;
