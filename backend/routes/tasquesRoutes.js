// routes/tasquesRoutes.js
const express = require('express');
const router = express.Router();
const tasquesController = require('../controllers/tasquesController');
const { auth } = require('../middleware/auth');

router.post('/', auth, tasquesController.createTasca);
router.get('/', auth, tasquesController.getTasques);
router.put('/:id', auth, tasquesController.updateTasca);
router.delete('/:id', auth, tasquesController.deleteTasca);
router.put('/:id/completar', auth, tasquesController.completarTasca); // Nova ruta

module.exports = router;