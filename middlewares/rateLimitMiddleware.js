// rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: { success: false, error: "Too many requests, please try again later" }
});
