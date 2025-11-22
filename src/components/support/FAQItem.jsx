// path: src/components/support/FAQItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd, IoRemove } from 'react-icons/io5';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`font-medium text-lg transition-colors ${isOpen ? 'text-ios-blue' : 'text-ios-dark dark:text-white group-hover:text-ios-blue'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-50 text-ios-blue rotate-180' : 'bg-transparent text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/10'}`}>
          {isOpen ? <IoRemove size={20} /> : <IoAdd size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FAQItem;