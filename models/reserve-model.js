const Reserve = require('../entities/visit/reserve');
const mongoose= require("mongoose");
const OutPutModel = require("../utilities/ouptputModel")
class ReserveModel {

    static getReserves= async (req) => {
      const { page = 1, limit = 10, doctorId, visitDate } = req.query;
      let query = {};
      if (doctorId) {
          query.doctor = doctorId;
      }
      if (visitDate) {
          const startOfDay = new Date(visitDate);
          startOfDay.setHours(0, 0, 0, 0); // Set to start of the day (00:00:00)
  
          const endOfDay = new Date(visitDate);
          endOfDay.setHours(23, 59, 59, 999); // Set to end of the day (23:59:59)
  
          query.visitDate = {
              $gte: startOfDay,  // Greater than or equal to start of the day
              $lt: endOfDay      // Less than end of the day
          };
      }
      console.log(query)
      const total = await Reserve.countDocuments(query);
      const reservations = await Reserve.find(query)
      .populate('doctor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
   
        return OutPutModel(201,"successfully",{ totalPages: Math.ceil(total / limit),
          currentPage: page,
          reservations})
      };

      static insertReserve = async (req) => {
        const { doctor, patientName, hour, visitDate, serviceType } = req;  // Corrected the typo here
    
        if (!mongoose.Types.ObjectId.isValid(doctor)) {
            return OutPutModel(400, "Invalid Doctor ID format", []);
        }
    
        const reserve = new Reserve({
            doctor,
            patientName,  // Corrected the typo here as well
            hour,
            visitDate,
            serviceType
        });
    
        await reserve.save();
        console.log(reserve);
    
        return OutPutModel(201, "successfully", reserve);
    };
    
static UpdateReserve=async (req)=>{
  const updatedReservation = await Reserve.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedReservation) return OutPutModel(404,"Reservation not found",[]);
  return OutPutModel(200, 'Reservation updated successfully', [updatedReservation]);

};

static deleteReserve= async (req)=>{
  const deletedReservation = await Reserve.findByIdAndDelete(req.params.id);
        if (!deletedReservation) return OutPutModel(404, 'Reservation not found',[]);
        return OutPutModel(200, 'Reservation Delete successfully', []);
}

}
module.exports = ReserveModel