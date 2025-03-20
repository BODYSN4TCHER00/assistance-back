const Teacher = require('../models/Teacher');

// Crear un profesor
exports.createTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los profesores
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('groups');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar un profesor por ID
exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un profesor por ID
exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        res.status(200).json({ message: 'Profesor eliminado correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
