const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta per fer login, crida al controlador corresponent
router.post('/login', authController.login);

// Ruta per registrar un nou usuari
router.post('/register', authController.register);

// Ruta per fer logout de l'usuari
router.post('/logout', authController.logout);

module.exports = router;
