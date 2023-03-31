const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let SuspiciousLeaveSchema = require("../model/SuspiciousEmployeeLeave");

// create a new record.
recordRoutes.route("/addSuspiciousLeaveRecord").post(function (req, res) {
    SuspiciousLeaveSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error in add suspicious leave record " + err);
    else{
      console.log(data);
      res.json(data);
    }
  })
 });

 // get all records.
 recordRoutes.route("/").get(function (req, res) {
    SuspiciousLeaveSchema.find((err, data) => {
    if(err)
      console.log("Error in get suspicious leave record" + err);
    else{
      res.json(data);
    }
  })
 });

 //one  user record
 recordRoutes.route("/:empID").get(function (req, res) {
  let empID = req.params.empID;
  SuspiciousLeaveSchema.find({"empID": `${empID}`}).then(() => {
      res.json(empID);
    })
    .catch(() => {
      console.log("Error in search record");
    })
  });

 // delete a record.
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let objID = req.params.id;

  SuspiciousLeaveSchema.findByIdAndDelete(objID).then(() => {
    res.json(objID);
  })
  .catch(() => {
    console.log("Error in delete leave form");
  })
 });

 // update a record.
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let objID = req.params.id;

  SuspiciousLeaveSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error in update leave form" + err);
  })
 });
 
module.exports = recordRoutes;