// path: src/pages/Referrals.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCopyOutline, 
  IoPeopleOutline, 
  IoGiftOutline, 
  IoTrophyOutline, 
  IoShareSocialOutline,
  IoCheckmarkCircle,
  IoTimeOutline
} from 'react-icons/io5';
import { toast } from 'react-toastify';

// Removed .jsx extensions to let the bundler resolve them automatically
import Button from '../components/common/Button';
import StatCard from '../components/dashboard/StatCard';
import { useAuth } from '../context/AuthContext';

// Mock Data
const MOCK_REFERRALS = [
  { id: 1, name: 'Sarah Jenkins', date: '2 days ago', status: 'Active', earned: 5.00, avatar: 'S' },
  { id: 2, name: 'Mike Ross', date: '5 days ago', status: 'Active', earned: 2.50, avatar: 'M' },
  { id: 3, name: 'Jessica Pearson', date: '1 week ago', status: 'Pending', earned: 0.00, avatar: 'J' },
  { id: 4, name: 'Harvey Specter', date: '2 weeks ago', status: 'Active', earned: 12.50, avatar: 'H' },
];

const Referrals = () => {
  const { userProfile } = useAuth();
  const referralCode = userProfile?.uid?.slice(0, 8).toUpperCase() || 'TAP-USER';
  const referralLink = `https://tapwrk.app/join?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Tapwrk',
          text: 'Start earning money completing simple tasks on Tapwrk!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4 px-1">
        <div>
          <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Referral Program</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Invite friends and earn 10% of their revenue forever.</p>
        </div>
      </div>

      {/* Hero / Invite Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 md:p-10 shadow-sm"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-ios-blue text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-500/10">
              <IoGiftOutline size={14} />
              <span>Lifetime Rewards</span>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-ios-dark dark:text-white mb-3">
                Share your unique link
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md">
                For every person who signs up using your link, you'll earn a <strong className="text-ios-blue">10% commission</strong> on every task they complete.
              </p>
            </div>

            {/* Copy Link Box - Optimized for Mobile */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
              <div className="flex-1 flex items-center justify-between bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden pl-4 pr-2 py-2">
                <div className="flex-1 min-w-0 mr-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                    <p className="font-mono text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {referralLink}
                    </p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="shrink-0 h-9 px-4 flex items-center justify-center text-ios-blue hover:text-white bg-blue-50 hover:bg-ios-blue dark:bg-blue-900/20 dark:hover:bg-ios-blue rounded-xl text-xs font-bold transition-all"
                >
                  Copy
                </button>
              </div>
              <Button onClick={handleShare} className="w-full sm:w-auto gap-2 shadow-lg shadow-blue-500/20 rounded-2xl">
                <IoShareSocialOutline size={18} /> Invite
              </Button>
            </div>
          </div>

          {/* Stats Mini-Dashboard within Hero */}
          <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-6 border border-gray-100 dark:border-gray-800/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Your Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#151516] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">Total Referrals</div>
                <div className="text-2xl font-bold text-ios-dark dark:text-white">3</div>
                <div className="text-xs text-green-500 font-medium mt-1 flex items-center gap-1">
                  <IoCheckmarkCircle /> 2 Active
                </div>
              </div>
              <div className="bg-white dark:bg-[#151516] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">Total Earned</div>
                <div className="text-2xl font-bold text-ios-blue">$7.50</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Lifetime</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Monthly Referrals" 
          value="3" 
          icon={IoPeopleOutline} 
          trend="up" 
          trendValue="+100%" 
          color="blue" 
        />
        <StatCard 
          title="Pending Commision" 
          value="$1.25" 
          icon={IoTimeOutline} 
          color="orange" 
        />
        <StatCard 
          title="Global Rank" 
          value="#4,201" 
          icon={IoTrophyOutline} 
          trend="up"
          trendValue="Top 5%"
          color="indigo" 
        />
      </div>

      {/* Referral History List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-ios-dark dark:text-white px-1">Referral History</h3>
        
        <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-4 px-8 py-4 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div>User</div>
            <div>Joined</div>
            <div>Status</div>
            <div className="text-right">Earnings</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {MOCK_REFERRALS.map((ref) => (
              <motion.div 
                key={ref.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="p-5 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 items-center transition-colors"
              >
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                    {ref.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-ios-dark dark:text-white">{ref.name}</div>
                    <div className="text-xs text-gray-500 md:hidden">Joined {ref.date}</div>
                  </div>
                </div>

                {/* Date (Desktop) */}
                <div className="hidden md:block text-sm text-gray-500">
                  {ref.date}
                </div>

                {/* Status & Mobile Layout */}
                <div className="flex items-center justify-between md:justify-start">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    ref.status === 'Active' 
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {ref.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />}
                    {ref.status}
                  </span>
                  
                  {/* Mobile Earnings Display */}
                  <div className="md:hidden font-bold text-ios-green">
                    +${ref.earned.toFixed(2)}
                  </div>
                </div>

                {/* Desktop Earnings */}
                <div className="hidden md:block text-right font-bold text-ios-green">
                  +${ref.earned.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
          
          {MOCK_REFERRALS.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No referrals yet. Share your link to start earning!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referrals;