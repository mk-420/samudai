const db = require("../models");
const Dashboard = db.dashboard;
const Op = db.Op;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Dashboard
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  // Create a Dashboard
  const dashboard = {
    id: uuidv4(),
    name: req.body.name,
    published: req.body.comment ? req.body.comment : ''
  };

  // Save Dashboard in database
  Dashboard.create(dashboard)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Dashboard."
      });
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  

  Dashboard.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving dashboard entity."
      });
    });
};



