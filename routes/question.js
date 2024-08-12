const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post('/ask-question', async (req, res) => {
  const { question } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = await response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error('Error asking question:', error);
    res.status(500).json({ error: 'An error occurred while asking the question.' });
  }
});

module.exports = router;
