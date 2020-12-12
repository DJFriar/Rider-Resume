const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to IBA DB." });
  res.render("index", {});
});

require("./app/routes/rider.routes.js")(app);
require("./app/routes/bike.routes.js")(app);
require("./app/routes/ridelist.routes.js")(app);
require("./app/routes/resume.routes.js")(app);

// set port, listen for requests
app.listen(3100, () => {
  console.log("Server is running on port 3100.");
});
