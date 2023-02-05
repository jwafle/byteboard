require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const API_IDENTIFIER = process.env.API_IDENTIFIER;

const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function isTokenValid(token) {
  if (token) {
    const bearerToken = token.split(" ");

    const result = new Promise((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: API_IDENTIFIER,
          issuer: `https://${AUTH0_DOMAIN}/`,
          algorithms: ["RS256"]
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded });
          }
        }
      );
    });

    return result;
  }

  return { error: "No token provided" };
}

module.exports = {
    isTokenValid
};