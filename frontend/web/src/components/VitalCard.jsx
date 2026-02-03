import React from 'react';

const VitalCard = ({ title, value, unit }) => {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>{title}</h3>
      <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold' }}>
        {value} {unit}
      </p>
    </div>
  );
};

export default VitalCard;