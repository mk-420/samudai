const express = require("express");
const config = require("./app/config/config.js");

const app = express();



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
// const db = require("./app/models");

// db.sequelize.sync().then(() => {
//    // to sync with new db in start
// });

// blank route
app.get("/", (req, res) => {
  res.json({ message: "Samudai backend Task" });
});

// api routes

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/dashboard.routes")(app);


app.use((req,res)=>{
  console.log("Request to server recieved.");
  res.status(404).send('Not Found')
})

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


