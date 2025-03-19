const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.registerTeacher);
router.post('/login', authController.loginTeacher);
router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;