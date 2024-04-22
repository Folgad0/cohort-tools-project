const mongoose = require("mongoose");

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: {
    type: String,
    required: true
  },
  background: String,
  image: String,
  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort"
  },
  projects: [String]
  // Add other fields as needed
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
