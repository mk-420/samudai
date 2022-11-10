const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {

  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.auth.secret, (err, decoded) => {
    //if invalid token
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;

    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
   if(user.role==="admin")
   next();
   else res.status(403).send({message: "Unauthorized"})
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    console.log(user);
    if(user.role === "mod") {
      next();
      
    }
    else res.status(403).send({message: "Unauthorized"})
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    role=user.role
    if(role==='mod'||role=='admin')
    next();
    else res.status(403).send({message: "Unauthorized"})
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;
