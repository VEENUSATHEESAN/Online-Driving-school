const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

// Get all lessons
router.get('/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single lesson
router.get('/schedule/:id', async (req, res) => {
  try {
    const lesson = await Schedule.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a lesson
router.post('/schedule', async (req, res) => {
  const { title, date, time, instructor, type } = req.body;
  const newLesson = new Schedule({ title, date, time, instructor, type });
  
  try {
    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a lesson
router.put('/schedule/:id', async (req, res) => {
  try {
    const updatedLesson = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(updatedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a lesson
router.delete('/schedule/:id', async (req, res) => {
  try {
    const deletedLesson = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedLesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
