// Water Pump Test - Basic On/Off Circuit
// Connect pump relay/MOSFET to pin 7
// Connect status LED to pin 13 (built-in)

const int PUMP_PIN = 7;    // Relay or MOSFET gate pin
const int LED_PIN  = 13;   // Built-in LED for visual feedback

void setup() {
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(LED_PIN,  OUTPUT);
  Serial.begin(9600);
  Serial.println("Water Pump Test Ready");
}

void loop() {
  // --- PUMP ON ---
  digitalWrite(PUMP_PIN, HIGH);
  digitalWrite(LED_PIN,  HIGH);
  Serial.println("PUMP ON  - Water flowing...");
  delay(3000);  // Run for 3 seconds

  // --- PUMP OFF ---
  digitalWrite(PUMP_PIN, LOW);
  digitalWrite(LED_PIN,  LOW);
  Serial.println("PUMP OFF - Pausing...");
  delay(2000);  // Pause for 2 seconds
}