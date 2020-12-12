const sql = require("./db.js");

// constructor
const Rider = function (rider) {
  this.FirstName = rider.FirstName;
  this.LastName = rider.LastName;
  this.IBA_Num = rider.IBA_Num;
};

Rider.create = (newRider, result) => {
  sql.query("INSERT INTO rider_info SET ?", newRider, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rider: ", { id: res.insertId, ...newRider });
    result(null, { id: res.insertId, ...newRider });
  });
};

Rider.findById = (riderId, result) => {
  sql.query(`SELECT * FROM rider_info WHERE id = ${riderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rider: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rider with the id
    result({ kind: "not_found" }, null);
  });
};

Rider.getAll = (result) => {
  sql.query("SELECT * FROM rider_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("riders: ", res);
    result(null, res);
  });
};

Rider.updateById = (id, rider, result) => {
  sql.query(
    "UPDATE rider_info SET FirstName = ?, LastName = ?, IBA_Num = ? WHERE id = ?",
    [rider.FirstName, rider.LastName, rider.IBA_Num, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Rider with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated rider: ", { id: id, ...rider });
      result(null, { id: id, ...rider });
    }
  );
};

Rider.remove = (id, result) => {
  sql.query("DELETE FROM rider_info WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Rider with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted rider with id: ", id);
    result(null, res);
  });
};

Rider.removeAll = (result) => {
  sql.query("DELETE FROM rider_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} riders`);
    result(null, res);
  });
};

module.exports = Rider;
