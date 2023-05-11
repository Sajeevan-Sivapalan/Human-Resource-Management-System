const route = require('express').Router()

const { createTransportPayment, getAllTransportPayments, getTransportPaymentById, updateTransportPayment, deleteTransportPayment } = require('../controllers/TransportPayment.controller')

route.post("/", createTransportPayment);
route.get("/", getAllTransportPayments);
route.get("/:id", getTransportPaymentById);
route.put("/:id", updateTransportPayment);
route.delete("/:id", deleteTransportPayment);

module.exports = route;