import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AnimatedCard from '../components/AnimatedCard';
import { mockUsers } from '../data/mockData';

const ViewProfile = ({ role }) => {
  const userData = mockUsers[role] || {};

  return (
    <div className="dashboard">
      <Navbar role={role} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">My Profile</h1>
        <p className="dashboard-subtitle">View your account information</p>
      </motion.div>

      <AnimatedCard>
        {role === 'patient' && (
          <div>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Age:</span>
              <span className="info-value">{userData.age}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">{userData.gender}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{userData.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Linked Doctor:</span>
              <span className="info-value">{userData.linkedDoctor}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Linked Hospital:</span>
              <span className="info-value">{userData.linkedHospital}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Insurance:</span>
              <span className="info-value">{userData.linkedInsurance}</span>
            </div>
          </div>
        )}

        {role === 'doctor' && (
          <div>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Specialization:</span>
              <span className="info-value">{userData.specialization}</span>
            </div>
            <div className="info-row">
              <span className="info-label">License:</span>
              <span className="info-value">{userData.license}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Hospital:</span>
              <span className="info-value">{userData.hospital}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Patients:</span>
              <span className="info-value">{userData.patients?.join(', ')}</span>
            </div>
          </div>
        )}

        {role === 'hospital' && (
          <div>
            <div className="info-row">
              <span className="info-label">Hospital Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Registration Number:</span>
              <span className="info-value">{userData.registrationNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{userData.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Doctors:</span>
              <span className="info-value">{userData.doctors?.join(', ')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Patients:</span>
              <span className="info-value">{userData.patients?.join(', ')}</span>
            </div>
          </div>
        )}

        {role === 'insurance' && (
          <div>
            <div className="info-row">
              <span className="info-label">Company Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">License:</span>
              <span className="info-value">{userData.license}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Contact Person:</span>
              <span className="info-value">{userData.contactPerson}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Covered Patients:</span>
              <span className="info-value">{userData.coveredPatients?.join(', ')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Linked Hospitals:</span>
              <span className="info-value">{userData.linkedHospitals?.join(', ')}</span>
            </div>
          </div>
        )}
      </AnimatedCard>
    </div>
  );
};

export default ViewProfile;
