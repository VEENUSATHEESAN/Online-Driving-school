const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/openai', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response.data.error.code === 'insufficient_quota') {
        return res.status(403).json({ error: 'You have exceeded your current quota. Please check your plan and billing details.' });
      }
      return res.status(error.response.status).json({ error: error.response.data.error.message });
    } else if (error.request) {
      return res.status(500).json({ error: 'No response received from OpenAI' });
    } else {
      return res.status(500).json({ error: 'Error setting up the request to OpenAI' });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
