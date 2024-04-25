const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
// Import your models here:
const Cohort = require("./models/cohortModel");
const Student = require("./models/studentModel");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
 app.use(cors({
   origin: "http://localhost:5175" // acts like a security guard that only allows access to the port 5175 . this is the localhost of my frotnend/client side.
 }));
// app.use(cors());  -> this allows access to all ports aka no bodyguard

//mongoose setup 
const databaseURL = 'mongodb://localhost/cohort-tools-api';
mongoose
.connect(databaseURL)
.then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to MongoDB", err));

// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
  
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

//cohort routes
//POST /api/cohorts - Creates a new cohort
app.post ("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
  .then ((newCohort) => {
    res.json(newCohort);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

//GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json({ message: 'All cohorts', data: cohorts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  }
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findById(cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json({ message: 'Cohort found', data: cohort });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve cohort" });
  }
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
app.put('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json({ message: 'Cohort updated', data: cohort });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update cohort" });
  }
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
app.delete('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findByIdAndDelete(cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json({ message: 'Cohort deleted', data: cohort });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to delete cohort" });
  }
});


//Student routes
// POST /api/students - Creates a new student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create student" });
  }
});

//GET /api/students - Retrieves all of the students in the database collection
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ message: 'All students', data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students of a specific cohort
app.get('/api/students/cohort/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const students = await Student.find({ cohort: cohortId });
    res.json({ message: 'All students of the cohort', data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve students of the cohort" });
  }
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: 'Student found', data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve student" });
  }
});

//PUT /api/students/:studentId - Updates a specific student by id
app.put('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: 'Student updated', data: student });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update student" });
  }
});

//DELETE /api/students/:studentId - Deletes a specific student by id
app.delete('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: 'Student deleted', data: student });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to delete student" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});