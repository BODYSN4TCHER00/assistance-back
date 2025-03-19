const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const teacher = new Teacher({ name, email, password });
        await teacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await teacher.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher.id).select('-password');
        res.status(200).json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};