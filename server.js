const express = require('express');
const app = express();
const PORT = 3000;

app.use(require('cors')());
app.use(express.json());

// In-memory data store (replace with DB later)
let plantData = {
  moisture: 0,
  lastWatered: null
};

// Endpoint Arduino will POST to
app.post('/update', (req, res) => {
  const { moisture, lastWatered } = req.body;
  plantData.moisture = moisture;
  plantData.lastWatered = lastWatered;
  res.send({ status: 'ok' });
});

// Endpoint website will GET from
app.get('/data', (req, res) => {
  res.json(plantData);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));