const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let AttendanceSchema = require("../model/EmployeeAttendance");

// create a new record.
recordRoutes.route("/AttendanceEntry").post(function (req, res) {
  AttendanceSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error in add req leave form " + err);
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
      console.log("Error in add req leave form" + err);
    else{
      res.json(data);
    }
  })
 });

 //search
 recordRoutes.route("/Search/:empID").get(function (req, res) {
  let empID = req.params.empID;
  AttendanceSchema.find({"empID": `${empID}`}).then(() => {
      res.json(empID);
    })
    .catch(() => {
      console.log("Error in search record");
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
  let empID = req.params.id;

  AttendanceSchema.findByIdAndUpdate(empID, req.body).then(() => {
    res.json(empID);
  })
  .catch((err) => {
    console.log("Error in update leave form" + err);
  })
 });
 
module.exports = recordRoutes;