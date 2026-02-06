import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { hospitalOptions } from '../data/mockData';

const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'patient', icon: '🧑⚕️', name: 'Patient' },
    { value: 'doctor', icon: '👨⚕️', name: 'Doctor' },
    { value: 'hospital', icon: '🏥', name: 'Hospital' },
    { value: 'insurance', icon: '🛡️', name: 'Insurance' }
  ];

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.detail || 'Registration failed');
      }
    } catch (error) {
      setMessage('Network error. Please check if backend is running.');
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="container">
      <AnimatedCard className="card-large">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join MedTrust today</p>

        {step === 1 && (
          <div className="role-selector">
            {roles.map((r) => (
              <motion.div
                key={r.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="role-option"
                onClick={() => handleRoleSelect(r.value)}
              >
                <div className="role-icon">{r.icon}</div>
                <div className="role-name">{r.name}</div>
              </motion.div>
            ))}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            {role === 'patient' && (
              <>
                <Input label="Full Name" value={formData.name || ''} onChange={(e) => updateField('name', e.target.value)} required />
                <Input label="Age" type="number" value={formData.age || ''} onChange={(e) => updateField('age', e.target.value)} required />
                <div className="form-group">
                  <label className="label">Gender</label>
                  <select className="select" value={formData.gender || ''} onChange={(e) => updateField('gender', e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Input label="Phone" value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} required />
                <Input label="Address" value={formData.address || ''} onChange={(e) => updateField('address', e.target.value)} required />
                <Input label="Email" type="email" value={formData.email || ''} onChange={(e) => updateField('email', e.target.value)} required />
                <Input label="Password" type="password" value={formData.password || ''} onChange={(e) => updateField('password', e.target.value)} required />
                <Input label="Confirm Password" type="password" value={formData.confirmPassword || ''} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
              </>
            )}

            {role === 'doctor' && (
              <>
                <Input label="Full Name" value={formData.name || ''} onChange={(e) => updateField('name', e.target.value)} required />
                <Input label="Specialization" value={formData.specialization || ''} onChange={(e) => updateField('specialization', e.target.value)} required />
                <Input label="License Number" value={formData.license || ''} onChange={(e) => updateField('license', e.target.value)} required />
                <div className="form-group">
                  <label className="label">Hospital</label>
                  <select className="select" value={formData.hospital || ''} onChange={(e) => updateField('hospital', e.target.value)} required>
                    <option value="">Select Hospital</option>
                    {hospitalOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <Input label="Phone" value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} required />
                <Input label="Email" type="email" value={formData.email || ''} onChange={(e) => updateField('email', e.target.value)} required />
                <Input label="Password" type="password" value={formData.password || ''} onChange={(e) => updateField('password', e.target.value)} required />
                <Input label="Confirm Password" type="password" value={formData.confirmPassword || ''} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
              </>
            )}

            {role === 'hospital' && (
              <>
                <Input label="Hospital Name" value={formData.name || ''} onChange={(e) => updateField('name', e.target.value)} required />
                <Input label="Registration Number" value={formData.regNumber || ''} onChange={(e) => updateField('regNumber', e.target.value)} required />
                <Input label="Address" value={formData.address || ''} onChange={(e) => updateField('address', e.target.value)} required />
                <Input label="Contact Email" type="email" value={formData.email || ''} onChange={(e) => updateField('email', e.target.value)} required />
                <Input label="Contact Phone" value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} required />
                <Input label="Password" type="password" value={formData.password || ''} onChange={(e) => updateField('password', e.target.value)} required />
                <Input label="Confirm Password" type="password" value={formData.confirmPassword || ''} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
              </>
            )}

            {role === 'insurance' && (
              <>
                <Input label="Company Name" value={formData.name || ''} onChange={(e) => updateField('name', e.target.value)} required />
                <Input label="License Number" value={formData.license || ''} onChange={(e) => updateField('license', e.target.value)} required />
                <Input label="Contact Person" value={formData.contactPerson || ''} onChange={(e) => updateField('contactPerson', e.target.value)} required />
                <Input label="Contact Phone" value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} required />
                <Input label="Email" type="email" value={formData.email || ''} onChange={(e) => updateField('email', e.target.value)} required />
                <Input label="Password" type="password" value={formData.password || ''} onChange={(e) => updateField('password', e.target.value)} required />
                <Input label="Confirm Password" type="password" value={formData.confirmPassword || ''} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
              </>
            )}

            <Button type="submit">Register</Button>
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
          </form>
        )}

        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message message-success">
            {message}
          </motion.div>
        )}

        <p className="link-text">
          Already have an account? <span className="link" onClick={() => navigate('/login')}>Login</span>
        </p>
      </AnimatedCard>
    </div>
  );
};

export default Register;
