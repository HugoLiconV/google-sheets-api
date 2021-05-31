const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { authDomain, authAudience } = require("../../config");

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authDomain}/.well-known/jwks.json`
  }),

  audience: authAudience,
  issuer: `https://${authDomain}/`,
  algorithms: ["RS256"]
});
