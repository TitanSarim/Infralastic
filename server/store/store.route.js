//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const StoreController = require("./store.controller");

route.get("/getApps", checkAccessWithSecretKey(), StoreController.getApps);
route.get("/getSpcificApp", checkAccessWithSecretKey(), StoreController.getSpecificApp);
route.get("/getAppAuthorization", checkAccessWithSecretKey(), StoreController.getAppAuthorization);
route.post("/getZoomUsers", checkAccessWithSecretKey(), StoreController.getZoomUsers);
route.post("/getMSTeamsUsers", checkAccessWithSecretKey(), StoreController.getMSTeamsUsers);












module.exports = route;