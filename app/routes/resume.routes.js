module.exports = (app) => {
  const resume = require("../controllers/resume.controller.js");

  // Create a new Resume
  app.post("/api/resume", resume.create);

  // Retrieve all Resume
  app.get("/api/resume", resume.findAll);

  // Retrieve a single Resume with resumeId
  app.get("/api/resume/:resumeId", resume.findOne);

  // Update a Resume with resumeId
  app.put("/api/resume/:resumeId", resume.update);

  // Delete a Resume with resumeId
  app.delete("/api/resume/:resumeId", resume.delete);

  // Create a new Resume
  app.delete("/api/resume", resume.deleteAll);

  // Display Resume on HTML page
  app.get("/resume", resume.view);
};
