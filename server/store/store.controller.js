var config = require("../../config");

const axios = require('axios');
var https = require('https');
var qs = require('qs');

// import { Apideck } from '@apideck/node';
const { Apideck } = require('@apideck/node');


//Get Connectors
exports.getApps = async (req, res) => {
  
  try {

  
    // const apideck = new Apideck({
    //   apiKey: config.apideck_api_key,
    //   appId: config.apideck_app_id
    // });
    
    // const body = {
    //   limit: '20',
    //   filter: {
    //     unified_api:'team-messaging'
    //   }
    //   // resourceId: 'resource_id_example'
    // }
    
    try {
      // const { data } = await apideck.connector.connectorsAll(body);
      // console.log('API called successfully', data)

      var data = [
        {
          id: "zoom",
          name: "Zoom",
          status: "live",
          description: "Zoom is a communications platform that allows users to connect with video, audio, phone, and chat.",
          icon_url: `${config.baseURL}/public/app-store/zoom/icon.png`,
          logo_url: `${config.baseURL}/public/app-store/zoom/logo.png`,
          website_url: "https://zoom.us/",
        },
        {
          id: "microsoft-teams",
          name: "Microsoft Teams",
          status: "live",
          description: "Microsoft Teams is the hub for team collaboration in Microsoft 365 that integrates the people, content, and tools your team needs to be more engaged and effective.",
          icon_url: `${config.baseURL}/public/app-store/microsoft-teams/icon.png`,
          logo_url: `${config.baseURL}/public/app-store/microsoft-teams/logo.png`,
          website_url: "https://products.office.com/en-us/microsoft-teams/group-chat-software",
        },
        {
          id: "slack",
          name: "Slack",
          status: "live",
          description: "Slack is where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.",
          icon_url: `${config.baseURL}/public/app-store/slack/icon.png`,
          logo_url: `${config.baseURL}/public/app-store/slack/logo.png`,
          website_url: "https://slack.com/",
        },
        {
          id: "skype",
          name: "Skype",
          status: "live",
          description: "Keep in touch with free video chat, messaging & affordable international calls. Create instant online video calls with one click, no download required.",
          icon_url: `${config.baseURL}/public/app-store/skype/icon.png`,
          logo_url: `${config.baseURL}/public/app-store/skype/logo.png`,
          website_url: "https://www.skype.com/en/",
        },
        {
          id: "trello",
          name: "Trello",
          status: "live",
          description: "Trello makes it easy for your team to get work done. No matter the project, workflow, or type of team, Trello can help keep things organized. It’s simple – sign-up, create a board, and you’re off! Productivity awaits.",
          icon_url: `${config.baseURL}/public/app-store/trello/icon.png`,
          logo_url: `${config.baseURL}/public/app-store/trello/logo.png`,
          website_url: "https://trello.com/",
        }
    ];
      return res
        .status(200)
        .json({ status: true, message: 'Success!!', data: data });
    } 
    catch (error) {
      console.error(error);
      // return error.json()
    }

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//Get Specific App Detail
exports.getSpecificApp = async (req, res) => {
  
  try {

    const id = req.query.app_id;

    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "App Id is required." });
    }
    
    const data = getSpecificAppData(id);
   

    return res
    .status(200)
    .json({ status: true, message: 'Success!!', data: data });
   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

function getSpecificAppData(app_id) {
  let requiredData = [];

  switch (app_id) {
    case 'zoom':
      requiredData = {
        id: "zoom",
        name: "Zoom",
        status: "live",
        description: "Zoom is a communications platform that allows users to connect with video, audio, phone, and chat.",
        icon_url: `${config.baseURL}/public/app-store/zoom/icon.png`,
        logo_url: `${config.baseURL}/public/app-store/zoom/logo.png`,
        website_url: "https://zoom.us/",
      };
      break;
    case 'microsoft-teams':
      requiredData = {
        id: "microsoft-teams",
        name: "Microsoft Teams",
        status: "live",
        description: "Microsoft Teams is the hub for team collaboration in Microsoft 365 that integrates the people, content, and tools your team needs to be more engaged and effective.",
        icon_url: `${config.baseURL}/public/app-store/microsoft-teams/icon.png`,
        logo_url: `${config.baseURL}/public/app-store/microsoft-teams/logo.png`,
        website_url: "https://products.office.com/en-us/microsoft-teams/group-chat-software",
      };
      break;
    case 'slack':
      requiredData = {
        id: "slack",
        name: "Slack",
        status: "live",
        description: "Slack is where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.",
        icon_url: `${config.baseURL}/public/app-store/slack/icon.png`,
        logo_url: `${config.baseURL}/public/app-store/slack/logo.png`,
        website_url: "https://slack.com/",
      };
      break;
    case 'skype':
      requiredData = {
        id: "skype",
        name: "Skype",
        status: "live",
        description: "Keep in touch with free video chat, messaging & affordable international calls. Create instant online video calls with one click, no download required.",
        icon_url: `${config.baseURL}/public/app-store/skype/icon.png`,
        logo_url: `${config.baseURL}/public/app-store/skype/logo.png`,
        website_url: "https://www.skype.com/en/",
      };
      break;
    case 'trello':
      requiredData = {
        id: "trello",
        name: "Trello",
        status: "live",
        description: "Trello makes it easy for your team to get work done. No matter the project, workflow, or type of team, Trello can help keep things organized. It’s simple – sign-up, create a board, and you’re off! Productivity awaits.",
        icon_url: `${config.baseURL}/public/app-store/trello/icon.png`,
        logo_url: `${config.baseURL}/public/app-store/trello/logo.png`,
        website_url: "https://trello.com/",
      };
      break;
    default:
      requiredData = [];
      break;
  }

  return requiredData;
}

//Get App Authorization
exports.getAppAuthorization = async (req, res) => {
  
  try {

    const id = req.query.app_id;

    if (!id) {
      return res
        .status(200)
        .json({ status: false, message: "App Id is required." });
    }
    
    const data = getRequiredAuthorizationData(id);

    return res
    .status(200)
    .json({ status: true, message: 'Success!!', data: data });
   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

function getRequiredAuthorizationData(app_id) {
  let requiredData = [];

  switch (app_id) {
    case 'zoom':
      requiredData = ['account_id', 'client_id', 'client_secret'];
      break;
    default:
      requiredData = [];
      break;
  }

  return requiredData;
}

// ZOOM

// Function to obtain a Zoom OAuth token
async function obtainZoomOAuthToken(base64EncodedCredentials,account_id) {

var data = qs.stringify({
  'grant_type': 'account_credentials',
  'account_id': account_id 
});
var axiosConfig = {
  method: 'post',
  url: 'https://zoom.us/oauth/token',
  headers: { 
    'Host': 'zoom.us', 
    'Authorization': `Basic ${base64EncodedCredentials}`, 
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data : data
};

return axios(axiosConfig)
.then(function (response) {

  const tokenData = response.data;
  return tokenData.access_token;
})
.catch(function (error) {
  console.log(error);
});

}


exports.getZoomUsers = async (req, res) => {

  try {
    
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const accountId = req.body.accountId;
    const pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 30;
    const page_number = req.body.page_number ? parseInt(req.body.page_number) : 1;

    if ((!clientId) || (!clientSecret) || (!accountId)) {
      return res
        .status(200)
        .json({ status: false, message: "All fields are required." });
    }

    const combinedCredentials = `${clientId}:${clientSecret}`;

    // Use btoa to base64 encode the combined credentials
    const base64EncodedCredentials = btoa(combinedCredentials);

    const oauthToken = await obtainZoomOAuthToken(base64EncodedCredentials,accountId);
    console.log(oauthToken);
    if (!oauthToken) {
      return res
      .status(200)
      .json({ status: false, message: "oauth Token is missing." });
    }

    try {
      apiUrl = `https://api.zoom.us/v2/users?page_size=${pageSize}&page_number=${page_number}`;
      // apiUrl = 'https://api.zoom.us/v2/accounts/me/billing/invoices?from="2023-01-01&&?to2023-08-01"';
      // apiUrl= 'https://api.zoom.us/v2/ report/billing';
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${oauthToken}`,
        },
      });
      console.log(response.data);
      return res
      .status(200)
      .json({ status: true, message: "Success!!", data: response.data });

    } 
    catch (error) {
      console.log(error);
      return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
    }
    
  } 
  catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// ZOOM End

// Microsoft Teams

// Function to obtain a Zoom OAuth token
async function obtainMSTeamsOAuthToken(clientId,clientSecret,tenantId) {

  var data = qs.stringify({
    'client_id': clientId,
    'client_secret' : clientSecret,
    'grant_type': 'client_credentials',
    'scope' : 'https://graph.microsoft.com/.default',

  });
  var axiosConfig = {
    method: 'post',
    url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data : data
  };
  
  return axios(axiosConfig)
  .then(function (response) {
  
    const tokenData = response.data;
    return tokenData.access_token;
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

exports.getMSTeamsUsers = async (req, res) => {

  try {
    
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const tenantId = req.body.tenantId;
    const pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 30;
    const page_number = req.body.page_number ? parseInt(req.body.page_number) : 1;

    if ((!clientId) || (!clientSecret) || (!tenantId)) {
      return res
        .status(200)
        .json({ status: false, message: "All fields are required." });
    }


    const oauthToken = await obtainMSTeamsOAuthToken(clientId,clientSecret,tenantId);
    console.log(oauthToken);
    if (!oauthToken) {
      return res
      .status(200)
      .json({ status: false, message: "oauth Token is missing." });
    }

    try {
      apiUrl = `https://graph.microsoft.com/v1.0/users`;
      // apiUrl = "https://graph.microsoft.com/v1.0/servicePrincipals(appId='51117015-48d0-4b92-85c0-ceaf4959a23c')?$select=id,appId,displayName,appRoles,oauth2PermissionScopes,resourceSpecificApplicationPermissions";
    
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${oauthToken}`,
        },
      });
      // console.log(response.data);
      return res
      .status(200)
      .json({ status: true, message: "Success!!", data: response.data });

    } 
    catch (error) {
      return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
    }
    
  } 
  catch (error) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
// Microsoft Teams End

