// path: src/components/dashboard/StatCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import { cn } from '../../utils/cn';

// Simple Skeleton for internal use if needed, usually imported but keeping it self-contained for safety
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl", className)} />
);

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'blue',
  loading = false,
  delay = 0
}) => {
  const colorStyles = {
    blue: 'text-ios-blue bg-blue-50 dark:bg-blue-900/20',
    green: 'text-ios-green bg-green-50 dark:bg-green-900/20',
    indigo: 'text-ios-indigo bg-indigo-50 dark:bg-indigo-900/20',
    orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  };

  if (loading) {
    return (
      <div className="ios-card p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="ios-card p-6 h-full flex flex-col justify-between hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
          {title}
        </h3>
        <div className={cn("p-2.5 rounded-xl transition-colors", colorStyles[color])}>
          <Icon size={20} />
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold text-ios-dark dark:text-white mb-2 tracking-tight">
          {value}
        </div>
        
        {trend && (
          <div className="flex items-center text-xs font-medium">
            <span className={cn(
              "flex items-center mr-2",
              trend === 'up' ? "text-ios-green" : "text-red-500"
            )}>
              {trend === 'up' ? <IoTrendingUp className="mr-1" /> : <IoTrendingDown className="mr-1" />}
              {trendValue}
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.elementType,
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  delay: PropTypes.number,
};

export default StatCard;