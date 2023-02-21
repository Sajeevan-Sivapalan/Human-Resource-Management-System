const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let AttendanceSchema = require("../model/EmployeeAttendance");

// create a new record.
recordRoutes.route("/AttendanceEntry").post(function (req, res) {
  AttendanceSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error in add attendance entry " + err);
    else{
      console.log(data);
      res.json(data);
    }
  })
 });

 // get all records.
 recordRoutes.route("/").get(function (req, res) {
  AttendanceSchema.find((err, data) => {
    if(err)
      console.log("Error in retrive data" + err);
    else{
      res.json(data);
    }
  })
 });

 //search
 recordRoutes.route("/:empID/:date").get(function (req, res) {
  let empID = req.params.empID;
  let date = req.params.date;
  AttendanceSchema.find({"empID":`$empID`, "date":`$date`}).then(() => {
      res.json(empID);
    })
    .catch((err) => {
      console.log("Error in search record" + err);
    })
  });

 // delete a record.
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let empID = req.params.id;

  AttendanceSchema.findByIdAndDelete(empID).then(() => {
    res.json(empID);
  })
  .catch(() => {
    console.log("Error in delete leave form");
  })
 });

 // update a record.
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let objID = req.params.id;

  AttendanceSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error in update leave form" + err);
  })
 });
 
module.exports = recordRoutes;