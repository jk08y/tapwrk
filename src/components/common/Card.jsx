// path: src/components/common/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = ({ 
  children, 
  className, 
  glass = false, 
  hover = false, 
  onClick,
  ...props 
}) => {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      className={cn(
        'ios-card p-6',
        glass && 'glass',
        hover && 'ios-card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hover && onClick ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  glass: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;