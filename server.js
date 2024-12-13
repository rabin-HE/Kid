const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'score_data.json');

app.use(express.json());

// Read current data
app.get('/data', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

// Update data
app.post('/update', (req, res) => {
  const { currentStarCount, logs } = req.body;

  // Ensure logs do not exceed 100 entries
  const updatedLogs = logs.slice(0, 100);

  const newData = { currentStarCount, logs: updatedLogs };

  fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
