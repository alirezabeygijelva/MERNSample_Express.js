const { result } = require("underscore");
const DoctersModel = require("../models/doctor-model");
const { tryCatchHandler } = require('../utilities/trycatch_handler');

const getDoctor = tryCatchHandler(async (req, res) => {
console.log(req.params.id)
  const result = await DoctersModel.getDocter(req.params.id);
  if (!result) res.status(404).send("doctor with given id not found");
  res.send(result);

}) ;

const getDoctors = tryCatchHandler(async (req, res) => {
    
    const result = await  DoctersModel.getDocters()
    res.send(result);
}) ;

const insertDoctor = (req, res) => {
 
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name is required");
    return;
  }
  DoctersModel.insertDocter(req.body.name).then((result) => res.send(result));
};


const updateDoctor = (req, res) => {
  
  DoctersModel.getDocter(req.params.id).then((result) => {
    if (!result) return res.status(404).send("Doctor with given id not found");
  });
 
  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("name is required and more than 3 charachter");
 
  DoctersModel.updateDoctor(req.params.id,req.body).then(
    (result) => {
      res.send(result);
    }
  );
};
const deleteDoctor = (req, res) => {
 
  DoctersModel.getDocter(req.params.id).then((result) => {
    if (!result) return res.status(404).send("Doctor with given id not found");
  }); 
  
  DoctersModel.deleteDoctor(req.params.id).then(() => {
    res.send("Delete was Sucssesful");
  });
};


module.exports = {
  getDoctor,
    getDoctors,
    insertDoctor,
    updateDoctor,
    deleteDoctor
  };
  