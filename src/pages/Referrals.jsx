// path: src/pages/Referrals.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCopyOutline, IoPeopleOutline, IoGiftOutline, IoTrophyOutline, IoShareSocialOutline } from 'react-icons/io5';
import Button from '../components/common/Button';
import StatCard from '../components/dashboard/StatCard';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const MOCK_REFERRALS = [
  { id: 1, name: 'Sarah Jenkins', date: '2 days ago', status: 'Active', earned: 5.00 },
  { id: 2, name: 'Mike Ross', date: '5 days ago', status: 'Active', earned: 2.50 },
  { id: 3, name: 'Jessica Pearson', date: '1 week ago', status: 'Pending', earned: 0.00 },
];

const Referrals = () => {
  const { userProfile } = useAuth();
  const referralCode = userProfile?.uid?.slice(0, 8) || 'TAP-USER';
  const referralLink = `https://tapwrk.app/join?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-ios-blue to-ios-indigo p-8 md:p-12 text-center text-white shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
            <IoGiftOutline size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Invite Friends, Earn 10%</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Get a 10% commission on every task your friends complete for life. 
            There's no limit to how much you can earn.
          </p>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-lg mx-auto">
            <div className="flex-1 h-12 flex items-center justify-center md:justify-start px-4 font-mono text-sm text-blue-100 truncate select-all">
              {referralLink}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={copyToClipboard} 
                className="bg-white text-ios-blue hover:bg-blue-50 border-none flex-1 md:flex-none"
              >
                <IoCopyOutline /> Copy
              </Button>
              <Button 
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border-none md:px-3"
              >
                <IoShareSocialOutline size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Total Referrals" 
          value="3" 
          icon={IoPeopleOutline} 
          trend="up" 
          trendValue="2" 
          color="blue" 
        />
        <StatCard 
          title="Referral Earnings" 
          value="$7.50" 
          icon={IoGiftOutline} 
          trend="up" 
          trendValue="$2.50" 
          color="green" 
        />
        <StatCard 
          title="Rank" 
          value="#4,201" 
          icon={IoTrophyOutline} 
          color="orange" 
        />
      </div>

      {/* Referral List */}
      <div className="ios-card p-6 md:p-8">
        <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-6">Your Referrals</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                <th className="pb-4 text-sm font-medium text-gray-500 pl-4">User</th>
                <th className="pb-4 text-sm font-medium text-gray-500">Joined</th>
                <th className="pb-4 text-sm font-medium text-gray-500">Status</th>
                <th className="pb-4 text-sm font-medium text-gray-500 text-right pr-4">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {MOCK_REFERRALS.map((ref) => (
                <tr key={ref.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {ref.name.charAt(0)}
                      </div>
                      <span className="font-medium text-ios-dark dark:text-white">{ref.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-500">{ref.date}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      ref.status === 'Active' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4 font-medium text-ios-green">
                    ${ref.earned.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;