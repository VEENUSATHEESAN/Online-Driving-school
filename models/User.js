const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  userImage: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  bio: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
