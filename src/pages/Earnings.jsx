// path: src/pages/Earnings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoWalletOutline,
  IoLogoPaypal,
  IoLogoBitcoin,
  IoCardOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoTrendingUp,
  IoChevronForward,
  IoArrowDown,
  IoArrowUp
} from 'react-icons/io5';

import Button from '../components/common/Button.jsx';
import { toast } from 'react-toastify';

const Earnings = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('paypal');

  const PAYMENT_METHODS = [
    { id: 'paypal', name: 'PayPal', icon: IoLogoPaypal },
    { id: 'crypto', name: 'Crypto', icon: IoLogoBitcoin },
    { id: 'bank', name: 'Bank', icon: IoCardOutline },
  ];

  const MOCK_HISTORY = [
    { id: 1, type: 'withdrawal', title: 'PayPal Withdrawal', amount: -25.00, time: '2 days ago' },
    { id: 2, type: 'earning', title: 'Task Earnings', amount: 4.50, time: '3 days ago' },
    { id: 3, type: 'earning', title: 'Task Earnings', amount: 1.20, time: '4 days ago' },
    { id: 4, type: 'earning', title: 'Referral Bonus', amount: 5.00, time: '5 days ago' },
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || parseFloat(withdrawAmount) < 10) {
      toast.error("Minimum withdrawal amount is $10.00");
      return;
    }
    toast.success(`Withdrawal request for $${withdrawAmount} via ${selectedMethod} submitted!`);
    setWithdrawAmount('');
  };

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto pb-24 sm:pb-10 px-4 sm:px-0">

      {/* Header Section */}
      <div className="pt-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Wallet</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage your funds and payouts.</p>
      </div>

      {/* Balance Card - Premium Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-ios-dark via-gray-900 to-gray-800 p-5 sm:p-8 shadow-xl"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-ios-blue/20 rounded-full blur-3xl -mt-10 -mr-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mb-8 -ml-8" />

        <div className="relative z-10">
          {/* Wallet Icon & Label */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <IoWalletOutline size={18} className="text-white" />
            </div>
            <span className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">Total Balance</span>
          </div>

          {/* Balance Amount */}
          <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6">
            $145<span className="text-white/60">.50</span>
          </div>

          {/* Available & Pending */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-ios-green" />
                <span className="text-[10px] sm:text-xs text-white/60 font-medium uppercase tracking-wide">Available</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-white">$133.50</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span className="text-[10px] sm:text-xs text-white/60 font-medium uppercase tracking-wide">Pending</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-white/80">$12.00</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-ios-green mb-2.5 sm:mb-3">
            <IoTrendingUp size={18} />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-ios-dark dark:text-white">$1,240</div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Lifetime Earnings</div>
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-ios-green font-semibold">
            <IoArrowUp size={10} /> +12% this month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-ios-blue mb-2.5 sm:mb-3">
            <IoTimeOutline size={18} />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-ios-dark dark:text-white">Oct 24</div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Next Payout</div>
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-gray-400 font-medium">
            in 3 days
          </div>
        </motion.div>
      </div>

      {/* Withdrawal Section */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-ios-dark dark:text-white mb-0.5">Request Withdrawal</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Choose your payment method and amount.</p>
        </div>

        {/* Payment Methods - Compact on Mobile */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 sm:mb-3">Payment Method</label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {PAYMENT_METHODS.map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 h-20 sm:h-24 touch-manipulation ${selectedMethod === method.id
                    ? "border-ios-blue bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
              >
                {selectedMethod === method.id && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-ios-blue">
                    <IoCheckmarkCircle size={14} />
                  </div>
                )}
                <method.icon size={22} className={selectedMethod === method.id ? "text-ios-blue" : "text-gray-400"} />
                <span className={`font-semibold text-[10px] sm:text-xs ${selectedMethod === method.id ? "text-ios-blue" : "text-gray-500 dark:text-gray-400"}`}>
                  {method.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <form onSubmit={handleWithdraw}>
          <div className="mb-5 sm:mb-6">
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 sm:mb-3">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 font-bold text-xl sm:text-2xl">$</span>
              </div>
              <input
                type="number"
                min="10"
                step="0.01"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl py-4 sm:py-5 pl-10 sm:pl-12 pr-4 text-2xl sm:text-3xl font-bold text-ios-dark dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:ring-4 focus:ring-ios-blue/10 focus:border-ios-blue transition-all outline-none"
              />
            </div>
            <div className="flex justify-between items-center mt-2.5 px-1">
              <p className="text-[10px] sm:text-xs font-medium text-gray-400">Min. $10.00</p>
              <button
                type="button"
                onClick={() => setWithdrawAmount('133.50')}
                className="text-[10px] sm:text-xs font-bold text-ios-blue hover:underline touch-manipulation"
              >
                Max: $133.50
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 sm:h-12 text-sm sm:text-base shadow-lg shadow-blue-500/20 rounded-full touch-manipulation active:scale-[0.98]"
          >
            Review & Withdraw
          </Button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-bold text-ios-dark dark:text-white">Recent Transactions</h3>
          <button className="text-[10px] sm:text-xs font-bold text-ios-blue hover:underline touch-manipulation">View All</button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {MOCK_HISTORY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors touch-manipulation"
            >
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${item.type === 'earning'
                  ? 'bg-green-50 dark:bg-green-900/20 text-ios-green'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-500'
                }`}>
                {item.type === 'earning' ? <IoArrowDown size={18} /> : <IoArrowUp size={18} />}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-ios-dark dark:text-white truncate">{item.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
              </div>

              {/* Amount */}
              <div className={`font-bold text-sm sm:text-base shrink-0 ${item.amount > 0 ? 'text-ios-green' : 'text-red-500'
                }`}>
                {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earnings;