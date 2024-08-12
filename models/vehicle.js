const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  availability: { type: String, required: true, default: 'Available' },
  maintenanceHistory: [
    {
      date: { type: String },
      description: { type: String },
      id: { type: Number }
    }
  ]
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
