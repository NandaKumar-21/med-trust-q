import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (!data.approved) {
          setMessage('Your account is pending admin approval');
          return;
        }
        setUserRole(data.role, email);
        setMessage('Login successful!');
        setTimeout(() => {
          navigate(`/${data.role}-dashboard`);
        }, 1000);
      } else {
        setMessage(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      setMessage('Network error. Please check if backend is running.');
    }
  };

  return (
    <div className="container">
      <AnimatedCard>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '64px', marginBottom: '20px' }}
        >
          🏥
        </motion.div>
        <h1 className="title">Welcome to MedTrust</h1>
        <p className="subtitle">Your trusted healthcare platform</p>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <Button type="submit">Login</Button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}
          >
            {message}
          </motion.div>
        )}

        <p className="link-text">
          Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span>
        </p>
        <p className="link-text">
          <span className="link" onClick={() => navigate('/admin-login')}>Admin Login</span>
        </p>
      </AnimatedCard>
    </div>
  );
};

export default Login;
