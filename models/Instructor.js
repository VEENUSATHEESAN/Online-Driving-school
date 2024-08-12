const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  assignedLessons: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Instructor', instructorSchema);
