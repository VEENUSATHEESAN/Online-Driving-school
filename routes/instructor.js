const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Get all instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific instructor
router.get('/instructors/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new instructor
router.post('/instructors', async (req, res) => {
  const instructor = new Instructor({
    name: req.body.name,
    email: req.body.email,
    availability: req.body.availability,
    assignedLessons: req.body.assignedLessons
  });

  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an instructor
router.put('/instructors/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });

    if (req.body.name) instructor.name = req.body.name;
    if (req.body.email) instructor.email = req.body.email;
    if (req.body.availability) instructor.availability = req.body.availability;
    if (req.body.assignedLessons) instructor.assignedLessons = req.body.assignedLessons;

    const updatedInstructor = await instructor.save();
    res.json(updatedInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an instructor
router.delete('/instructors/:id', async (req, res) => {
  try {
    console.log(`Received request to delete instructor with ID: ${req.params.id}`);
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      console.log(`Instructor not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Instructor not found' });
    }

    await Instructor.deleteOne({ _id: req.params.id });
    console.log(`Instructor with ID: ${req.params.id} deleted successfully`);
    res.json({ message: 'Instructor deleted' });
  } catch (err) {
    console.error(`Error deleting instructor with ID: ${req.params.id}`, err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
