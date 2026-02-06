import React from 'react';
import { motion } from 'framer-motion';

const DummyCard = ({ title, children, variant = 'info' }) => {
  const className = variant === 'vital' ? 'vital-card' : 'info-card';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={className}
    >
      <h3 className={variant === 'vital' ? 'vital-label' : 'info-card-title'}>{title}</h3>
      <div className="info-card-content">{children}</div>
    </motion.div>
  );
};

export default DummyCard;
