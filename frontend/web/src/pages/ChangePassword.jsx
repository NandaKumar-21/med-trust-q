import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import Input from '../components/Input';
import Button from '../components/Button';

const ChangePassword = ({ userEmail }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!userEmail) {
      setMessage('User not logged in');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Password changed successfully!');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setMessage(data.detail || 'Failed to change password');
      }
    } catch (error) {
      setMessage('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <AnimatedCard>
        <h1 className="title">Change Password</h1>
        <p className="subtitle">Update your account password</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}
          >
            {message}
          </motion.div>
        )}
      </AnimatedCard>
    </div>
  );
};

export default ChangePassword;
