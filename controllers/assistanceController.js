const Assistance = require('../models/Assistance');

exports.createAssistance = async (req, res) => {
    try {
        const assistance = new Assistance(req.body);
        await assistance.save();
        res.status(201).json(assistance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAssistance = async (req, res) => {
    try {
        const assistance = await Assistance.find().populate('group students.studentId');
        res.status(200).json(assistance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Más métodos como updateAssistance, deleteAssistance, etc.