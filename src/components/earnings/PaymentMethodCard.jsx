// path: src/components/earnings/PaymentMethodCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle } from 'react-icons/io5';

const PaymentMethodCard = ({ id, name, icon: Icon, selected, onSelect }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center h-32 ${
        selected 
          ? "border-ios-blue bg-blue-50 dark:bg-blue-900/10" 
          : "border-transparent bg-white dark:bg-[#1C1C1E] hover:border-gray-200 dark:hover:border-gray-700 shadow-sm"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 text-ios-blue">
          <IoCheckmarkCircle size={20} />
        </div>
      )}
      <Icon size={32} className={selected ? "text-ios-blue" : "text-gray-400 dark:text-gray-500"} />
      <span className={`font-semibold text-sm ${selected ? "text-ios-blue" : "text-gray-600 dark:text-gray-400"}`}>
        {name}
      </span>
    </motion.div>
  );
};

PaymentMethodCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default PaymentMethodCard;