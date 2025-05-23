const express = require('express');
const router = express.Router();
const entradaSortidaController = require('../controllers/entradaSortidaController');
const { auth } = require('../middleware/auth');

// Ruta per registrar l'entrada, amb middleware d'autenticació
router.post('/entrada', auth, entradaSortidaController.registrarEntrada);

// Ruta per registrar la sortida, amb middleware d'autenticació
router.post('/sortida', auth, entradaSortidaController.registrarSortida);

// Ruta per obtenir les entrades i sortides d'un usuari específic, autenticació requerida
router.get('/:usuari_id', auth, entradaSortidaController.getEntradesSortides);

// Ruta per generar un informe d'entrades i sortides, autenticació requerida
router.post('/report', auth, entradaSortidaController.generateEntradesSortidesReport);

// Ruta per descarregar un informe generat, autenticació requerida
router.get('/reports/download/:file', auth, entradaSortidaController.downloadReport);

module.exports = router;
