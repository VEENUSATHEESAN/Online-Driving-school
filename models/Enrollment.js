const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
