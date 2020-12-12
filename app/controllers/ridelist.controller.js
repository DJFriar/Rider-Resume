const Ridelist = require("../models/ridelist.model.js");

// Create and Save a new Ridelist
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Ridelist
  const ridelist = new Ridelist({
    Name: req.body.Name,
    MinLength: req.body.MinLength,
    MaxTime: req.body.MaxTime,
    IBA_URL: req.body.IBA_URL,
  });

  // Save Ridelist in the database
  Ridelist.create(ridelist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ridelist.",
      });
    else res.send(data);
  });
};

// Display to browser all Ridelists from the database.
exports.view = (req, res) => {
  Ridelist.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ridelists.",
      });
    else res.render("ridelist", { data: data });
  });
};

// Retrieve all Ridelists from the database.
exports.findAll = (req, res) => {
  Ridelist.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ridelists.",
      });
    else res.send(data);
  });
};

// Find a single Ridelist with a RidelistId
exports.findOne = (req, res) => {
  Ridelist.findById(req.params.ridelistId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ridelist with id ${req.params.ridelistId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ridelist with id " + req.params.ridelistId,
        });
      }
    } else res.send(data);
  });
};

// Update a Ridelist identified by the ridelistId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(
    req.params.ridelistId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ridelist with id ${req.params.ridelistId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Ridelist with id " + req.params.ridelistId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Ridelist with the specified ridelistId in the request
exports.delete = (req, res) => {
  Ridelist.remove(req.params.ridelistId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ridelist with id ${req.params.ridelistId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ridelist with id " + req.params.ridelistId,
        });
      }
    } else res.send({ message: `Ridelist was deleted successfully!` });
  });
};

// Delete all Ridelists from the database.
exports.deleteAll = (req, res) => {
  Ridelist.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ridelists.",
      });
    else res.send({ message: `All Ridelists were deleted successfully!` });
  });
};
