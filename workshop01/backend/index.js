require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 8080;
const REPO = process.env.REPO;
const IMAGE_FILENAME = process.env.IMAGE_FILENAME;
const MESSAGES = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'));

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

app.get('/repo', (req, res) => {
      res.json({repo: `${REPO}`});
});

app.get('/image', (req, res) => {
      res.json({filename: `${IMAGE_FILENAME}`});
});

app.get('/messages', (req, res) => {
  res.json({ messages: MESSAGES });
});

app.get('/message', (req, res) => {
  const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  res.json({ message: randomMessage });
});

app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
});
