//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const UserController = require("./user.controller");

route.get("/", checkAccessWithSecretKey(), UserController.index);



module.exports = route;
