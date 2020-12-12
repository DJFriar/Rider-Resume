const Resume = require("../models/resume.model.js");

// Create and Save a new Resume
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Resume
  const resume = new Resume({
    ride_id: req.body.ride_id,
    EndDateTime: req.body.EndDateTime,
    GPSMiles: req.body.GPSMiles,
    bike_id: req.body.bike_id,
  });

  // Save Resume in the database
  Resume.create(resume, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resume.",
      });
    else res.send(data);
  });
};

// Display to browser all Resumes from the database.
exports.view = (req, res) => {
  Resume.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumes.",
      });
    else res.render("resume", { data: data });
  });
};

// Retrieve all Resumes from the database.
exports.findAll = (req, res) => {
  Resume.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumes.",
      });
    else res.send(data);
  });
};

// Find a single Resume with a ResumeId
exports.findOne = (req, res) => {
  Resume.findById(req.params.resumeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Resume with id ${req.params.resumeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Resume with id " + req.params.resumeId,
        });
      }
    } else res.send(data);
  });
};

// Update a Resume identified by the resumeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Resume.updateById(req.params.resumeId, new Resume(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Resume with id ${req.params.resumeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Resume with id " + req.params.resumeId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Resume with the specified resumeId in the request
exports.delete = (req, res) => {
  Resume.remove(req.params.resumeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Resume with id ${req.params.resumeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Resume with id " + req.params.resumeId,
        });
      }
    } else res.send({ message: `Resume was deleted successfully!` });
  });
};

// Delete all Resumes from the database.
exports.deleteAll = (req, res) => {
  Resume.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumes.",
      });
    else res.send({ message: `All Resumes were deleted successfully!` });
  });
};
