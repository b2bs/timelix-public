// routes/usuariRoutes.js
const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');
const { auth, restrictTo } = require('../middleware/auth');

// Rutes més específiques primer
router.get('/profile', auth, (req, res, next) => {
    console.log('Ruta GET /api/usuaris/profile');
    usuariController.getProfile(req, res, next);
});

router.put('/profile', auth, (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/profile');
    usuariController.updateProfile(req, res, next);
});

router.put('/change-password', auth, (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/change-password');
    usuariController.changePassword(req, res, next);
});

// Rutes amb paràmetres dinàmics després
router.get('/', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta GET /api/usuaris/');
    usuariController.getAllUsers(req, res, next);
});

router.post('/', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta POST /api/usuaris/');
    usuariController.createUser(req, res, next);
});

router.put('/:id', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta PUT /api/usuaris/:id', req.params.id);
    usuariController.updateUser(req, res, next);
});

router.delete('/:id', auth, restrictTo(1), (req, res, next) => {
    console.log('Ruta DELETE /api/usuaris/:id', req.params.id);
    usuariController.deleteUser(req, res, next);
});

module.exports = router;