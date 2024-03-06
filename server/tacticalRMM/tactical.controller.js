var config = require("../../config");

const axios = require('axios');
var https = require('https');
const fs = require('fs');
const path = require('path');


function getFileNameForInstaller($platform,$ostype){
  if($platform == 'windows'){
    if($ostype == 'amd64'){
      return "trmm-windows-infralastic-server-amd64.exe";
    }
    else{
      return "trmm-windows-infralastic-workstation-386.exe";
    }
  }
  else if($platform == 'linux'){
    if($ostype == 'amd64'){
      return "trmm-windows-infralastic-server-amd64.exe";
    }
    else if($ostype == 'arm64'){
      return "trmm-windows-infralastic-server-arm64.exe";

    }
    else if($ostype == 'arm'){
      return "trmm-windows-infralastic-server-arm.exe";

    }
    else{
      return "trmm-windows-infralastic-server-386.exe";
    }
  }
  else{
    if($ostype == 'amd64'){
      return "trmm-windows-infralastic-server-amd64.exe";
    }
    else{
      return "trmm-windows-infralastic-server-arm64.exe";
    }
  }
}

function getinstallMethod($platform){
  if($platform == 'windows'){
    return "exe";
  }
  else if($platform == 'linux'){
    return "bash";
  }
  else{
    return "mac";
  }
}


// Generate Installer
exports.generateInstaller = async (req, res) => {
  try {
    const apiUrl = config.tactical_rmm_api_url + `/agents/installer/`;
    const token = config.tactical_rmm_api_key;

    const clientId = req.body.clientId;
    const siteId = req.body.siteId;
    const platform = req.body.platform;
    const osType = req.body.osType;
    
     if (!clientId) {
       return res
         .status(200)
         .json({ status: false, message: "client id is required." });
     }

     if (!siteId) {
      return res
        .status(200)
        .json({ status: false, message: "site id is required." });
    }

    if (!platform) {
      return res
        .status(200)
        .json({ status: false, message: "Platform is required." });
    }

    if (!osType) {
      return res
        .status(200)
        .json({ status: false, message: "OS Type is required." });
    }

    var filename = getFileNameForInstaller(platform,osType);
    var installMethod = getinstallMethod(platform);

    const requestData = {
      installMethod: installMethod,
      client: clientId,
      site: siteId,
      expires: 87600, //10 year
      agenttype: 'server',
      power: 0,
      rdp: 1, //boolean
      ping: 1,//boolean
      goarch: osType,
      api: config.tactical_rmm_api_url,
      fileName: filename,
      plat: platform,
    };

    const axiosConfig = {
      method: 'post',
      url: apiUrl,
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      data: requestData,
      responseType: 'arraybuffer', // Set the response type to arraybuffer
    };

    const response = await axios(axiosConfig);

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Save the downloaded file to a specified path
      const downloadDir = path.join(__dirname, '../../public/installers/tactical');
      const filename = `${platform}-${osType}-installer.exe`;
      const downloadPath = path.join(downloadDir, filename);

      // Create the downloads directory if it doesn't exist
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
      }

      // Save the downloaded file to the specified path
      fs.writeFileSync(downloadPath, response.data);
      // console.log('File downloaded successfully.');
      data = {
        url:`${config.baseURL}/public/installers/tactical/${filename}`
      };
      return res.status(200).json({ status: true, message: 'Installer generated successfully.',data});
    } else {
      // console.error('Error generating installer:', response.statusText);
      return res.status(500).json({ status: false, error: 'Error generating installer.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ status: false, error: error.message || 'Server Error' });
  }
};

//Get Clients
exports.getClients = async (req, res) => {
  
  try {

    const apiUrl = config.tactical_rmm_api_url + `/clients`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      const modifiedData = response.data.map((client) => {
        const modifiedSites = client.sites.map((site) => {
          return {
            id: site.id,
            name: site.name,
            client_name: site.client_name,
            client: site.client,
          };
        });

        return {
          id: client.id,
          name: client.name,
          sites: modifiedSites,
        };
      });

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: modifiedData });
    })
      .catch(error => {
        console.log(error.response.data);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Get Chocos Softwares
// Pagination on my end bcz tactical not support any pagination
// exports.getChocosSoftwares = async (req, res) => {
//   try {
//     const apiUrl = config.tactical_rmm_api_url + `/software/chocos/`;
//     const token = config.tactical_rmm_api_key;
//     const chunkSize = parseInt(req.query.per_page) || 200; // Convert per_page to an integer

//     const response = await axios.get(apiUrl, {
//       headers: {
//         'X-API-KEY': token,
//         'Content-Type': 'application/json',
//       },
//     });

//     const allData = response.data;
//     const totalChunks = Math.ceil(allData.length / chunkSize);

//     const requestedChunkIndex = parseInt(req.query.page) || 0; // Convert page to an integer

//     if (requestedChunkIndex < 0 || requestedChunkIndex >= totalChunks) {
//       return res.status(400).json({
//         status: false,
//         error: 'Invalid page number',
//       });
//     }

//     const startIdx = requestedChunkIndex * chunkSize;
//     const endIdx = Math.min(startIdx + chunkSize, allData.length);
//     const requestedChunk = allData.slice(startIdx, endIdx);

//     return res.status(200).json({
//       status: true,
//       message: 'Success!!',
//       totalPages: totalChunks,
//       data: requestedChunk,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: false, error: error.message || 'Server Error' });
//   }
// };

// Get chocs software without Pagination
exports.getChocosSoftwares = async (req, res) => {
  try {
    const apiUrl = config.tactical_rmm_api_url + `/software/chocos/`;
    const token = config.tactical_rmm_api_key;
  //npm s  const chunkSize = parseInt(req.query.per_page) || 200; // Convert per_page to an integer

    const response = await axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
    });

    const allData = response.data;


    return res.status(200).json({
      status: true,
      message: 'Success!!',
      data: allData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'Server Error' });
  }
};

//Install Software
exports.installSoftware = async (req, res) => {
  
  try {

    const id = req.body.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }

    const name = req.body.name;
    if (!name) {
      return res
        .status(200)
        .json({ status: false, message: "Software name is required." });
    }

    const url = config.tactical_rmm_api_url+`/software/${id}/`;  
    const token = config.tactical_rmm_api_key;
    
    var requestdata = JSON.stringify({
      "name": name
    });
    
    var axiosconfig = {
      method: 'post',
      // url: 'https://tapi.infralastic.com/software/qwnpNLAxpqdgQaOtLBYFfgbyHikBBqoKADkBpcYn/',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      },
      data : requestdata
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
  
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// Get Patches
exports.getPatches = async (req, res) => {
  
  try {

    const id = req.query.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }
    
    const apiUrl = config.tactical_rmm_api_url + `/winupdate/${id}/`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      
      data = response.data;

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    })
      .catch(error => {
        console.log(error.response.data);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Install Patch
exports.installPatch = async (req, res) => {
  
  try {

    const id = req.body.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }

    const url = config.tactical_rmm_api_url+`/winupdate/${id}/install/`;  
    const token = config.tactical_rmm_api_key;
    
  
    var axiosconfig = {
      method: 'post',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      }
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
  
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Get control :-P Do out of the box :-)
exports.getControl = async (req, res) => {
  
  try {

    const id = req.query.agentId;
    var type = req.query.type;


    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }


    if (!type) {
      return res
        .status(200)
        .json({ status: false, message: "Type is required." });
    }

    

    const apiUrl = config.tactical_rmm_api_url + `/agents/${id}/meshcentral/`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      
      var modifiedData = {
        hostname:response.data.hostname,
        status:response.data.status,
        client:response.data.client,
        site:response.data.site
      };
    
      
      if(type == 'remote_desktop'){
        // type = 'control';

        modifiedData[type] = response.data.control;
      }
      else if(type == 'file_browsing'){
        // type = 'file';

        modifiedData[type] = response.data.file;
      }
      else if(type == 'live_terminal'){
        // type = 'terminal';

        modifiedData[type] = response.data.terminal;
      }
      else{
        return res
          .status(200)
          .json({ status: false, message: "Type value is not valid." });
      }

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data:modifiedData });
    })
      .catch(error => {
        console.log(error.response.data);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};


// Get Agents
exports.getAgents = async (req, res) => {
  
  try {
    
    const apiUrl = config.tactical_rmm_api_url + `/agents`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      
      data = response.data;

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    })
      .catch(error => {
        console.log(error);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// Get Agents
exports.getSpecificAgent = async (req, res) => {
  
  try {

    const id = req.query.agentId;

    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }
    
    const apiUrl = config.tactical_rmm_api_url + `/agents/${id}/`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      
      data = response.data;

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    })
      .catch(error => {
        console.log(error.response.data);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Create Check
exports.createChecks = async (req, res) => {
  
  try {

    const id = req.body.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }


    const warning_threshold = req.body.warning_threshold;
    if (!warning_threshold) {
      return res
        .status(200)
        .json({ status: false, message: "warning_threshold is required." });
    }

    const error_threshold = req.body.error_threshold;
    if (!error_threshold) {
      return res
        .status(200)
        .json({ status: false, message: "error_threshold is required." });
    }

    const check_type = req.body.check_type;
    if (!check_type) {
      return res
        .status(200)
        .json({ status: false, message: "Check Type is required." });
    }

    requestBody = {
      "agent": id,
      "check_type": check_type,
      "warning_threshold": warning_threshold,
      "error_threshold": error_threshold,
      "fails_b4_alert": 1,
      "run_interval": 1, //86400 //One day in seconds
      "dashboard_alert":true
    };

    if(check_type == 'diskspace'){

      const disk = req.body.disk;
      if (!disk) {
        return res
          .status(200)
          .json({ status: false, message: "Disk is required." });
      }

      requestBody.disk = disk
    }


    const url = config.tactical_rmm_api_url+`/checks/`;  
    const token = config.tactical_rmm_api_key;
    
    var requestData = JSON.stringify(requestBody);

    var axiosconfig = {
      method: 'post',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      },
      data : requestData
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
  
      if (error.response && error.response.data) {
        const responseData = error.response.data;

        // Check if the error message matches the specific message you want to handle
        if (
          responseData &&
          responseData.non_field_errors &&
          responseData.non_field_errors.length > 0 
        ) {
          // Handle the specific error message
          return res.status(200).json({
            status: true,
            error: {
              non_field_errors: [
                responseData.non_field_errors[0]
              ]
            }
          });
        }

        // Handle other errors
        return res
          .status(404)
          .json({ status: false, error: responseData || "Server Error" });
      } else {
        
        return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
      }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Install Patch
exports.runChecks = async (req, res) => {
  
  try {

    const id = req.body.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }

    const url = config.tactical_rmm_api_url+`/checks/${id}/run/`;  
    const token = config.tactical_rmm_api_key;
    
  
    var axiosconfig = {
      method: 'post',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      }
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
  
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// Function to retrieve agent details by agentId
const getAgentDetails = async (agentId) => {

  const apiUrl = config.tactical_rmm_api_url + `/agents/${agentId}/`;
  const token = config.tactical_rmm_api_key;


  const agentDetailsResponse = await axios.get(apiUrl, {
    headers: {
      'X-API-KEY': token
    }
  });
  return agentDetailsResponse.data;
};

// Function to retrieve checks by agentId
const getChecksByAgentId = async (agentId) => {
  
  const apiUrl = config.tactical_rmm_api_url + `/agents/${agentId}/checks/`;
  const token = config.tactical_rmm_api_key;
  
  const checksResponse = await axios.get(apiUrl, {
    headers: {
      'X-API-KEY': token
    }
  });
  return checksResponse.data;
};

// Get soecific Check
exports.getSpecificCheck = async (req, res) => {
  
  try {

    const id = req.query.agentId;

    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }
    
    const apiUrl = config.tactical_rmm_api_url + `/agents/${id}/checks/`;
    const token = config.tactical_rmm_api_key;
  
    axios.get(apiUrl, {
      headers: {
        'X-API-KEY': token,
        'Content-Type': 'application/json',
      },
      params: {
      },
    })
    .then((response) => {
      
      var data = response.data.map((check) => {

        return {

          more_info:check.check_result.more_info
        }

      });

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    })
      .catch(error => {
        console.log(error.response);
        if(error.response){

          return res
          .status(404)
          .json({ status: false, error: error.response.data.message || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
        
      });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.getAgentDetailsAndChecks = async (req,res) => {
  try {

    const id = req.query.agentId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }
    // Get agent details
    const agentDetails = await getAgentDetails(id);

    // Get checks for the same agent
    const checks = await getChecksByAgentId(id);

    // Map checks to agent based on hostname
    const agentChecks = checks.map((check) => ({
      check_result:check.check_result,
      agentId: id, // Add agentId to checks for reference
      hostname: agentDetails.hostname, // Add agentHostname to checks
    }));

    const data = agentChecks;
    return res.status(200).json({ status: true, message: "Success!!", data});
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


// Get All Alerts
exports.getAlerts = async (req, res) => {
  
  try {
    
    const apiUrl = config.tactical_rmm_api_url + `/alerts`;
    const token = config.tactical_rmm_api_key;


    var axiosConfig = {
      method: 'patch',
      url: apiUrl,
      headers: { 
        'X-API-KEY': token
      }
    };
    
    axios(axiosConfig)
    .then(function (response) {

      data = response.data.map((item)=>{
        return {
          id:item.id,
          hostname: item.hostname,
          agent_id: item.agent_id,
          client: item.client,
          site: item.site,
          alert_type: item.alert_type,
          message: item.message,
          severity: item.severity,
          message: item.message,

        };
      });

      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    })
    .catch(function (error) {
      if(error.response.data){

        return res
        .status(404)
        .json({ status: false, error: error.response.data.message || "Server Error" });
      }
      else{
        return res
        .status(404)
        .json({ status: false, error: error.message || "Server Error" });
      }
    });
 
   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};


// Execute Commands
exports.executeCommands = async (req, res) => {
  
    try {
  
      const id = req.body.agentId;
      const shell = req.body.shell;
      const command = req.body.command;


      if (!id) {
        return res
          .status(200)
          .json({ status: false, message: "Agent Id is required." });
      }
  
      if (!shell) {
        return res
          .status(200)
          .json({ status: false, message: "Shell Type is required." });
      }

      if (!command) {
        return res
          .status(200)
          .json({ status: false, message: "Command is required." });
      }
  
      const url = config.tactical_rmm_api_url+`/agents/${id}/cmd/`;  
      const token = config.tactical_rmm_api_key;
      
      var requestdata = JSON.stringify({
 
        "cmd": command,
        "custom_shell": null,
        "run_as_user": false,
        "shell": shell,
        "timeout": 60
      });
      
      var axiosconfig = {
        method: 'post',
        url:url,
        headers: { 
          'X-API-KEY': token, 
          'Content-Type': 'application/json'
        },
        data : requestdata
      };
      
      axios(axiosconfig)
      .then(function (response) {
        const data = response.data;
          return res.status(200).json({ status: true, message: "Success!!", data});
      })
      .catch(function (error) {
        console.log(error);
          if(error.response.data){
  
            return res
            .status(404)
            .json({ status: false, error: error.response.data || "Server Error" });
          }
          else{
            return res
            .status(404)
            .json({ status: false, error: error.message || "Server Error" });
          }
      });
  
     
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, error: error.message || "Server Error" });
    }
};

// Update User Password
exports.updatePassword = async (req, res) => {
  
  try {

    const id = req.body.agentId;
    const user = req.body.user;
    const password = req.body.password;


    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Agent Id is required." });
    }

    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "user is required." });
    }

    if (!password) {
      return res
        .status(200)
        .json({ status: false, message: "Password is required." });
    }

    const url = config.tactical_rmm_api_url+`/agents/${id}/cmd/`;  
    const token = config.tactical_rmm_api_key;

    var command = 'net user '+user+' '+password;
    
    var requestdata = JSON.stringify({

      "cmd": command,
      "custom_shell": null,
      "run_as_user": false,
      "shell": 'cmd',
      "timeout": 60
    });
    
    var axiosconfig = {
      method: 'post',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      },
      data : requestdata
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
      console.log(error);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};


// Add Clients
exports.addClient = async (req, res) => {
  
  try {

    const client_name = req.body.client_name;
    const site_name = req.body.site_name;


    if (!client_name) {
      return res
        .status(200)
        .json({ status: false, message: "client name is required." });
    }

    if (!site_name) {
      return res
        .status(200)
        .json({ status: false, message: "site name is required." });
    }

    

    const url = config.tactical_rmm_api_url+`/clients/`;  
    const token = config.tactical_rmm_api_key;
    
    var requestdata = JSON.stringify({

      "client": {"name":client_name},
      "site": {"name":site_name},
      "custom_fields":[]
    });
    
    var axiosconfig = {
      method: 'post',
      url:url,
      headers: { 
        'X-API-KEY': token, 
        'Content-Type': 'application/json'
      },
      data : requestdata
    };
    
    axios(axiosconfig)
    .then(function (response) {
      const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
    })
    .catch(function (error) {
      console.log(error);
        if(error.response.data){

          return res
          .status(404)
          .json({ status: false, error: error.response.data || "Server Error" });
        }
        else{
          return res
          .status(404)
          .json({ status: false, error: error.message || "Server Error" });
        }
    });

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};