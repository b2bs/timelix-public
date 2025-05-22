const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { auth, restrictTo } = require('../middleware/auth');

router.get('/', auth, restrictTo(1), rolController.getAllRoles);

module.exports = router;