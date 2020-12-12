const sql = require("./db.js");

// constructor
const Ridelist = function (ridelist) {
  this.Name = ridelist.Name;
  this.MinLength = ridelist.MinLength;
  this.MaxTime = ridelist.MaxTime;
  this.IBA_URL = ridelist.IBA_URL;
};

Ridelist.create = (newRidelist, result) => {
  sql.query("INSERT INTO master_ride_list SET ?", newRidelist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ridelist: ", { id: res.insertId, ...newRidelist });
    result(null, { id: res.insertId, ...newRidelist });
  });
};

Ridelist.findById = (ridelistId, result) => {
  sql.query(
    `SELECT * FROM master_ride_list WHERE id = ${ridelistId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found ridelist: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Ridelist with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Ridelist.getAll = (result) => {
  sql.query("SELECT * FROM master_ride_list", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ridelists: ", res);
    result(null, res);
  });
};

Ridelist.updateById = (id, ridelist, result) => {
  sql.query(
    "UPDATE master_ride_list SET Name = ?, MinLength = ?, MaxTime = ?, IBA_URL = ? WHERE id = ?",
    [ridelist.Name, ridelist.MinLength, ridelist.MaxTime, ridelist.IBA_URL, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ridelist with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ridelist: ", { id: id, ...ridelist });
      result(null, { id: id, ...ridelist });
    }
  );
};

Ridelist.remove = (id, result) => {
  sql.query("DELETE FROM master_ride_list WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ridelist with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ridelist with id: ", id);
    result(null, res);
  });
};

Ridelist.removeAll = (result) => {
  sql.query("DELETE FROM master_ride_list", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ridelists`);
    result(null, res);
  });
};

module.exports = Ridelist;
