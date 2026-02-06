import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import DummyCard from '../components/DummyCard';
import { mockUsers } from '../data/mockData';

const DoctorDashboard = () => {
  const doctor = mockUsers.doctor;

  return (
    <div className="dashboard">
      <Navbar role="doctor" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">Welcome, {doctor.name}!</h1>
        <p className="dashboard-subtitle">Manage your patients</p>
      </motion.div>

      <DummyCard title="Linked Hospital">
        <p><strong>{doctor.hospital}</strong></p>
        <p>Department: {doctor.specialization}</p>
      </DummyCard>

      <h2 style={{ color: '#16a34a', marginTop: '30px', marginBottom: '15px' }}>Assigned Patients</h2>
      <div className="grid grid-2">
        {doctor.patients.map((patient, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DummyCard title={patient}>
              <p>Status: Stable</p>
              <p>Last Visit: 2024-01-{15 + index}</p>
            </DummyCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
