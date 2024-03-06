//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const HostController = require("./host.controller");

route.get("/getHosts", checkAccessWithSecretKey(), HostController.index);
route.get("/countHosts", checkAccessWithSecretKey(), HostController.countHosts);
route.get("/getHostDetail/:hostId", checkAccessWithSecretKey(), HostController.getHost);
route.post("/refetchHost", checkAccessWithSecretKey(), HostController.refetchHost);
route.post("/deleteHost", checkAccessWithSecretKey(), HostController.deleteHost);
route.post("/checkWindowsAntivirus", checkAccessWithSecretKey(), HostController.checkWindowsAntivirus);
route.post("/getInstalledSoftwares", checkAccessWithSecretKey(), HostController.getInstalledSoftwares);







module.exports = route;