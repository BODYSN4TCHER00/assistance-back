const express = require('express');
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Crear un grupo
router.post('/', authMiddleware.protect, groupController.createGroup);

// Obtener todos los grupos
router.get('/', authMiddleware.protect, groupController.getGroups);

// Actualizar un grupo por ID
router.put('/:id', authMiddleware.protect, groupController.updateGroup);

// Eliminar un grupo por ID
router.delete('/:id', authMiddleware.protect, groupController.deleteGroup);

module.exports = router;