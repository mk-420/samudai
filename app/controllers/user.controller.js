const db = require("../models");
const User = db.user;
const Op = db.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.accessModifier = (req, res) => {

User.update({role:req.body.role},{
  where: {email: req.body.email}
})
.then(num => {
  if (num == 1) {
    res.send({
      message: `Role of ${req.body.email} updated to ${req.body.role}`
    });
  } else {
    res.send({
      message: `Cannot update role${req.body.email}. Maybe user was not found or req.body is empty!`
    });
  }
})
.catch(err => {
  res.status(500).send({
    message: "Error updating user with email id=" + req.body.email
  });
});
  
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
