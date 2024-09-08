const Visit = require('../entities/visit/visit');
const mongoose= require("mongoose");
const OutPutModel = require("../utilities/ouptputModel")
class VisitModel {

    static getVisits= async (req) => {
      const { page = 1, limit = 10, doctorId, patientName } = req.query;
      let query = {};
      if (doctorId) {
          query.doctor = doctorId;
      }
      if (patientName) {
        query.patientName=patientName;
      }
      console.log(query)
      const total = await Visit.countDocuments(query);
      const visitdata = await Visit.find(query)
      .populate('doctor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
   
        return OutPutModel(201,"successfully",{ totalPages: Math.ceil(total / limit),
          currentPage: page,
          visitdata})
      };

      static insertVisit = async (req) => {
        const { doctor, patientName, payment, visitDate, serviceType,InsurenceType } = req;  // Corrected the typo here
    
        if (!mongoose.Types.ObjectId.isValid(doctor)) {
            return OutPutModel(400, "Invalid Doctor ID format", []);
        }
    
        const visit = new Visit({
            doctor,
            patientName,  // Corrected the typo here as well
            payment,
            visitDate,
            serviceType,
            InsurenceType
        });
        console.log(visit);
        await visit.save();
       
    
        return OutPutModel(201, "successfully", visit);
    };
    
static UpdateVisit=async (req)=>{
  const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedVisit) return OutPutModel(404,"Visit not found",[]);
  return OutPutModel(200, 'Visit updated successfully', [updatedVisit]);

};

static deleteVisit= async (req)=>{
  const deletedVisit = await Visit.findByIdAndDelete(req.params.id);
        if (!deletedVisit) return OutPutModel(404, 'Visit not found',[]);
        return OutPutModel(200, 'Visit Delete successfully', []);
}

}
module.exports = VisitModel