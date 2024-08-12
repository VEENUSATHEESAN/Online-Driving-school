const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// POST endpoint to handle enrollment
router.post('/enroll', async (req, res) => {
  const { studentName, amount, courseTitle } = req.body;

  try {
    const newEnrollment = new Enrollment({
      studentName,
      amount,
      courseTitle
    });

    const savedEnrollment = await newEnrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
