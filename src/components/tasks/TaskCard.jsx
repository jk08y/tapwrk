// path: src/components/tasks/TaskCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { IoTimeOutline, IoWalletOutline, IoChevronForward, IoLogoInstagram, IoLogoYoutube, IoLogoTiktok, IoDocumentTextOutline, IoHardwareChipOutline } from 'react-icons/io5';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const getIcon = (type) => {
  switch (type) {
    case 'instagram': return <IoLogoInstagram className="text-pink-500" size={24} />;
    case 'youtube': return <IoLogoYoutube className="text-red-500" size={24} />;
    case 'tiktok': return <IoLogoTiktok className="text-black dark:text-white" size={24} />;
    case 'survey': return <IoDocumentTextOutline className="text-ios-blue" size={24} />;
    case 'ai': return <IoHardwareChipOutline className="text-ios-indigo" size={24} />;
    default: return <IoDocumentTextOutline className="text-gray-500" size={24} />;
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
      className="ios-card p-5 flex flex-col md:flex-row gap-5 items-start md:items-center group cursor-pointer border-l-4 border-l-transparent hover:border-l-ios-blue transition-all"
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shadow-sm flex-shrink-0">
        {getIcon(task.platform || task.type)}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {task.category}
          </span>
          {task.hot && (
            <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-900/20 text-[10px] font-bold uppercase tracking-wider text-orange-500">
              Hot
            </span>
          )}
        </div>
        <h3 className="font-semibold text-ios-dark dark:text-white text-lg leading-tight">
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
          {task.description}
        </p>
      </div>

      {/* Meta & Action */}
      <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-center">
        <div className="text-right">
          <div className="flex items-center gap-1 text-ios-green font-bold text-lg">
            <IoWalletOutline size={18} />
            <span>${task.reward.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 justify-end">
            <IoTimeOutline />
            <span>{task.timeEstimate}</span>
          </div>
        </div>
        
        <Button 
          variant="secondary" 
          size="sm" 
          className="md:hidden w-24 rounded-xl bg-ios-light dark:bg-white/10 border-0"
          onClick={(e) => {
            e.stopPropagation();
            onStart(task);
          }}
        >
          Start
        </Button>

        <div className="hidden md:flex w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 items-center justify-center text-gray-400 group-hover:bg-ios-blue group-hover:text-white transition-colors">
          <IoChevronForward size={18} />
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