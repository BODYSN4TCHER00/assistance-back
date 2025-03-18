// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Ruta para crear un nuevo estudiante
router.post("/students", studentController.createStudent);

// Ruta para obtener todos los estudiantes
router.get("/students", studentController.getAllStudents);

// Ruta para obtener un estudiante por ID
router.get("/students/:id", studentController.getStudentById);

// Ruta para actualizar un estudiante por ID
router.put("/students/:id", studentController.updateStudent);

// Ruta para eliminar un estudiante por ID
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
