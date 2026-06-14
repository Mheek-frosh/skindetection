import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  const isClickable = !!onClick;
  
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect || isClickable ? { y: -4, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)' } : {}}
      transition={{ duration: 0.2 }}
      className={`bg-white border border-slate-100 rounded-3xl p-6 shadow-apple ${
        isClickable ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
