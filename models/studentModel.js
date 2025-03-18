// models/studentModel.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nombre del estudiante
  },
  email: {
    type: String,
    required: true,
    unique: true, // El email debe ser único
  },
  group: {
    type: String,
    required: true, // El grupo al que pertenece el estudiante
  },
  age: {
    type: Number,
    required: true, // Edad del estudiante
  },
  gender: {
    type: String,
    required: true, // Género del estudiante
    enum: ['Male', 'Female', 'Other'], // Opciones para género
  },
});

module.exports = mongoose.model("Student", studentSchema);
