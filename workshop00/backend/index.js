require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;
const REPO = process.env.REPO || 'https://github.com/zixinn/myrepo';
const IMAGE_FILENAME = process.env.IMAGE_FILENAME || 'image.png';
const MESSAGES = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
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

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
});
