const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course');

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single course
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    duration: req.body.duration,
    syllabus: req.body.syllabus
  });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a course
router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.title = req.body.title || course.title;
    course.duration = req.body.duration || course.duration;
    course.syllabus = req.body.syllabus || course.syllabus;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }
  
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Course.deleteOne({ _id: courseId });  // Corrected line
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error(`Error deleting course with ID ${courseId}:`, err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
