// controllers/attendanceController.js
const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");

const markAttendance = async (req, res) => {
  const { studentId, status, group } = req.body;

  try {
    // Verificar si el estudiante existe
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    // Crear el registro de asistencia
    const attendance = new Attendance({
      studentId,
      status,
      group,
    });

    // Guardar la asistencia
    await attendance.save();

    res.status(201).json({ message: "Asistencia registrada correctamente", attendance });
  } catch (err) {
    res.status(400).json({ message: "Error al registrar la asistencia", error: err.message });
  }
};

module.exports = { markAttendance };
