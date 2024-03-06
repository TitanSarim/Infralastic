var config = require("../../config");

const axios = require('axios');
var https = require('https');


exports.index = async (req, res) => {
  try {
    const agentApiUrl = config.tactical_rmm_api_url+'/agents/';
    const agentApiKey = config.tactical_rmm_api_key;
    
    const fleetApiUrl = config.fleet_api_url + '/api/v1/fleet/hosts';
    const fleetApiKey = config.fleet_api_key;

    // const saltApiUrl = config.baseURL+'/salt/getMinionIds';
    // const saltApiKey = config.apiAccessKey;


    // const [saltResponse,agentResponse, fleetResponse] = await Promise.all([
    const [agentResponse, fleetResponse] = await Promise.all([
      
      // axios.get(saltApiUrl, {
      //   headers: {
      //     'key': saltApiKey,
      //   },
      // }),
      axios.get(agentApiUrl, {
        headers: {
          'X-API-KEY': agentApiKey,
        },
      }),
      axios.get(fleetApiUrl, {
        headers: {
          Authorization: `Bearer ${fleetApiKey}`,
        },
        params: {
          page: req.query.page,
          per_page: req.query.per_page,
        },
      }),
    ]);

    const agentIdMap = new Map(
      agentResponse.data.map(agent => [agent.hostname, agent.agent_id])
    );



    // const saltHostMap = new Map(
    //   [...saltResponse.data.data.minions, ...saltResponse.data.data.minions_pre].map(hostname => [hostname.split('.')[0], hostname])
    // );


    const combinedHostsData = fleetResponse.data.hosts.map(fleetHost => {
      const agentId = agentIdMap.get(fleetHost.hostname);
      // const minionId = saltHostMap.get(fleetHost.hostname.split('.')[0]);
      const minionId = '';
    
      // Get the needs_reboot value from the agentResponse
      const agent = agentResponse.data.find(agent => agent.hostname === fleetHost.hostname);
      const needs_reboot = agent ? agent.needs_reboot : null;
    
      return {
        ...fleetHost,
        agentId: agentId || null,
        minionId: minionId || null,
        needs_reboot: needs_reboot || null, // Add the needs_reboot property
      };
    });



    return res
      .status(200)
      .json({ status: true, message: 'Success!!', data: { hosts: combinedHostsData } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'Server Error' });
  }
};




// Count hosts
exports.countHosts = async (req, res) => {
  
  try {


    const url = config.fleet_api_url+'/api/v1/fleet/hosts/count';
    
    const token = config.fleet_api_key;
  
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
      },
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

//Get Specifice Host
exports.getHost = async (req, res) => {
  
  try {

    const id = req.params.hostId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "host does not exists." });
    }

    const url = config.fleet_api_url+`/api/v1/fleet/hosts/${id}`;
    
    const token = config.fleet_api_key;
  
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
      },
    })
      .then(response => {
        
        const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
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


//Refetch Host
exports.refetchHost = async (req, res) => {
  
  try {

    const id = req.body.hostId;
   
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "host does not exists." });
    }

    const url = config.fleet_api_url+`/api/v1/fleet/hosts/${id}/refetch`;
    
    const token = config.fleet_api_key;
  
    axios.post(url,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        
        console.log(response);
        const data = response;
        return res.status(200).json({ status: true, message: "Success!!", data});
      })
      .catch(error => {
        
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

//Delete Host
exports.deleteHost = async (req, res) => {
  
  try {

    const id = req.body.hostId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Host Id is required" });
    }

    const url = config.fleet_api_url+`/api/v1/fleet/hosts/${id}`;
    
    const token = config.fleet_api_key;
  
    axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
      },
    })
      .then(response => {
        
        const data = response.data;
        return res.status(200).json({ status: true, message: "Success!!", data});
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

exports.checkWindowsAntivirus = async (req, res) => {
  
  try {

    const id = req.body.hostId;
    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "Host Id is required" });
    }

    const url = config.fleet_api_url+'/api/v1/fleet/queries/run';
    
    const token = config.fleet_api_key;

    const requestBody =  {

      query_ids: [25],
      host_ids: [id]
    }
  
    axios.get(url,
      {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data:JSON.stringify(requestBody)
    })
      .then(response => {
        
        const data = response.data.live_query_results[0].results[0];
        // console.log(data);
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


exports.getInstalledSoftwares = async (req, res) => {
  try {
    
    const hostIds = req.body.hostIds;
    console.log(req.body);
    if (!hostIds || !Array.isArray(hostIds) || hostIds.length === 0) {
      return res
        .status(200)
        .json({ status: false, message: "hostIds array is required and must not be empty." });
    }

    const results = [];

    // Function to make an API request for a single host ID
    const getHostInfo = (hostId) => {
      const url = config.fleet_api_url + `/api/v1/fleet/hosts/${hostId}`;
      const token = config.fleet_api_key;

      return axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {},
      });
    };

  

    // Loop through hostIds and make API requests for each
    Promise.all(hostIds.map((hostId) => getHostInfo(hostId)))
      .then((responses) => {
        responses.forEach((response, index) => {
          if (response.status === 200) {
            results.push({
              // hostId: hostIds[index], // Store the hostId along with the data
             [hostIds[index]]:{
              hostname:response.data.host.hostname,
              softwares: response.data.host.software || null,
             }
          
            });
          } else {
            console.error(`Error for host ${hostIds[index]}: ${response.status}`);
          }
        });

        return res.status(200).json({ status: true, message: "Success!!", data:results });
      })
      .catch((error) => {
        console.error(error);
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
