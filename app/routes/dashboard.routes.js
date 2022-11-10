module.exports = app => {
    const dashboardController = require("../controllers/dashboard.controller.js");
  
    const router = require("express").Router();
  
    // Create a new dashboard
    router.post("/", dashboardController.create);
  
    // Retrieve all dashboards
    router.get("/", dashboardController.findAll);
  
  
    app.use("/api/dashboards", router);
  };
  