const express = require('express');
const cors = require('cors');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🌱 Shared plant data (used by website)
let plantData = {
  moisture: 0,
  lastWatered: null
};

// 🔌 CONNECT TO ARDUINO (CHANGE COM PORT IF NEEDED)
const port = new SerialPort({
  path: "COM3",   // <-- change this to your Arduino port
  baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// 📡 Read Arduino data
parser.on('data', (line) => {
  try {
    const raw = parseInt(line.trim());

    // ignore bad readings
    if (isNaN(raw)) return;

    // convert raw (0–1023) → percentage (0–100)
    const moisture = Math.max(
      0,
      Math.min(100, Math.round((1023 - raw) / 10.23))
    );

    plantData.moisture = moisture;

    console.log("Moisture:", moisture + "%");

  } catch (err) {
    console.log("Bad data:", line);
  }
});

// 🌐 endpoint for website
app.get('/data', (req, res) => {
  res.json(plantData);
});

// 🚀 start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});