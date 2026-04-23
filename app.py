from flask import Flask, jsonify
import serial
import serial.tools.list_ports
import threading
import time
import os

app = Flask(__name__)

# --- Config ---
PORT = 'COM4'       # Change to match Arduino IDE > Tools > Port
BAUD = 9600

# --- State ---
latest_value = None
ser = None

def connect_serial():
    global ser, latest_value
    while True:
        try:
            ser = serial.Serial(PORT, BAUD, timeout=2)
            print(f"Connected to {PORT}")
            time.sleep(2)
            while True:
                line = ser.readline().decode('utf-8', errors='ignore').strip()  # blocks until data
                if line:
                    print(f"Raw line: '{line}'")
                    if line.isdigit():
                        latest_value = int(line)
                        print(f"Value updated: {latest_value}")
        except serial.SerialException as e:
            print(f"Serial error: {e} — retrying in 3s...")
            time.sleep(3)
        except Exception as e:
            print(f"Unexpected error: {e}")
            time.sleep(3)

# Read serial in background thread so Flask stays responsive
thread = threading.Thread(target=connect_serial, daemon=True)
thread.start()


@app.route("/data")
def data():
    return jsonify({
        "sensor": latest_value,
        "connected": latest_value is not None   # ← change this line
    })


@app.route("/")
def home():
    dir = os.path.dirname(os.path.abspath(__file__))
    return open(os.path.join(dir, "index.html"), encoding="utf-8").read()

if __name__ == "__main__":
    app.run(debug=False)  # debug=False avoids double-spawning the serial thread