const Bike = require("../models/bike.model.js");

// Create and Save a new Bike
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Bike
  const bike = new Bike({
    NickName: req.body.NickName,
    Year: req.body.Year,
    Make: req.body.Make,
    Model: req.body.Model,
  });

  // Save Bike in the database
  Bike.create(bike, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bike.",
      });
    else res.send(data);
  });
};

// Display to browser all Bikes from the database.
exports.view = (req, res) => {
  Bike.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bikes.",
      });
    else res.render("bikes", { data: data });
  });
};

// Retrieve all Bikes from the database.
exports.findAll = (req, res) => {
  Bike.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bikes.",
      });
    else res.send(data);
  });
};

// Find a single Bike with a BikeId
exports.findOne = (req, res) => {
  Bike.findById(req.params.bikeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bike with id ${req.params.bikeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Bike with id " + req.params.bikeId,
        });
      }
    } else res.send(data);
  });
};

// Update a Bike identified by the bikeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(
    req.params.bikeId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Bike with id ${req.params.bikeId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Bike with id " + req.params.bikeId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Bike with the specified bikeId in the request
exports.delete = (req, res) => {
  Bike.remove(req.params.bikeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Bike with id ${req.params.bikeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Bike with id " + req.params.bikeId,
        });
      }
    } else res.send({ message: `Bike was deleted successfully!` });
  });
};

// Delete all Bikes from the database.
exports.deleteAll = (req, res) => {
  Bike.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all bikes.",
      });
    else res.send({ message: `All Bikes were deleted successfully!` });
  });
};
