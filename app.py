from flask import Flask, jsonify
import serial

app = Flask(__name__)

arduino = serial.Serial('/dev/ttyUSB0', 9600)  # Windows: 'COM3'

latest_value = 0

@app.route("/data")
def data():
    global latest_value
    if arduino.in_waiting:
        try:
            latest_value = arduino.readline().decode().strip()
        except:
            pass
    return jsonify({"sensor": latest_value})

@app.route("/")
def home():
    return """
    <html>
    <body>
        <h1>Soil Sensor Value</h1>
        <div id="value">Loading...</div>

        <script>
        setInterval(async () => {
            let res = await fetch('/data');
            let data = await res.json();
            document.getElementById('value').innerText = data.sensor;
        }, 1000);
        </script>
    </body>
    </html>
    """

if __name__ == "__main__":
    app.run(debug=True)
    