const route = require('express').Router()

const { createApplyTransport, getAllApplyTransports, getApplyTransportById, updateApplyTransport, deleteApplyTransport} = require('../controllers/ApplyTransport.controller')

route.post("/", createApplyTransport);
route.get("/", getAllApplyTransports);
route.get("/:id", getApplyTransportById);
route.put("/:id", updateApplyTransport);
route.delete("/:id", deleteApplyTransport);

module.exports = route;