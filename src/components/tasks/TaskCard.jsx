// path: src/components/tasks/TaskCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// Ensure react-icons is installed in your package.json. 
// If this fails again, run: npm install react-icons
import {
  IoTimeOutline,
  IoWalletOutline,
  IoChevronForward,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoTiktok,
  IoDocumentTextOutline,
  IoHardwareChipOutline,
  IoStar
} from 'react-icons/io5';
import Button from '../common/Button.jsx'; // Ensure correct relative path
import { cn } from '../../utils/cn';

const getIcon = (type) => {
  switch (type) {
    case 'instagram': return <IoLogoInstagram className="text-pink-500" size={22} />;
    case 'youtube': return <IoLogoYoutube className="text-red-500" size={22} />;
    case 'tiktok': return <IoLogoTiktok className="text-black dark:text-white" size={22} />;
    case 'survey': return <IoDocumentTextOutline className="text-ios-blue" size={22} />;
    case 'ai': return <IoHardwareChipOutline className="text-ios-indigo" size={22} />;
    default: return <IoDocumentTextOutline className="text-gray-500" size={22} />;
  }
};

const TaskCard = ({ task, onStart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      onClick={() => onStart(task)}
      className="group relative bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-ios-float transition-all cursor-pointer overflow-hidden touch-manipulation active:scale-[0.99]"
    >
      {/* Hover Highlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent dark:via-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center relative z-10">

        {/* Icon Box */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 flex items-center justify-center shadow-inner shrink-0">
          {getIcon(task.platform || task.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {task.category}
            </span>
            {task.hot && (
              <span className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-orange-50 dark:bg-orange-900/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-500">
                <IoStar size={9} /> Hot
              </span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg text-ios-dark dark:text-white leading-tight truncate pr-2 sm:pr-4">
            {task.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 sm:line-clamp-1">
            {task.description}
          </p>
        </div>

        {/* Action / Reward */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pl-0 sm:pl-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800 pt-3 sm:pt-0 mt-1 sm:mt-0">
          <div className="text-left sm:text-right">
            <div className="flex items-center sm:justify-end gap-1 sm:gap-1.5 text-ios-green font-bold text-lg sm:text-xl">
              <span className="text-xs sm:text-sm font-medium text-gray-400">$</span>
              {task.reward.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-gray-400 mt-0.5">
              <IoTimeOutline size={12} />
              <span>{task.timeEstimate}</span>
            </div>
          </div>

          <div className="hidden sm:flex w-8 h-8 rounded-full bg-gray-50 dark:bg-white/10 items-center justify-center text-gray-400 group-hover:bg-ios-blue group-hover:text-white transition-colors mt-3">
            <IoChevronForward size={18} />
          </div>

          {/* Mobile Start Button */}
          <Button
            size="sm"
            className="sm:hidden rounded-xl bg-ios-dark dark:bg-white text-white dark:text-black h-10 px-5 shadow-lg touch-manipulation active:scale-95 text-sm font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onStart(task);
            }}
          >
            Start
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    reward: PropTypes.number,
    timeEstimate: PropTypes.string,
    category: PropTypes.string,
    platform: PropTypes.string,
    type: PropTypes.string,
    hot: PropTypes.bool
  }).isRequired,
  onStart: PropTypes.func.isRequired,
};

export default TaskCard;