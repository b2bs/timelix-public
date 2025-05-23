const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { auth, restrictTo } = require('../middleware/auth');

// Ruta per obtenir tots els rols, només accessible per usuaris amb rol 1 (admin)
router.get('/', auth, restrictTo(1), rolController.getAllRoles);

module.exports = router;
