// path: src/components/dashboard/EarningsChart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../common/Skeleton';

// Simple SVG Line Chart Component to avoid external heavy libraries
const EarningsChart = ({ data, loading }) => {
  if (loading) {
    return <Skeleton className="w-full h-64 rounded-3xl" />;
  }

  // Normalize data for SVG scaling
  const height = 200;
  const width = 500;
  const padding = 20;
  
  const maxValue = Math.max(...data.map(d => d.value)) || 100;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  // Create fill area path
  const areaPath = `${points} ${width - padding},${height} ${padding},${height}`;

  return (
    <div className="ios-card p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-ios-dark dark:text-white">Earnings Overview</h3>
          <p className="text-gray-500 text-sm">Last 7 Days performance</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 text-ios-green px-3 py-1 rounded-full text-xs font-bold">
          +12.5%
        </div>
      </div>

      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line 
              key={i}
              x1="0" 
              y1={i * (height / 4)} 
              x2={width} 
              y2={i * (height / 4)} 
              stroke="currentColor" 
              strokeOpacity="0.05" 
              className="text-gray-500"
            />
          ))}

          {/* Area Fill */}
          <motion.path
            d={`M${padding},${height} L${points.split(' ')[0]} ${points.substring(points.indexOf(' '))} L${width - padding},${height} Z`}
            fill="url(#gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          {/* Line Path */}
          <motion.polyline
            fill="none"
            stroke="#007AFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {data.map((d, i) => {
             const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
             const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
             return (
               <motion.circle
                 key={i}
                 cx={x}
                 cy={y}
                 r="4"
                 className="fill-white dark:fill-[#1C1C1E] stroke-ios-blue stroke-2"
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 1 + (i * 0.1) }}
               />
             );
          })}
        </svg>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
        {data.map((d, i) => (
          <span key={i}>{d.day}</span>
        ))}
      </div>
    </div>
  );
};

export default EarningsChart;