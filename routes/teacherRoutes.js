const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Crear un profesor
router.post('/', authMiddleware.protect, teacherController.createTeacher);

// Obtener todos los profesores
router.get('/', authMiddleware.protect, teacherController.getTeachers);

// Actualizar un profesor por ID
router.put('/:id', authMiddleware.protect, teacherController.updateTeacher);

// Eliminar un profesor por ID
router.delete('/:id', authMiddleware.protect, teacherController.deleteTeacher);

module.exports = router;