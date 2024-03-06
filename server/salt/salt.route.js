//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const SaltController = require("./salt.controller");

route.get("/getMinionIds", checkAccessWithSecretKey(), SaltController.index);
route.post("/acceptMinion", checkAccessWithSecretKey(), SaltController.acceptMinion);
route.post("/executeCmd", checkAccessWithSecretKey(), SaltController.executeCmd);
route.post("/installChocolatey", checkAccessWithSecretKey(), SaltController.installchocolatey);
route.post("/installSoftware", checkAccessWithSecretKey(), SaltController.installSoftware);
route.post("/executePowershell", checkAccessWithSecretKey(), SaltController.executePowershell);
route.post("/updatePassword", checkAccessWithSecretKey(), SaltController.updatePassword);
route.post("/deleteMinion", checkAccessWithSecretKey(), SaltController.deleteMinion);





module.exports = route;