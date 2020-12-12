const Rider = require("../models/rider.model.js");

// Create and Save a new Rider
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Rider
  const rider = new Rider({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    IBA_Num: req.body.IBA_Num,
  });

  // Save Rider in the database
  Rider.create(rider, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Rider.",
      });
    else res.send(data);
  });
};

// Display to browser all Riders from the database.
exports.view = (req, res) => {
  Rider.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving riders.",
      });
    else res.render("riders", { data: data });
  });
};

// Retrieve all Riders from the database.
exports.findAll = (req, res) => {
  Rider.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving riders.",
      });
    else res.send(data);
  });
};

// Find a single Rider with a RiderId
exports.findOne = (req, res) => {
  Rider.findById(req.params.riderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rider with id ${req.params.riderId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rider with id " + req.params.riderId,
        });
      }
    } else res.send(data);
  });
};

// Update a Rider identified by the riderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(
    req.params.riderId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rider with id ${req.params.riderId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Rider with id " + req.params.riderId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Rider with the specified riderId in the request
exports.delete = (req, res) => {
  Rider.remove(req.params.riderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rider with id ${req.params.riderId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Rider with id " + req.params.riderId,
        });
      }
    } else res.send({ message: `Rider was deleted successfully!` });
  });
};

// Delete all Riders from the database.
exports.deleteAll = (req, res) => {
  Rider.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all riders.",
      });
    else res.send({ message: `All Riders were deleted successfully!` });
  });
};
