const VehicleModel = require('../models/Vehicle.model');

const createVehicle = async (req,res) => {

  const{Vehicle_No, Vehicle_Type, Driver_Name, Driver_Contact_No, Driver_Nic, Company, No_Of_Seats} = req.body;

  const Vehicle = new VehicleModel({Vehicle_No, Vehicle_Type, Driver_Name, Driver_Contact_No, Driver_Nic, Company, No_Of_Seats});

 try{
    const newVehicle = await Vehicle.save();
    if(newVehicle){
        res.status(201).send(newVehicle);
    }
 }
catch (err){
    res.status(500).send(err);
}

}

const getAllVehicles = async (req,res) => {
   try{
    const Vehicles = await VehicleModel.find();
    if(Vehicles){
        res.status(200).send(Vehicles);
    }
   }
   catch (err){
       res.status(500).send(err);   
   }

}
const getVehicleById = async (req,res) => {
    const id = req.params.id;
    try{
        const Vehicle = await VehicleModel.findById(id);
          if(Vehicle){
            res.status(200).send(Vehicle);
          }
    }

    catch(err){
        res.status(500).send(err);
    }
}

const updateVehicle = async (req,res) => {
   const id = req.params.id;

   const{Vehicle_No, Vehicle_Type, Driver_Name, Driver_Contact_No, Driver_Nic, Company, No_Of_Seats} = req.body;

try{
    const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, {Vehicle_No, Vehicle_Type, Driver_Name, Driver_Contact_No, Driver_Nic, Company, No_Of_Seats});
    if(updatedVehicle){
        res.status(200).send(updatedVehicle);
    }
}
catch (err){
    res.status(500).send(err);
}

}

const deleteVehicle = async (req,res) => {
    const id = req.params.id;
    try{
        const deletedVehicle = await VehicleModel.findByIdAndDelete(id)
    
    if(deletedVehicle) {
        res.status(200).send(deletedVehicle);
    }
}
catch (err) {
    res.status(500).send(err);
}

}
module.exports = {createVehicle,getAllVehicles,getVehicleById,updateVehicle,deleteVehicle};
