//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const InstallerController = require("./installer.controller");

route.get("/fleet", checkAccessWithSecretKey(), InstallerController.getFleetInstallers);
route.get("/salt", checkAccessWithSecretKey(), InstallerController.getSaltInstallers);




module.exports = route;