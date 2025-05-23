const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { auth } = require('../middleware/auth');

// Ruta per generar un informe, autenticació requerida
router.post('/', auth, reportController.generateReport);

module.exports = router;
