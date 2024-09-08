const { result } = require("underscore");
const VisitModel = require("../models/visit-model");
const { tryCatchHandler } = require('../utilities/trycatch_handler');



// const getRese = tryCatchHandler(async (req, res) => {

//   const result = await CoursesModel.getCourse(parseInt(req.params.id));
//   if (!result) res.status(404).send("course with given id not found");
//   res.send(result);

// }) ;

const getVisits = tryCatchHandler(async (req, res) => {

    const result = await  VisitModel.getVisits(req)
     console.log(result.Data);
    res.send(result);
}) ;

const insertVisit = (req, res) => {
    VisitModel.insertVisit(req.body).then((result) => res.send(result));
};

const updateVisit = (req, res) => {
  
    VisitModel.UpdateVisit(req).then((result) => res.send(result));
};


const deleteVisit = (req, res) => {

    VisitModel.deleteVisit(req).then((result) => res.send(result));
 
};

module.exports = {
 
    getVisits,
    insertVisit,
  updateVisit,
  deleteVisit
};
