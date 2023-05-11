const route = require('express').Router()

const { createVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle } = require('../controllers/Vehicle.controller')

route.post("/", createVehicle);
route.get("/", getAllVehicles);
route.get("/:id", getVehicleById);
route.put("/:id", updateVehicle);
route.delete("/:id", deleteVehicle);

module.exports = route;