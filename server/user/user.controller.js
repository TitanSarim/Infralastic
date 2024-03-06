var config = require("../../config");

const axios = require('axios');

//get user
exports.index = async (req, res) => {
  
  try {


    const url = config.fleet_api_url+'/api/v1/fleet/me';
    
    const token = config.fleet_api_key;
  
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        
        const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
      })
      .catch(error => {
        return res
        .status(500)
        .json({ status: false, error: error || "Server Error" });
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

