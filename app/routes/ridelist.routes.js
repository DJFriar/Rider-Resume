module.exports = (app) => {
  const ridelist = require("../controllers/ridelist.controller.js");

  // Create a new Rider
  app.post("/api/ridelist", ridelist.create);

  // Retrieve all Ridelist
  app.get("/api/ridelist", ridelist.findAll);

  // Retrieve a single Rider with ridelistId
  app.get("/api/ridelist/:ridelistId", ridelist.findOne);

  // Update a Rider with ridelistId
  app.put("/api/ridelist/:ridelistId", ridelist.update);

  // Delete a Rider with ridelistId
  app.delete("/api/ridelist/:ridelistId", ridelist.delete);

  // Create a new Rider
  app.delete("/api/ridelist", ridelist.deleteAll);

  // Display Ridelist on HTML page
  app.get("/ridelist", ridelist.view);
};
