import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import DummyCard from '../components/DummyCard';
import { mockUsers } from '../data/mockData';

const HospitalDashboard = () => {
  const hospital = mockUsers.hospital;

  return (
    <div className="dashboard">
      <Navbar role="hospital" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">Welcome, {hospital.name}!</h1>
        <p className="dashboard-subtitle">Hospital Management Dashboard</p>
      </motion.div>

      <h2 style={{ color: '#16a34a', marginBottom: '15px' }}>Doctors</h2>
      <div className="grid grid-3">
        {hospital.doctors.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DummyCard title={doctor}>
              <p>Department: Cardiology</p>
              <p>Status: Active</p>
            </DummyCard>
          </motion.div>
        ))}
      </div>

      <h2 style={{ color: '#16a34a', marginTop: '30px', marginBottom: '15px' }}>Patients</h2>
      <div className="grid grid-2">
        {hospital.patients.map((patient, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DummyCard title={patient}>
              <p>Status: Under Treatment</p>
              <p>Room: {100 + index}</p>
            </DummyCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;
