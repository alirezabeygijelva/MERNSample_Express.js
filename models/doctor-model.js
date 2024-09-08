const Doctor = require('../entities/docter/docter');

class DoctersModel {
    static getDocters = async () => {
        const docters = await Doctor.find();
       
        return docters;
      };
      
      static getDocter = async (id) => {
        const docters = await Doctor.findById(id);
       
        return docters;
      };
      
       static insertDocter = async (name) => {
       
        const docter = new Doctor({
            name
          });
          docter.name=name;
          console.log(docter);
        await docter.save();

         return this.getDocter(docter.id);
      };
      
      static updateDoctor = async (id,req) => {
        console.log(req);
        const doctor = await Doctor.findByIdAndUpdate(id, req, { new: true, runValidators: true });
   
        return this.getDocter(id);
      };
      
      static deleteDoctor = async (id) => {
      
        const doctor = await Doctor.findByIdAndDelete(id);
        
      };
      
    
}

module.exports = DoctersModel