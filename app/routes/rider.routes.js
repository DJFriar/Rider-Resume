module.exports = (app) => {
  const riders = require("../controllers/rider.controller.js");

  // Create a new Rider
  app.post("/api/riders", riders.create);

  // Retrieve all Riders
  app.get("/api/riders", riders.findAll);

  // Retrieve a single Rider with riderId
  app.get("/api/riders/:riderId", riders.findOne);

  // Update a Rider with riderId
  app.put("/api/riders/:riderId", riders.update);

  // Delete a Rider with riderId
  app.delete("/api/riders/:riderId", riders.delete);

  // Create a new Rider
  app.delete("/api/riders", riders.deleteAll);

  // Display Riders on HTML page
  app.get("/riders", riders.view);
};
