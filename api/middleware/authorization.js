const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const auth = (req, res, next) => {
  const token = req.body.token;
  console.log(`[auth middleware]token recieved:${token}`);
  if(!token) {
    console.log(`[auth middleware]error Unauthorized`);
    res.json({ error: 'Unauthorized Access: Client Not Logged In!'});
  }
  else {
    const secret = process.env.SECRET_KEY;
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        console.log(`[auth middleware]error invalid`);
        res.json({ error: 'Unauthorized Access: Invalid Token!'});
      }
      req.user = decoded.user;
      console.log(req.user)
      console.log(`[auth middleware]valid token, going to route`);
      next();
    })
  }
}

module.exports = auth;
