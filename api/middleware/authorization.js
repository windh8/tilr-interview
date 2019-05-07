const jwt = require('jsonwebtoken');
const express = require('express');
//const app = express();

// Validates whether or not incoming request to route is from actual verified
// user (JsonWebToken)
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if(!req.headers.authorization) {
    res.json({error: 'Unauthorized Access: Token Not Sent In Request Header (Authorization)!'})
  }
  else {
    const bearer = req.headers.authorization.split(' ');
    const token = bearer[1];

    if(!token) {
      res.json({ error: 'Unauthorized Access: Client Not Logged In!'});
    }
    else {
      const secret = process.env.SECRET_KEY;
      jwt.verify(token, secret, (err, decoded) => {
        if(err) {
          res.json({ error: 'Unauthorized Access: Invalid Token!'});
        }
        req.user = decoded.user;
        next();
      })
    }
  }
}

module.exports = auth;
