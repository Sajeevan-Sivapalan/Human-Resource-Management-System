const ApplyTransportModel = require('../models/ApplyTransport.model');

const createApplyTransport = async (req,res) => {

  const{Emp_id, Route_Name, Vehicle_Type, Emp_Contact_Number} = req.body;

  const ApplyTransport = new ApplyTransportModel({Emp_id, Route_Name, Vehicle_Type, Emp_Contact_Number});

 try{
    const newApplyTransport = await ApplyTransport.save();
    if(newApplyTransport){
        res.status(201).send(newApplyTransport);
    }
 }
catch (err){
    res.status(500).send(err);
}

}

const getAllApplyTransports = async (req,res) => {
   try{
    const ApplyTransports = await ApplyTransportModel.find();
    if(ApplyTransports){
        res.status(200).send(ApplyTransports);
    }
   }
   catch (err){
       res.status(500).send(err);   
   }

}
const getApplyTransportById = async (req,res) => {
    const id = req.params.id;
    try{
        const ApplyTransport = await ApplyTransportModel.findById(id);
          if(ApplyTransport){
            res.status(200).send(ApplyTransport);
          }
    }

    catch(err){
        res.status(500).send(err);
    }
}

const updateApplyTransport = async (req,res) => {
   const id = req.params.id;

   const{Emp_id, Route_Name, Vehicle_Type, Emp_Contact_Number} = req.body;

try{
    const updatedApplyTransport = await ApplyTransportModel.findByIdAndUpdate(id, {Emp_id, Route_Name, Vehicle_Type, Emp_Contact_Number});
    if(updatedApplyTransport){
        res.status(200).send(updatedApplyTransport);
    }
}
catch (err){
    res.status(500).send(err);
}

}

const deleteApplyTransport = async (req,res) => {
    const id = req.params.id;
    try{
        const deletedApplyTransport = await ApplyTransportModel.findByIdAndDelete(id)
    
    if(deletedApplyTransport) {
        res.status(200).send(deletedApplyTransport);
    }
}
catch (err) {
    res.status(500).send(err);
}

}
module.exports = {createApplyTransport,getAllApplyTransports,getApplyTransportById,updateApplyTransport,deleteApplyTransport};
