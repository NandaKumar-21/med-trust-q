import React from 'react';

const ECGPrompt = ({ risk }) => {
  if (risk !== "HIGH") return null;

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fff3cd', 
      border: '1px solid #ffeaa7', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>⚠️ High Risk Alert</h3>
      <p style={{ color: '#856404', margin: '0 0 15px 0' }}>Please perform a 1-minute ECG check</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => console.log('ECG check started')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Start ECG Check
        </button>
        <button 
          onClick={() => console.log('ECG check postponed')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#95a5a6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default ECGPrompt;