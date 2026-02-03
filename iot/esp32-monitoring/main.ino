#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

MAX30105 particleSensor;

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 + MAX30102 starting...");

  Wire.begin(21, 22); // SDA, SCL

  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("MAX30102 not found. Check wiring.");
    while (1);
  }

  // Sensor configuration
  particleSensor.setup(); 
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0);

  Serial.println("Place your finger on the sensor");
}

void loop() {
long irValue = particleSensor.getIR();
long redValue = particleSensor.getRed();

if (irValue > 50000) {  // finger detected
  if (checkForBeat(irValue)) {
    static uint32_t lastBeat = 0;
    uint32_t now = millis();
    uint32_t delta = now - lastBeat;
    lastBeat = now;

    float bpm = 60 / (delta / 1000.0);

    // Simple SpO2 estimation (demo-safe)
    float spo2 = 110 - (25 * (redValue / (float)irValue));

    if (bpm > 40 && bpm < 200) {
      Serial.print("HR: ");
      Serial.print(bpm);
      Serial.print(" bpm | SpO2: ");
      Serial.print(spo2);
      Serial.println(" %");
    }
  }
} else {
  Serial.println("No finger detected");
}

delay(20);
}