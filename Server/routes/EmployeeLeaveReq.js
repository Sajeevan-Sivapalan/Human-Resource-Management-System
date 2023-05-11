const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let LeaveRequestSchema = require("../models/EmployeeLeave");

// create
recordRoutes.route("/reqEmpLeave").post(function (req, res) {
  LeaveRequestSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error -> create leave form " + err);
    else{
      console.log(data);
      res.json(data);
    }
  })
 });

 // read all records.
 recordRoutes.route("/").get(function (req, res) {
  LeaveRequestSchema.find((err, data) => {
    if(err)
      console.log("Error -> read all leave form " + err);
    else{
      res.json(data);
    }
  })
 });

 // delete
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let objID = req.params.id;

  LeaveRequestSchema.findByIdAndDelete(objID).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error -> delete leave form " + err);
  })
 });

 // update 
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let objID = req.params.id;

  LeaveRequestSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error -> update leave form " + err);
  })
 });
 
module.exports = recordRoutes;

/**
 
unused codes 

// read one record
 recordRoutes.route("/:empID").get(function (req, res) {
  let empID = req.params.empID;
  LeaveRequestSchema.find({"empID": `${empID}`}).then(() => {
      res.json(empID);
    })
    .catch((err) => {
      console.log("Error -> read one leave form " + err);
    })
  });

 */