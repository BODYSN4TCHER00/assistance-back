// models/attendanceModel.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Relación con el modelo de estudiantes
    required: true,
  },
  status: {
    type: Boolean,
    required: true, // true si asistió, false si faltó
  },
  group: {
    type: String,
    required: true, // El grupo al que pertenece el estudiante
  },
  date: {
    type: Date,
    default: Date.now, // Fecha y hora de la asistencia
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
