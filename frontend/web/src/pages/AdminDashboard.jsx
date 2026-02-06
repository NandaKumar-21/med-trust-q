import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/pending-users');
      const data = await response.json();
      
      if (response.ok) {
        setPending(data.pending || []);
        setApproved(data.approved || []);
      }
    } catch (error) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (user) => {
    try {
      const response = await fetch('http://localhost:8000/admin/approve-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      if (response.ok) {
        setPending(pending.filter(u => u.id !== user.id));
        setApproved([...approved, { ...user, approved: true }]);
      }
    } catch (error) {
      console.error('Failed to approve user');
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="navbar">
        <div className="navbar-brand">🔐 Admin Panel</div>
        <button onClick={() => navigate('/login')} className="btn-small btn-primary">
          Logout
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage user approvals</p>
      </motion.div>

      <h2 style={{ color: '#16a34a', marginBottom: '15px' }}>Pending Approvals</h2>
      {pending.length === 0 ? (
        <p>No pending approvals</p>
      ) : (
        pending.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="list-card"
          >
            <div className="list-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <span className={`badge badge-${user.role}`}>{user.role}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleApprove(user)}
              className="btn-small btn-primary"
            >
              Approve
            </motion.button>
          </motion.div>
        ))
      )}

      <h2 style={{ color: '#16a34a', marginTop: '40px', marginBottom: '15px' }}>Approved Users</h2>
      {approved.length === 0 ? (
        <p>No approved users</p>
      ) : (
        approved.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="list-card"
          >
            <div className="list-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <span className={`badge badge-${user.role}`}>{user.role}</span>
            </div>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Approved</span>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
