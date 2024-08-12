const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
});

// Get user details by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user details by ID
router.put('/users/:id', async (req, res) => {
  const { username, firstname, lastname, email, phoneNo, gender, bio, userImage } = req.body;
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phoneNo = phoneNo;
    user.gender = gender;
    user.bio = bio;
    user.userImage = userImage;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error updating user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', upload.single('userImage'), async (req, res) => {
  const { username, firstname, lastname, email, phoneNo, password, gender, bio } = req.body;
  const userImage = req.file ? req.file.path : null;

  console.log('Request body:', req.body);
  console.log('User image path:', userImage);

  if (!userImage) {
    return res.status(400).json({ message: 'User image is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstname,
      lastname,
      userImage,
      email,
      phoneNo,
      password: hashedPassword,
      gender,
      bio,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
