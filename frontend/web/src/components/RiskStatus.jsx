import React from 'react';

const RiskStatus = ({ risk }) => {
  const getRiskConfig = () => {
    switch (risk) {
      case 'NORMAL':
        return { color: '#27ae60', text: 'All vitals within normal range' };
      case 'WARNING':
        return { color: '#f39c12', text: 'Monitor vitals closely' };
      case 'HIGH':
        return { color: '#e74c3c', text: 'Immediate attention required' };
      default:
        return { color: '#95a5a6', text: 'Status unknown' };
    }
  };

  const { color, text } = getRiskConfig();

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Risk Level</h3>
      <p style={{ fontSize: '24px', margin: '0 0 5px 0', fontWeight: 'bold', color }}>
        {risk}
      </p>
      <p style={{ fontSize: '14px', margin: '0', color: '#666' }}>{text}</p>
    </div>
  );
};

export default RiskStatus;