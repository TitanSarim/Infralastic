const axios = require('axios');
const config = require("../../config");
const https = require('https');

let accessToken = null;
let tokenExpiration = 0;
let isRefreshing = false;

// Function to get or refresh the access token
async function getAccessToken() {
  const url = config.salt_api_url + '/login';
  const tokenResponse = await axios.post(url, {
    username: config.salt_username,
    password: config.salt_password,
    eauth: 'pam'
  });

  // Update the access token and its expiration time
  accessToken = tokenResponse.data.return[0].token;
  tokenExpiration = tokenResponse.data.return[0].expire * 1000; // Convert Unix timestamp to milliseconds

  return accessToken;
}

// Function to check if the token is near to expiration
function isTokenNearExpiration() {
  const currentTime = Date.now();
  return accessToken === null || currentTime >= (tokenExpiration - 300000); // Within 5 minutes before expiration (300,000 milliseconds)
}

// Axios interceptor to handle token refresh before each request
axios.interceptors.request.use(async (config) => {
  // Check if the token is near to expiration
  if (isTokenNearExpiration() && !isRefreshing) {
    // Refresh the token only if not already refreshing
    isRefreshing = true;
    try {
      await getAccessToken();
      isRefreshing = false;
    } catch (error) {
      isRefreshing = false;
      throw error; // Rethrow the error to propagate it further if token refresh fails
    }
  }

  // Set the Authorization header with the renewed token
  config.headers['X-Auth-Token'] = accessToken;
  // Add the httpsAgent configuration to the Axios request
  config.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  return config;
});

module.exports = axios;
