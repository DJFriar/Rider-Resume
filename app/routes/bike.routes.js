module.exports = (app) => {
  const bikes = require("../controllers/bike.controller.js");

  // Create a new Bike
  app.post("/api/bikes", bikes.create);

  // Retrieve all Bikes
  app.get("/api/bikes", bikes.findAll);

  // Retrieve a single Bike with bikeId
  app.get("/api/bikes/:bikeId", bikes.findOne);

  // Update a Bike with bikeId
  app.put("/api/bikes/:bikeId", bikes.update);

  // Delete a Bike with bikeId
  app.delete("/api/bikes/:bikeId", bikes.delete);

  // Delete all Bikes
  app.delete("/api/bikes", bikes.deleteAll);

  // Display Bikes on HTML page
  app.get("/bikes", bikes.view);
};
