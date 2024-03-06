var config = require("../../config");

const querystring = require('querystring');
const axios = require('axios');


//const axiosWithInterceptor = require('./salt.token'); // Import the modified axios instance

exports.index = async (req, res) => {
  try {
    const url = config.salt_api_url + '/keys';

    // Use the axiosWithInterceptor instance instead of the regular axios
    axiosWithInterceptor.get(url, {
      params: {
        // Add your query parameters here
      },
    })
    .then(response => {
      // console.log(response);
      const data = response.data.return;
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


exports.acceptMinion = async (req, res) => {

   const id = req.body.minionId;
   
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Minion id is required." });
    }

  try {
    const url = config.salt_api_url + '/run';

    // Create an object with your query parameters
    const queryParams = {

      client: 'wheel',
      fun: 'key.accept',
      match: id,
      username: config.salt_username,
      password: config.salt_password,
      eauth: 'pam'
      
    };

    // Convert the object to x-www-form-urlencoded format
    const formData = querystring.stringify(queryParams);

    // Make the GET request with the data in the request body
    const response = await axiosWithInterceptor.post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
      },
    });

    const data = response.data.return;
    return res.status(200).json({ status: true, message: "Success!!", data });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};


exports.executeCmd = async (req, res) => {

   const id = req.body.minionId;
   const command = req.body.command;
   
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Minion id is required." });
    }
    if (!command) {
      return res
        .status(200)
        .json({ status: false, message: "Command is required." });
    }

  try {
    const url = config.salt_api_url + '/run';

    // Create an object with your query parameters
    const queryParams = {

      client: 'local',
      fun: 'cmd.run',
      tgt: id,
      arg:command,
      username: config.salt_username,
      password: config.salt_password,
      eauth: 'pam'
      
    };

    // Convert the object to x-www-form-urlencoded format
    const formData = querystring.stringify(queryParams);

    // Make the GET request with the data in the request body
    const response = await axiosWithInterceptor.post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
      },
    });

    console.log(response.data);

    const data = response.data.return[0][id];
    return res.status(200).json({ status: true, message: "Success!!", data });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.executePowershell = async (req, res) => {

  const id = req.body.minionId;
  const command = req.body.command;
  
   if (!id) {
     return res
       .status(200)
       .json({ status: false, message: "Minion id is required." });
   }
   if (!command) {
     return res
       .status(200)
       .json({ status: false, message: "Command is required." });
   }

 try {
   const url = config.salt_api_url + '/run';

   // Create an object with your query parameters
   const queryParams = {

     client: 'local',
     fun: 'cmd.run',
     tgt: id,
     arg:command,
     kwarg: '{"shell": "powershell"}',
     username: config.salt_username,
     password: config.salt_password,
     eauth: 'pam'
     
   };

   // Convert the object to x-www-form-urlencoded format
   const formData = querystring.stringify(queryParams);

   // Make the GET request with the data in the request body
   const response = await axiosWithInterceptor.post(url, formData, {
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
     },
   });

   const data = response.data.return[0][id];
   return res.status(200).json({ status: true, message: "Success!!", data });

 } catch (error) {
   console.log(error);
   return res
     .status(500)
     .json({ status: false, error: error.message || "Server Error" });
 }
};

// update Minon User Password
exports.updatePassword = async (req, res) => {

   const id = req.body.minionId;
   const user = req.body.user;
   const password = req.body.password;
   
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Minion id is required." });
    }
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "User is required." });
    }
    if (!password) {
      return res
        .status(200)
        .json({ status: false, message: "Password is required." });
    }

  try {
    const url = config.salt_api_url + '/run';

    var command = 'net user '+user+' '+password;

    // Create an object with your query parameters
    const queryParams = {

      client: 'local',
      fun: 'cmd.run',
      tgt: id,
      arg:command,
      username: config.salt_username,
      password: config.salt_password,
      eauth: 'pam'
      
    };

    // Convert the object to x-www-form-urlencoded format
    const formData = querystring.stringify(queryParams);

    // Make the GET request with the data in the request body
    const response = await axiosWithInterceptor.post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
      },
    });

    const data = response.data.return;
    return res.status(200).json({ status: true, message: "Success!!", data });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// Delete Minion
exports.deleteMinion = async (req, res) => {

   const id = req.body.minionId;
   
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Minion id is required." });
    }
    

  try {
    const url = config.salt_api_url + '/run';

    // Create an object with your query parameters
    const queryParams = {

      client: 'wheel',
      fun: 'key.delete',
      match: id,
      username: config.salt_username,
      password: config.salt_password,
      eauth: 'pam'
      
    };

    // Convert the object to x-www-form-urlencoded format
    const formData = querystring.stringify(queryParams);

    // Make the GET request with the data in the request body
    const response = await axiosWithInterceptor.post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
      },
    });

    const data = response.data.return;
    return res.status(200).json({ status: true, message: "Success!!", data });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// Install chocolatey in windows minion machine

exports.installchocolatey = async (req, res) => {

  const id = req.body.minionId;
  
   if (!id) {
     return res
       .status(200)
       .json({ status: false, message: "Minion id is required." });
   }
 
 try {
   const url = config.salt_api_url + '/run';

   // Create an object with your query parameters
   const queryParams = {

     client: 'local',
     fun: 'chocolatey.bootstrap',
     tgt: id,
     username: config.salt_username,
     password: config.salt_password,
     eauth: 'pam'
     
   };

   // Convert the object to x-www-form-urlencoded format
   const formData = querystring.stringify(queryParams);

   // Make the GET request with the data in the request body
   const response = await axiosWithInterceptor.post(url, formData, {
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
     },
   });

   const data = response.data.return[0][id];
   return res.status(200).json({ status: true, message: "Success!!", data });

 } catch (error) {
   console.log(error);
   return res
     .status(500)
     .json({ status: false, error: error.message || "Server Error" });
 }
};

exports.installSoftware = async (req, res) => {

  const id = req.body.minionId;
  const software = req.body.software;
  
   if (!id) {
     return res
       .status(200)
       .json({ status: false, message: "Minion id is required." });
   }
   if (!software) {
     return res
       .status(200)
       .json({ status: false, message: "software is required." });
   }


  const request = {
    body: {
      minionId: id,
      command: 'choco install '+software+' -y',
    },
  };

  const response = {
    status: (statusCode) => {
      return {
        json: (data) => {
          // const data = response.data.return[0][id];
          return res.status(200).json({ status: true, message: "Success!!", data });
        },
      };
    },
  };

  await exports.executeCmd(request, response);
};

