const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let AttendanceSchema = require("../model/EmployeeAttendance");

// create 
recordRoutes.route("/AttendanceEntry").post(function (req, res) {
  AttendanceSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error -> create attendance " + err);
    else{
      console.log(data);
      res.json(data);
    }
  })
 });

 // read all records.
 recordRoutes.route("/").get(function (req, res) {
  AttendanceSchema.find((err, data) => {
    if(err)
      console.log("Error -> read all attendance " + err);
    else{
      res.json(data);
    }
  })
 });

 // delete
 recordRoutes.route("/deleteAttendance/:id").delete(function (req, res)  {
  let empID = req.params.id;

  AttendanceSchema.findByIdAndDelete(empID).then(() => {
    res.json(empID);
  })
  .catch((err) => {
    console.log("Error -> delete Attendance " + err);
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
      console.log("Error -> read one attendance " + err);
    })
  });

// update
 recordRoutes.route("/updateAttendance/:id").put(function (req, res)  {
  let objID = req.params.id;

  AttendanceSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error -> update Attendance " + err);
  })
 });

 */