// Importem express i configurem el router
const express = require('express');
const router = express.Router();

// Importem el controlador d'usuaris i els middleware d'autenticació i restricció de rol
const usuariController = require('../controllers/usuariController');
const { auth, restrictTo } = require('../middleware/auth');

// Rutes específiques primer: gestionen el perfil i canvi de contrasenya de l'usuari autenticat
router.get('/profile', auth, (req, res, next) => {
    console.log('Ruta GET /api/usuaris/profile'); // Log per a seguiment de peticions
    usuariController.getProfile(req, res, next); // Obtenir dades del perfil de l'usuari
});

router.put('/profile', auth, (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/profile'); // Log per a seguiment
    usuariController.updateProfile(req, res, next); // Actualitzar dades del perfil
});

router.put('/change-password', auth, (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/change-password'); // Log per canvi de contrasenya
    usuariController.changePassword(req, res, next); // Canviar la contrasenya de l'usuari
});

// Rutes amb paràmetres dinàmics, protegides per autenticació i restricció a admin (rol 1)
router.get('/', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta GET /api/usuaris/'); // Log per obtenir tots els usuaris
    usuariController.getAllUsers(req, res, next); // Obtenir llista completa d'usuaris
});

router.post('/', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta POST /api/usuaris/'); // Log per crear un nou usuari
    usuariController.createUser(req, res, next); // Crear un usuari nou
});

router.put('/:id', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/:id', req.params.id); // Log per actualitzar usuari per id
    usuariController.updateUser(req, res, next); // Actualitzar dades d'un usuari existent
});

router.delete('/:id', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta DELETE /api/usuaris/:id', req.params.id); // Log per eliminar usuari per id
    usuariController.deleteUser(req, res, next); // Eliminar un usuari
});

// Exportem el router per poder usar-lo a l'aplicació principal
module.exports = router;
