import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import DummyCard from '../components/DummyCard';
import { mockUsers } from '../data/mockData';

const InsuranceDashboard = () => {
  const insurance = mockUsers.insurance;

  return (
    <div className="dashboard">
      <Navbar role="insurance" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">Welcome, {insurance.name}!</h1>
        <p className="dashboard-subtitle">Insurance Management Dashboard</p>
      </motion.div>

      <h2 style={{ color: '#16a34a', marginBottom: '15px' }}>Covered Patients</h2>
      <div className="grid grid-2">
        {insurance.coveredPatients.map((patient, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DummyCard title={patient}>
              <p>Policy: Premium Health</p>
              <p>Coverage: $50,000</p>
              <p>Status: Active</p>
            </DummyCard>
          </motion.div>
        ))}
      </div>

      <h2 style={{ color: '#16a34a', marginTop: '30px', marginBottom: '15px' }}>Linked Hospitals</h2>
      <div className="grid grid-2">
        {insurance.linkedHospitals.map((hospital, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DummyCard title={hospital}>
              <p>Partnership: Active</p>
              <p>Network: In-Network</p>
            </DummyCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceDashboard;
