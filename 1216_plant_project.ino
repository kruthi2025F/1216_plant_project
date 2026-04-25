int sensor;
const int delayTime = 1000;
const int pumpPin = 7;
const int dryThreshold = 500;

void setup() {
  Serial.begin(9600);
  pinMode(pumpPin, OUTPUT);
  digitalWrite(pumpPin, LOW);
}

void loop() {
  sensor = analogRead(A0);
  Serial.println(sensor);

  if (sensor < dryThreshold) {
    digitalWrite(pumpPin, HIGH);
    delay(2000);
    digitalWrite(pumpPin, LOW);
    delay(5000);
  }

  delay(delayTime);
}
