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
  IoTimeOutline,
  IoSparkles,
  IoChevronForward
} from 'react-icons/io5';
import { toast } from 'react-toastify';

import Button from '../components/common/Button';
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
    <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto pb-24 sm:pb-10 px-4 sm:px-0">

      {/* Header Section */}
      <div className="pt-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Referral Program</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Invite friends and earn 10% of their revenue forever.</p>
      </div>

      {/* Hero Card - Premium Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-ios-blue via-blue-600 to-indigo-600 p-5 sm:p-8 shadow-xl shadow-blue-500/20"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mb-8 -ml-8" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <IoSparkles size={12} />
            <span>Lifetime Rewards</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Share & Earn Forever
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
            Get <span className="font-bold text-white">10% commission</span> on every task your referrals complete. No limits.
          </p>

          {/* Referral Link Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 mb-4">
            <div className="text-[10px] sm:text-xs text-white/60 font-medium uppercase tracking-wide mb-2">Your Referral Link</div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="font-mono text-xs sm:text-sm text-white truncate">
                  {referralLink}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-all active:scale-95 touch-manipulation"
              >
                <IoCopyOutline size={18} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={copyToClipboard}
              variant="secondary"
              className="flex-1 bg-white/20 hover:bg-white/30 border-none text-white h-10 sm:h-11 text-xs sm:text-sm rounded-full touch-manipulation active:scale-95"
            >
              <IoCopyOutline size={16} className="mr-1.5" /> Copy Link
            </Button>
            <Button
              onClick={handleShare}
              className="flex-1 bg-white text-ios-blue hover:bg-white/90 h-10 sm:h-11 text-xs sm:text-sm rounded-full shadow-lg touch-manipulation active:scale-95"
            >
              <IoShareSocialOutline size={16} className="mr-1.5" /> Invite
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Compact on Mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-ios-blue mb-2 sm:mb-3">
            <IoPeopleOutline size={18} />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-ios-dark dark:text-white">3</div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Referrals</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-ios-green mb-2 sm:mb-3">
            <IoGiftOutline size={18} />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-ios-green">$7.50</div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Earned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-ios-indigo mb-2 sm:mb-3">
            <IoTrophyOutline size={18} />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-ios-indigo">#4.2K</div>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Rank</div>
        </motion.div>
      </div>

      {/* Referral History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base sm:text-lg font-bold text-ios-dark dark:text-white">Your Referrals</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">{MOCK_REFERRALS.length} total</span>
        </div>

        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          {MOCK_REFERRALS.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {MOCK_REFERRALS.map((ref, index) => (
                <motion.div
                  key={ref.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors touch-manipulation active:bg-gray-100 dark:active:bg-white/10"
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold shrink-0 ${ref.status === 'Active'
                      ? 'bg-gradient-to-br from-ios-blue to-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                    {ref.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base text-ios-dark dark:text-white truncate">{ref.name}</span>
                      {ref.status === 'Active' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-ios-green shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{ref.date}</span>
                      <span className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-md ${ref.status === 'Active'
                          ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>{ref.status}</span>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="text-right shrink-0">
                    <div className={`font-bold text-sm sm:text-base ${ref.earned > 0 ? 'text-ios-green' : 'text-gray-400'}`}>
                      {ref.earned > 0 ? `+$${ref.earned.toFixed(2)}` : '$0.00'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">earned</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-10 sm:p-12 text-center">
              <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                <IoPeopleOutline size={28} />
              </div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">No referrals yet</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share your link to start earning!</p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works - Compact */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1C1C1E] dark:to-[#151516] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm sm:text-base font-bold text-ios-dark dark:text-white mb-3 sm:mb-4">How It Works</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-ios-blue text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 shadow-lg shadow-blue-500/30">1</div>
            <div className="pt-0.5">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Share your unique link</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copy and send to friends via any platform</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-ios-blue/20 text-ios-blue flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">2</div>
            <div className="pt-0.5">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Friends sign up & complete tasks</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">They start earning, you start earning too</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">3</div>
            <div className="pt-0.5">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Earn 10% forever</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">No limits, no expiration, lifetime passive income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;