// path: src/components/common/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ios-light dark:bg-ios-dark transition-colors duration-300">
      <div className="ios-spinner text-ios-gray dark:text-gray-400">
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="mt-8 font-medium text-ios-gray animate-pulse tracking-wide text-sm">
        LOADING TAPWRK
      </div>
    </div>
  );
};

export default Loader;