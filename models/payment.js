// models/payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
