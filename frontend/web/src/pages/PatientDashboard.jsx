import React from 'react';
import VitalCard from '../components/VitalCard';
import RiskStatus from '../components/RiskStatus';
import ECGPrompt from '../components/ECGPrompt';

const PatientDashboard = () => {
  const data = {
    hr: 78,
    spo2: 97,
    fall: false,
    risk: "HIGH"
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Patient Dashboard</h1>
      
      <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
        <VitalCard title="Heart Rate" value={data.hr} unit="BPM" />
        <VitalCard title="SpO2" value={data.spo2} unit="%" />
        <VitalCard title="Fall Status" value={data.fall ? 'DETECTED' : 'NORMAL'} unit="" />
        <RiskStatus risk={data.risk} />
      </div>
      
      <ECGPrompt risk={data.risk} />
    </div>
  );
};
export default PatientDashboard;

