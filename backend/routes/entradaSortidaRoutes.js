const express = require('express');
const router = express.Router();
const entradaSortidaController = require('../controllers/entradaSortidaController');
const { auth } = require('../middleware/auth');

router.post('/entrada', auth, entradaSortidaController.registrarEntrada);
router.post('/sortida', auth, entradaSortidaController.registrarSortida);
router.get('/:usuari_id', auth, entradaSortidaController.getEntradesSortides);
router.post('/report', auth, entradaSortidaController.generateEntradesSortidesReport);
router.get('/reports/download/:file', auth, entradaSortidaController.downloadReport);

module.exports = router;

