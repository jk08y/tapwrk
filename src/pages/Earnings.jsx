// path: src/pages/Earnings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoWalletOutline, 
  IoLogoPaypal, 
  IoLogoBitcoin, 
  IoCardOutline, 
  IoDownloadOutline, 
  IoTimeOutline,
  IoTrendingUp
} from 'react-icons/io5';

// Added .jsx extensions for explicit resolution
import Button from '../components/common/Button.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import PaymentMethodCard from '../components/earnings/PaymentMethodCard.jsx';
import RecentActivity from '../components/dashboard/RecentActivity.jsx'; 
import { toast } from 'react-toastify';

const Earnings = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('paypal');

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
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Wallet</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your funds and payouts.</p>
        </div>
        <Button variant="secondary" size="sm" className="gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800">
          <IoDownloadOutline size={16} /> Export CSV
        </Button>
      </div>

      {/* Wallet Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Balance Card - Adapted for Light/Dark Mode */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#151516] text-ios-dark dark:text-white p-8 md:p-10 shadow-xl shadow-blue-900/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800"
        >
          {/* Abstract Ambient Glow - Adjusted colors for modes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 dark:bg-purple-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total Balance</p>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-ios-dark dark:text-white">
                  $145.50
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center backdrop-blur-md">
                <IoWalletOutline size={24} className="text-ios-blue dark:text-blue-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide font-bold">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Available
                </div>
                <p className="text-xl font-bold text-ios-dark dark:text-white">$133.50</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide font-bold">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Pending
                </div>
                <p className="text-xl font-bold text-ios-dark dark:text-gray-200">$12.00</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lifetime Stats */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex-1">
            <StatCard 
              title="Lifetime Earnings" 
              value="$1,240.50" 
              icon={IoTrendingUp} 
              trend="up"
              trendValue="+12%"
              color="green" 
            />
          </div>
          <div className="flex-1">
            <StatCard 
              title="Next Payout" 
              value="Oct 24" 
              icon={IoTimeOutline} 
              color="blue" 
            />
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Withdrawal Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#1C1C1E] p-6 md:p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-1">Request Withdrawal</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose where you want to send your funds.</p>
            </div>
            
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Payment Method</label>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
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
                  name="Bank" 
                  icon={IoCardOutline} 
                  selected={selectedMethod === 'bank'} 
                  onSelect={setSelectedMethod} 
                />
              </div>
            </div>

            <form onSubmit={handleWithdraw}>
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-semibold text-lg">$</span>
                  </div>
                  <input 
                    type="number"
                    min="10"
                    step="0.01"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl py-5 pl-10 pr-4 text-3xl font-bold text-ios-dark dark:text-white placeholder-gray-300 focus:ring-4 focus:ring-ios-blue/10 focus:border-ios-blue transition-all outline-none"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 px-2">
                  <p className="text-xs font-medium text-gray-400">Min. withdrawal $10.00</p>
                  <button 
                    type="button" 
                    onClick={() => setWithdrawAmount('133.50')}
                    className="text-xs font-bold text-ios-blue hover:underline"
                  >
                    Max: $133.50
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full py-4 text-base shadow-lg shadow-blue-500/20 rounded-2xl">
                Review & Withdraw
              </Button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm h-full">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-ios-dark dark:text-white">Recent Transactions</h3>
              <button className="text-xs font-bold text-ios-blue hover:opacity-80">View All</button>
            </div>
            <div className="p-2">
              <RecentActivity activities={MOCK_HISTORY} loading={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;