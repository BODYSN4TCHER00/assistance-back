const mongoose = require('mongoose');

const AssistanceSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    students: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['present', 'absent'], required: true }
    }]
});

module.exports = mongoose.model('Assistance', AssistanceSchema);