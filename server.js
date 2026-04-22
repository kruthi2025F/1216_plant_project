const express = require('express');
const cors = require('cors');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔋 stored plant data
let plantData = {
  moisture: 0,
  lastWatered: null
};

// 🔌 Arduino connection (CHANGE COM PORT)
const port = new SerialPort({
  path: "COM3",   // <-- change this in Arduino IDE Tools → Port
  baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (line) => {
  try {
    plantData = JSON.parse(line);
    console.log("Arduino:", plantData);
  } catch (err) {
    console.log("Bad data:", line);
  }
});

// 🌐 API endpoint for website
app.get('/data', (req, res) => {
  res.json(plantData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});