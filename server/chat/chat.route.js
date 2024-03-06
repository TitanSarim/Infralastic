//Express
const express = require("express");

const route = express.Router();

//Dev and Security Key
const checkAccessWithSecretKey = require("../../middlewares/checkAccessMiddleware");

const ChatController = require("./chat.controller");

route.post("/", checkAccessWithSecretKey(), ChatController.generateChat);








module.exports = route;