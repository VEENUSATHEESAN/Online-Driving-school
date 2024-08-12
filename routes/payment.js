const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Payment = mongoose.model('Payment', new mongoose.Schema({
  studentName: String,
  amount: Number,
  date: String,
  status: String,
}));

// Get all payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new payment
router.post('/payments', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a payment
router.put('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a payment
router.delete('/payments/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.send({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
