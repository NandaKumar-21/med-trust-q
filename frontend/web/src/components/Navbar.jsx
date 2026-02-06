import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar"
    >
      <div className="navbar-brand">🏥 MedTrust</div>
      <div className="navbar-actions">
        <button onClick={handleViewProfile} className="btn-small btn-outline">
          View Profile
        </button>
        <button onClick={handleChangePassword} className="btn-small btn-outline">
          Change Password
        </button>
        <button onClick={handleLogout} className="btn-small btn-primary">
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
