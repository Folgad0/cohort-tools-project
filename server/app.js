const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");

// Import your models

//const Cohort = require("./models/cohortModel");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

 app.use(cors({
   origin: "http://localhost:5175"         // acts like a security guard that only allows access to the port 5175 . this is the localhost of my frotnend/client side.
 }));

// app.use(cors());  // allows access to all ports aka no bodyguard

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


// const newCohort = new Cohort({
//   cohortSlug: "ft-wd-paris-2023-07-03",
//   cohortName: "FT WD PARIS 2023 07",
//   program: "Web Dev",
//   campus: "Paris",
//   startDate: new Date("2023-07-03"),
//   endDate: new Date("2023-09-08"),
//   programManager: "Sally Daher",
//   leadTeacher: "Rui Folgado",
//   totalHours: 360
// });

// newCohort.save()
//   .then(savedCohort => {
//     console.log("New Cohort saved:", savedCohort);
//   })
//   .catch(error => {
//     console.error("Error saving new Cohort:", error);
//   });


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
  
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});