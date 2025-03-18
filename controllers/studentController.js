// controllers/studentController.js
const Student = require("../models/studentModel");

// Crear un nuevo estudiante
exports.createStudent = async (req, res) => {
  try {
    const { name, email, group, age, gender } = req.body;
    const newStudent = new Student({ name, email, group, age, gender });
    await newStudent.save();
    res.status(201).json({ message: "Estudiante creado exitosamente", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el estudiante", error: err });
  }
};

// Obtener todos los estudiantes
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los estudiantes", error: err });
  }
};

// Obtener un estudiante por ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el estudiante", error: err });
  }
};

// Actualizar un estudiante por ID
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, group, age, gender } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, group, age, gender },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.status(200).json({ message: "Estudiante actualizado", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el estudiante", error: err });
  }
};

// Eliminar un estudiante por ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.status(200).json({ message: "Estudiante eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el estudiante", error: err });
  }
};
