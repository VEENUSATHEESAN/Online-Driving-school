const mongoose = require('mongoose');

const userManagementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('UserManagement', userManagementSchema, 'usermanagement');
