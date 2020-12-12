const sql = require("./db.js");

// constructor
const Bike = function (bike) {
  this.NickName = bike.NickName;
  this.Year = bike.Year;
  this.Make = bike.Make;
  this.Model = bike.Model;
};

Bike.create = (newBike, result) => {
  sql.query("INSERT INTO bike_info SET ?", newBike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created bike: ", { id: res.insertId, ...newBike });
    result(null, { id: res.insertId, ...newBike });
  });
};

Bike.findById = (bikeId, result) => {
  sql.query(`SELECT * FROM bike_info WHERE id = ${bikeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bike: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Bike with the id
    result({ kind: "not_found" }, null);
  });
};

Bike.getAll = (result) => {
  sql.query("SELECT * FROM bike_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bikes: ", res);
    result(null, res);
  });
};

Bike.updateById = (id, bike, result) => {
  sql.query(
    "UPDATE bike_info SET NickName = ?, Year = ?, Make = ?, Model = ? WHERE id = ?",
    [bike.NickName, bike.Year, bike.Make, bike.Model, bike.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Bike with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bike: ", { id: id, ...bike });
      result(null, { id: id, ...bike });
    }
  );
};

Bike.remove = (id, result) => {
  sql.query("DELETE FROM bike_info WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bike with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bike with id: ", id);
    result(null, res);
  });
};

Bike.removeAll = (result) => {
  sql.query("DELETE FROM bike_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bikes`);
    result(null, res);
  });
};

module.exports = Bike;
