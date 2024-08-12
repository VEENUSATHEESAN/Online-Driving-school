const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  syllabus: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);
