const Group = require('../models/Group');

// Crear un grupo
exports.createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los grupos
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('teacher');
        res.status(200).json(groups);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar un grupo por ID
exports.updateGroup = async (req, res) => {
    try {
        const { id } = req.params; // ID del grupo a actualizar
        const updateData = req.body; // Datos nuevos para actualizar

        // Buscar y actualizar el grupo
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }

        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un grupo por ID
exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params; // ID del grupo a eliminar

        // Buscar y eliminar el grupo
        const deletedGroup = await Group.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }

        res.status(200).json({ message: 'Grupo eliminado correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};