// routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const { markAttendance } = require("../controllers/attendanceController");

// Ruta para marcar la asistencia de un estudiante
router.post("/attendance", markAttendance);

module.exports = router;
