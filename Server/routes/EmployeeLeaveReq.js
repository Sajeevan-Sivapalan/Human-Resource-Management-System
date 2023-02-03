const mongoose = require("mongoose")
const express = require("express");
const recordRoutes = express.Router();

let LeaveRequestSchema = require("../model/EmployeeLeave");

// create a new record.
recordRoutes.route("/reqEmpLeave").post(function (req, res) {
  LeaveRequestSchema.create(req.body, (err, data) => {
    if (err)
      console.log("Error in add req leave form" + err);
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

 // delete a record.
 recordRoutes.route("/deleteEmpLeave/:id").delete(function (req, res)  {
  let empID = req.params.id;

  LeaveRequestSchema.findByIdAndDelete(empID).then(() => {
    res.json(empID);
  })
  .catch(() => {
    console.log("Error in delete leave form");
  })
 });

 // update a record.
 recordRoutes.route("/updateEmpLeave/:id").put(function (req, res)  {
  let empID = req.params.id;

  LeaveRequestSchema.findByIdAndUpdate(empID, req.body).then(() => {
    res.json(empID);
  })
  .catch((err) => {
    console.log("Error in update leave form" + err);
  })
 });

// This section will help you get a list of all the records.
/*recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});*/
 
module.exports = recordRoutes;