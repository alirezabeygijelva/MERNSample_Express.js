const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {  // Corrected the typo here
        type: String,
        required: true
    },
    hour: {
        type: String,
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
});

const Reserve = mongoose.model('Reserve', reserveSchema);
module.exports = Reserve;
