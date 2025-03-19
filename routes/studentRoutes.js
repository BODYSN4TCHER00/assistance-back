const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Crear un estudiante
router.post('/', authMiddleware.protect, studentController.createStudent);

// Obtener todos los estudiantes
router.get('/', authMiddleware.protect, studentController.getStudents);

// Actualizar un estudiante por ID
router.put('/:id', authMiddleware.protect, studentController.updateStudent);

// Eliminar un estudiante por ID
router.delete('/:id', authMiddleware.protect, studentController.deleteStudent);

module.exports = router;