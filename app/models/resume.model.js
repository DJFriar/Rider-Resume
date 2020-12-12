const sql = require("./db.js");

// constructor
const Resume = function (resume) {
  this.ride_id = resume.ride_id;
  this.EndDateTime = resume.EndDateTime;
  this.GPSMiles = resume.GPSMiles;
  this.bike_id = resume.bike_id;
};

Resume.create = (newResume, result) => {
  sql.query("INSERT INTO rider_resume SET ?", newResume, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created resume: ", { id: res.insertId, ...newResume });
    result(null, { id: res.insertId, ...newResume });
  });
};

Resume.findById = (resumeId, result) => {
  sql.query(`SELECT * FROM rider_resume WHERE id = ${resumeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found resume: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Resume with the id
    result({ kind: "not_found" }, null);
  });
};

Resume.getAll = (result) => {
  sql.query(
    "SELECT * FROM rider_resume rr INNER JOIN master_ride_list mrl ON rr.ride_id = mrl.id INNER JOIN bike_info bike ON rr.bike_id = bike.id",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("resumes: ", res);
      result(null, res);
    }
  );
};

Resume.updateById = (id, resume, result) => {
  sql.query(
    "UPDATE rider_resume SET ride_id = ?, EndDateTime = ?, GPSMiles = ?, bike_id = ? WHERE id = ?",
    [resume.ride_id, resume.EndDateTime, resume.GPSMiles, resume.bike_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Resume with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated resume: ", { id: id, ...resume });
      result(null, { id: id, ...resume });
    }
  );
};

Resume.remove = (id, result) => {
  sql.query("DELETE FROM rider_resume WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Resume with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted resume with id: ", id);
    result(null, res);
  });
};

Resume.removeAll = (result) => {
  sql.query("DELETE FROM rider_resume", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} resumes`);
    result(null, res);
  });
};

module.exports = Resume;
