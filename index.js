// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const express = require("express");
const { resolve } = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3010;

app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.post("/students/above-threshold", (req, res) => {
  const threshold = req.body.threshold;
  if (typeof threshold !== "number") {
    return res.status(400).json({ error: "Invalid threshold value" });
  }

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    const students = JSON.parse(data);
    const filteredStudents = students.filter(
      (student) => student.total > threshold
    );
    const response = {
      count: filteredStudents.length,
      students: filteredStudents.map((student) => ({
        name: student.name,
        total: student.total,
      })),
    };

    res.json(response);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
