//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const TacticalController = require("./tactical.controller");

route.post("/generateInstaller", checkAccessWithSecretKey(), TacticalController.generateInstaller);
route.get("/getClients", checkAccessWithSecretKey(), TacticalController.getClients);
route.get("/getAgents", checkAccessWithSecretKey(), TacticalController.getAgents);
route.get("/getSpecificAgent", checkAccessWithSecretKey(), TacticalController.getSpecificAgent);
route.get("/getChocosSoftwares", checkAccessWithSecretKey(), TacticalController.getChocosSoftwares);
route.post("/installSoftware", checkAccessWithSecretKey(), TacticalController.installSoftware);
route.get("/getPatches", checkAccessWithSecretKey(), TacticalController.getPatches);
route.post("/installPatch", checkAccessWithSecretKey(), TacticalController.installPatch);
route.get("/getControl", checkAccessWithSecretKey(), TacticalController.getControl);
route.post("/createChecks", checkAccessWithSecretKey(), TacticalController.createChecks);
route.post("/runChecks", checkAccessWithSecretKey(), TacticalController.runChecks);
route.get("/getSpecificCheck", checkAccessWithSecretKey(), TacticalController.getAgentDetailsAndChecks);
route.get("/getAlerts", checkAccessWithSecretKey(), TacticalController.getAlerts);
route.post("/executeCommands", checkAccessWithSecretKey(), TacticalController.executeCommands);
route.post("/updatePassword", checkAccessWithSecretKey(), TacticalController.updatePassword);
route.post("/addClient", checkAccessWithSecretKey(), TacticalController.addClient);







module.exports = route;