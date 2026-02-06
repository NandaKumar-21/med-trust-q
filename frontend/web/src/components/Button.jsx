import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  const getClassName = () => {
    let className = 'button';
    if (variant === 'secondary') className += ' button-secondary';
    if (variant === 'danger') className += ' button-danger';
    return className;
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getClassName()}
    >
      {children}
    </motion.button>
  );
};

export default Button;
