const RouteModel = require('../models/Route.model');

const createRoute = async (req,res) => {

  const{Route_Name, Vehicle_Type, Vehicle_No, Arrival_Time, Starting_Point, Ending_Point, Distance} = req.body;

  const Route= new RouteModel({Route_Name, Vehicle_Type, Vehicle_No, Arrival_Time, Starting_Point, Ending_Point, Distance});

 try{
    const newRoute = await Route.save();
    if(newRoute){
        res.status(201).send(newRoute);
    }
 }
catch (err){
    res.status(500).send(err);
}

}

const getAllRoutes = async (req,res) => {
   try{
    const Routes = await RouteModel.find();
    if(Routes){
        res.status(200).send(Routes);
    }
   }
   catch (err){
       res.status(500).send(err);   
   }

}
const getRouteById = async (req,res) => {
    const id = req.params.id;
    try{
        const Route = await RouteModel.findById(id);
          if(Route){
            res.status(200).send(Route);
          }
    }

    catch(err){
        res.status(500).send(err);
    }
}

const updateRoute = async (req,res) => {
   const id = req.params.id;

   const{Route_Name,Vehicle_Type,Vehicle_No, Arrival_Time, Starting_Point, Ending_Point, Distance} = req.body;

try{
    const updatedRoute = await RouteModel.findByIdAndUpdate(id, {Route_Name, Vehicle_Type, Vehicle_No, Arrival_Time, Starting_Point, Ending_Point, Distance});
    if(updatedRoute){
        res.status(200).send(updatedRoute);
    }
}
catch (err){
    res.status(500).send(err);
}

}

const deleteRoute = async (req,res) => {
    const id = req.params.id;
    try{
        const deletedRoute = await RouteModel.findByIdAndDelete(id);
    
    if(deletedRoute) {
        res.status(200).send(deletedRoute);
    }
}
catch (err) {
    res.status(500).send(err);
}

}
module.exports = {createRoute,getAllRoutes,getRouteById,updateRoute,deleteRoute};
