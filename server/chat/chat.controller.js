var config = require("../../config");

const axios = require('axios');
var https = require('https');


exports.generateChat = async (req, res) => {
  
    try {
  
      const message = req.body.message;
      if (!message) {
        return res
          .status(200)
          .json({ status: false, message: "message is required" });
      }

  
      var data = JSON.stringify({
        "message": message
      });
      
      var axiosConfig = {
        method: 'post',
        url: `${config.chat_api_url}/chat`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(axiosConfig)
      .then(function (response) {

        return res
        .status(200)
        .json({ status: true, message: "Success!!", data:response.data });

      })
      .catch(function (error) {
        
        return res
        .status(500)
        .json({ status: false, error: error.message || "Server Error" });

      });
  
     
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, error: error.message || "Server Error" });
    }
  };