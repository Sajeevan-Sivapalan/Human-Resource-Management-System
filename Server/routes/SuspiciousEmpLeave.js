const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let SuspiciousLeaveSchema = require("../model/SuspiciousEmployeeLeave");

// create
recordRoutes.route("/addSuspiciousLeaveRecord").post(function (req, res) {
    SuspiciousLeaveSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error -> create suspicious leave record " + err);
    else{
      console.log(data);
      res.json(data);
    }
  })
 });

 // read all records.
 recordRoutes.route("/").get(function (req, res) {
    SuspiciousLeaveSchema.find((err, data) => {
    if(err)
      console.log("Error -> read all suspicious leave record" + err);
    else{
      res.json(data);
    }
  })
 });

module.exports = recordRoutes;

/**
 
unused codes 

//read one record
 recordRoutes.route("/:empID").get(function (req, res) {
  let empID = req.params.empID;
  SuspiciousLeaveSchema.find({"empID": `${empID}`}).then(() => {
      res.json(empID);
    })
    .catch((err) => {
      console.log("Error -> read one suspicious leave record " + err);
    })
  });

 // delete
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let objID = req.params.id;

  SuspiciousLeaveSchema.findByIdAndDelete(objID).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error -> delete suspicious leave record " + err);
  })
 });

 // update
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let objID = req.params.id;

  SuspiciousLeaveSchema.findByIdAndUpdate(objID, req.body).then(() => {
    res.json(objID);
  })
  .catch((err) => {
    console.log("Error -> update suspicious leave record " + err);
  })
 });

 */