
const mongoose= require("mongoose");

const doctorSchema = new mongoose.Schema({

    
    name: {
        type: String,
        required: true
      },
      reserves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserve'
      }]
})
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;