const { result } = require("underscore");
const ReserveModel = require("../models/reserve-model");
const { tryCatchHandler } = require('../utilities/trycatch_handler');



// const getRese = tryCatchHandler(async (req, res) => {

//   const result = await CoursesModel.getCourse(parseInt(req.params.id));
//   if (!result) res.status(404).send("course with given id not found");
//   res.send(result);

// }) ;

const getReserves = tryCatchHandler(async (req, res) => {

    const result = await  ReserveModel.getReserves(req)
     console.log(result.Data);
    res.send(result);
}) ;

const insertReserve = (req, res) => {
  ReserveModel.insertReserve(req.body).then((result) => res.send(result));
};

const updateReserve = (req, res) => {
  
  ReserveModel.UpdateReserve(req).then((result) => res.send(result));
};


const deleteReserve = (req, res) => {

  ReserveModel.deleteReserve(req).then((result) => res.send(result));
 
};

module.exports = {
 
    getReserves,
  insertReserve,
  updateReserve,
  deleteReserve
};
