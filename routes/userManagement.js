const express = require('express');
const UserManagement = require('../models/UserManagement');
const router = express.Router();

// Create a new user
router.post('/usermanagement', async (req, res) => {
  const { name, role } = req.body;
  try {
    const newUser = new UserManagement({ name, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/usermanagement', async (req, res) => {
  try {
    const users = await UserManagement.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.put('/usermanagement/:id', async (req, res) => {
  const { name, role } = req.body;
  try {
    const updatedUser = await UserManagement.findByIdAndUpdate(
      req.params.id,
      { name, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/usermanagement/:id', async (req, res) => {
  try {
    const deletedUser = await UserManagement.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
