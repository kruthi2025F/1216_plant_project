int sensorReading; 
const int delayTIme = 1000;

// pin number for turning the sensor it on and off
const int powerPin = 5;


void setup() {
  Serial.begin(9600);

}

void loop() {
  digitalWrite(powerpin, HIGH);
  sensor = analogRead(A0);
  digitalWrite(powerpin, LOW);
  Serial.println(sensor);
  delay(delayTime);

}
