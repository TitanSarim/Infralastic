// import express
const express = require("express");
const app = express();
const path = require("path");
const config = require("./config");

// Disables SSL certificate verification bcz server is installed self-certicate
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 


/////////////////// SSL CODE ADDED
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync(path.join(__dirname,'ssl','key.pem'));
var certificate = fs.readFileSync(path.join(__dirname,'ssl','cert.pem'));

var credentials = {key: privateKey, cert: certificate};
 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);



//import cors
const cors = require("cors");
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

//Rate Limit check middleware//
const rateLimit = require("./middlewares/rateLimitMiddleware");

//Installer Route
const InstallerRoute = require("./server/installer/installer.route");
app.use("/installer", InstallerRoute);

//User Route
const UserRoute = require("./server/user/user.route");
app.use("/user", UserRoute);

//Host Route
const HostRoute = require("./server/host/host.route");
app.use("/host", HostRoute);

//SALT Route
const SaltRoute = require("./server/salt/salt.route");
app.use("/salt", SaltRoute);

//Tactical RMM Route
const TacticalRMMRoute = require("./server/tacticalRMM/tactical.route");
app.use("/tactical", TacticalRMMRoute);

//Store Route
const StoreRoute = require("./server/store/store.route");
app.use("/store", StoreRoute);

//Chat Route
const ChatRoute = require("./server/chat/chat.route");
app.use("/chat", ChatRoute);



// app.all('*', (req, res) => {
//     res.render('error', { title:'404-Page not found'} );
//   })
// Prevent the server to down the app

var myErrorHandler = function(err,req,next,res){
  
    if(err){
      // console.log('testttt')
      console.log(err);
      // return res
      // .status(200)
      // .json({ status: false, message: "User Does not Exist" });
      
    }
    else{
      next();
    }
  
  };
  process.on('uncaughtException',myErrorHandler)
  
  
  
  
  httpServer.listen(config.PORT, () => {
    // httpsServer.listen(3443, () => {
    console.log("Magic happens on port: " + config.PORT);
    // console.log("Magic happens on port: 3443" );
  });