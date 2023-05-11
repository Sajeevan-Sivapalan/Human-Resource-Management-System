const route = require('express').Router()

const { createRoute, getAllRoutes, getRouteById, updateRoute, deleteRoute } = require('../controllers/Route.controller')

route.post("/", createRoute);
route.get("/", getAllRoutes);
route.get("/:id", getRouteById);
route.put("/:id", updateRoute);
route.delete("/:id", deleteRoute);

module.exports = route;