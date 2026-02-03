#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
Adafruit_MPU6050 mpu;
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
  if (!mpu.begin()) {
  Serial.println("MPU6050 not found!");
  while (1);
}
Serial.println("MPU6050 initialized");

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
sensors_event_t a, g, temp;
mpu.getEvent(&a, &g, &temp);

// Calculate acceleration magnitude
float accMag = sqrt(
  a.acceleration.x * a.acceleration.x +
  a.acceleration.y * a.acceleration.y +
  a.acceleration.z * a.acceleration.z
);

if (accMag > 25.0) {   // simple fall threshold
  Serial.println("⚠️ FALL DETECTED");
} else {
  Serial.println("Motion: NORMAL");
}


delay(20);
}