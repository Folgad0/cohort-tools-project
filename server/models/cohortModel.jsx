const mongoose = require("mongoose");

// Define Schema for Cohort
const cohortSchema = new mongoose.Schema({
  cohortSlug: {
    type: String,
    required: true,
    unique: true
  },
  cohortName: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] // Allowed program values
  },
  format: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time"] // Allowed format values
  },
  campus: {
    type: String,
    required: true,
    enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"] // Allowed campus locations
  },
  startDate: {
    type: Date,
    default: Date.now // Set default to current date
  },
  endDate: {
    type: Date,
    required: true
  },
  inProgress: {
    type: Boolean,
    default: false
  },
  programManager: {
    type: String,
    required: true
  },
  leadTeacher: {
    type: String,
    required: true
  },
  totalHours: {
    type: Number,
    default: 360
  }
});

// Create Model (use the defined schema)
const Cohort = mongoose.model("Cohort", cohortSchema);

// Export the Model
module.exports = Cohort;


