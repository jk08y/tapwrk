// path: src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ImSpinner8 } from 'react-icons/im';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 rounded-full',
};

// Adjusted sizes to be more compact and "SaaS-like"
const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading = false, 
  disabled, 
  type = 'button',
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all rounded-full disabled:opacity-50 disabled:pointer-events-none select-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <ImSpinner8 className="animate-spin mr-2 absolute left-1/2 -ml-3" />
      )}
      <span className={cn('flex items-center gap-2', isLoading && 'invisible')}>
        {children}
      </span>
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

export default Button;