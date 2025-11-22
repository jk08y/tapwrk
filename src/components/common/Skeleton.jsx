// path: src/components/common/Skeleton.jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl",
        className
      )}
    />
  );
};

export default Skeleton;