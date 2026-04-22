int sensor; 
const int delayTime = 1000;

// pin number for turning the sensor it on and off
const int powerPin = 8;


void setup() {
  Serial.begin(9600);
  pinMode(powerPin, OUTPUT);

}

void loop() {
  digitalWrite(powerPin, HIGH);
  delay(100);
  sensor = analogRead(A0);
  digitalWrite(powerPin, LOW);
  Serial.println(sensor);
  delay(delayTime);

}
