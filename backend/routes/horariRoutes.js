// routes/horariRoutes.js
const express = require('express');
const router = express.Router();
const horariController = require('../controllers/horariController');
const { auth } = require('../middleware/auth');

router.post('/', auth, horariController.createHorari);
router.get('/:usuari_id', auth, horariController.getHorarisByUser);
router.get('/default/:usuari_id', auth, horariController.getDefaultHorari); // Nova ruta
router.put('/:id', auth, horariController.updateHorari);
router.delete('/:id', auth, horariController.deleteHorari);

module.exports = router;