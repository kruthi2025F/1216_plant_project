int sensor; 
const int delayTime = 1000;


void setup() {
  Serial.begin(9600);

}

void loop() {
  sensor = analogRead(A0);
  Serial.println(sensor);
  delay(delayTime);

}
