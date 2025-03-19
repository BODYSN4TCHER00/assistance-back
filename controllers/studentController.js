const Student = require('../models/Student');

// Crear un estudiante
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los estudiantes
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('group');
        res.status(200).json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar un estudiante por ID
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params; // ID del estudiante a actualizar
        const updateData = req.body; // Datos nuevos para actualizar

        // Buscar y actualizar el estudiante
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un estudiante por ID
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params; // ID del estudiante a eliminar

        // Buscar y eliminar el estudiante
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};