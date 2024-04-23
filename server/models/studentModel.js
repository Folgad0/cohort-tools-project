const { Schema, model } = require('mongoose');

// Define the Student Schema
const studentSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Cohort"
  },
  projects: [String]
});

// Create the Student model
const Student = model("Student", studentSchema);

module.exports = Student;
