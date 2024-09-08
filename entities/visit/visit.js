const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {  // Corrected the typo here
        type: String,
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['Consultation', 'Follow-up', 'Surgery', 'Emergency'],
        required: true
    },
    InsurenceType: {
        type: String,
        enum: ['Tamin', 'Natinal'],
        required: true
    },
});

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
