const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let LeaveRequestSchema = require("../model/EmployeeLeave");

// create a new record.
recordRoutes.route("/reqEmpLeave").post(function (req, res) {
  LeaveRequestSchema.create(req.body, (err, data) => {
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
  LeaveRequestSchema.find((err, data) => {
    if(err)
      console.log("Error in add req leave form" + err);
    else{
      res.json(data);
    }
  })
 });

 //one  user record
 recordRoutes.route("/:empID").get(function (req, res) {
  let empID = req.params.empID;
  LeaveRequestSchema.find({"empID": `${empID}`}).then(() => {
      res.json(empID);
    })
    .catch(() => {
      console.log("Error in search record");
    })
  });

 // delete a record.
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let objID = req.params.id;

  LeaveRequestSchema.findByIdAndDelete(objID).then(() => {
    res.json(objID);
  })
  .catch(() => {
    console.log("Error in delete leave form");
  })
 });

 // update a record.
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let objID = req.params.id;

  LeaveRequestSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error in update leave form" + err);
  })
 });
 
module.exports = recordRoutes;