const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const { v4: uuidv4 } = require('uuid');


exports.signUp = (req, res) => {
 
  // Save user to database (signup)
  User.create({
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    role: 'user',
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message +'hi'});
    });
};

//findall users
exports.findAll = (req, res) => {
  
 
  
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving users."
      });
    });
};

//signing in and returning token if authenticated 
exports.signIn=(req,res)=>{
  User.findOne({
    where:{
      email:req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      //password validation using bcrypt
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 3600 // 1 hour
      });
      
      res.status(200).send({
        id: user.id,
        name: user.name,
        accessToken: token
      });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}