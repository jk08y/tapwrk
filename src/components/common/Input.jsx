// path: src/components/common/Input.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  className, 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full bg-white dark:bg-ios-cardDark border border-gray-200 dark:border-gray-700 rounded-full px-4 py-3 text-sm text-ios-dark dark:text-white placeholder-gray-400 focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 transition-all',
            Icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-1 animate-fade-in font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Input;