import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import Input from '../components/Input';
import Button from '../components/Button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setMessage('Login successful!');
      setTimeout(() => navigate('/admin-dashboard'), 1000);
    }
  };

  return (
    <div className="container">
      <AnimatedCard>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ textAlign: 'center', fontSize: '64px', marginBottom: '20px' }}
        >
          🔐
        </motion.div>
        <h1 className="title">Admin Login</h1>
        <p className="subtitle">Secure access for administrators</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="message message-success"
          >
            {message}
          </motion.div>
        )}

        <p className="link-text">
          <span className="link" onClick={() => navigate('/login')}>Back to User Login</span>
        </p>
      </AnimatedCard>
    </div>
  );
};

export default AdminLogin;
