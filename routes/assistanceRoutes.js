const express = require('express');
const assistanceController = require('../controllers/assistanceController');

const router = express.Router();

router.post('/', assistanceController.createAssistance);
router.get('/', assistanceController.getAssistance);
// Más rutas como PUT, DELETE, etc.

module.exports = router;