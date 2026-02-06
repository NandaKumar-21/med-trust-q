import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="form-group">
      {label && <label className="label">{label}</label>}
      <div className="input-wrapper">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input ${isPassword ? 'input-password' : ''}`}
        />
        {isPassword && (
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default Input;
