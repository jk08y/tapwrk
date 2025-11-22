// path: src/pages/Earnings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoWalletOutline, IoLogoPaypal, IoLogoBitcoin, IoCardOutline, IoDownloadOutline } from 'react-icons/io5';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import StatCard from '../components/dashboard/StatCard';
import PaymentMethodCard from '../components/earnings/PaymentMethodCard';
import RecentActivity from '../components/dashboard/RecentActivity'; // Reusing activity list
import { toast } from 'react-toastify';

const Earnings = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('paypal');

  const MOCK_HISTORY = [
    { id: 1, type: 'withdrawal', title: 'PayPal Withdrawal', amount: -25.00, time: '2 days ago' },
    { id: 2, type: 'earning', title: 'Task Earnings', amount: 4.50, time: '3 days ago' },
    { id: 3, type: 'earning', title: 'Task Earnings', amount: 1.20, time: '4 days ago' },
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Wallet & Earnings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your funds and withdrawals.</p>
        </div>
        <Button variant="secondary" className="gap-2">
          <IoDownloadOutline size={18} /> Export History
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2 p-8 rounded-[2rem] bg-gradient-to-br from-ios-blue to-ios-indigo text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-1">Total Balance</p>
            <h2 className="text-5xl font-bold tracking-tight mb-6">$145.50</h2>
            <div className="flex gap-8">
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Available</p>
                <p className="font-semibold text-xl">$133.50</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Pending</p>
                <p className="font-semibold text-xl">$12.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-ios-green mb-4">
            <IoWalletOutline size={32} />
          </div>
          <p className="text-gray-500 text-sm">Lifetime Earnings</p>
          <p className="text-2xl font-bold text-ios-dark dark:text-white">$1,240.50</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Withdrawal Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1C1C1E] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-6">Request Withdrawal</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-4">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-4">
                <PaymentMethodCard 
                  id="paypal" 
                  name="PayPal" 
                  icon={IoLogoPaypal} 
                  selected={selectedMethod === 'paypal'} 
                  onSelect={setSelectedMethod} 
                />
                <PaymentMethodCard 
                  id="crypto" 
                  name="Crypto" 
                  icon={IoLogoBitcoin} 
                  selected={selectedMethod === 'crypto'} 
                  onSelect={setSelectedMethod} 
                />
                <PaymentMethodCard 
                  id="bank" 
                  name="Bank Transfer" 
                  icon={IoCardOutline} 
                  selected={selectedMethod === 'bank'} 
                  onSelect={setSelectedMethod} 
                />
              </div>
            </div>

            <form onSubmit={handleWithdraw}>
              <div className="mb-6">
                <Input 
                  label="Amount to Withdraw (USD)"
                  type="number"
                  placeholder="0.00"
                  min="10"
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="text-lg font-semibold"
                  icon={IoWalletOutline}
                />
                <p className="text-xs text-gray-400 mt-2 ml-1">
                  Minimum withdrawal amount is $10.00. Processing time: 24-48 hours.
                </p>
              </div>
              <Button type="submit" className="w-full py-4 text-lg">
                Withdraw Funds
              </Button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-1">
          <RecentActivity activities={MOCK_HISTORY} loading={false} />
        </div>
      </div>
    </div>
  );
};

export default Earnings;