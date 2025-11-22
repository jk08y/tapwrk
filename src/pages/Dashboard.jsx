// path: src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { IoWalletOutline, IoCheckmarkDoneOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import StatCard from '../components/dashboard/StatCard.jsx';
import EarningsChart from '../components/dashboard/EarningsChart.jsx';
import RecentActivity from '../components/dashboard/RecentActivity.jsx';
import ProfileCompletionModal from '../components/modals/ProfileCompletionModal.jsx';

// Mock Data
const MOCK_CHART_DATA = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 19 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 25 },
  { day: 'Fri', value: 32 },
  { day: 'Sat', value: 28 },
  { day: 'Sun', value: 45 },
];

const MOCK_ACTIVITY = [
  { id: 1, type: 'earning', title: 'Completed Survey Task', amount: 2.50, time: '2 hours ago' },
  { id: 2, type: 'task', title: 'Data Verification Task', amount: 0.00, time: '4 hours ago' },
  { id: 3, type: 'pending', title: 'Referral Pending', amount: 0.00, time: '1 day ago' },
  { id: 4, type: 'earning', title: 'Daily Login Bonus', amount: 0.50, time: '1 day ago' },
];

const Dashboard = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
      if (userProfile && !userProfile.onboardingCompleted) {
        setShowCompletionModal(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [userProfile]);

  const handleModalComplete = () => {
    setShowCompletionModal(false);
  };

  const earnings = userProfile?.earnings?.total || 145.50;
  const pending = userProfile?.earnings?.pending || 12.00;
  const tasks = userProfile?.stats?.tasksCompleted || 42;

  return (
    <div className="space-y-8">
      <ProfileCompletionModal 
        isOpen={showCompletionModal} 
        onComplete={handleModalComplete} 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ios-dark dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {userProfile?.displayName?.split(' ')[0] || 'Earner'}! 👋
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Current Balance</p>
          <p className="text-2xl font-bold text-ios-blue">${earnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Earnings" 
          value={`$${earnings.toFixed(2)}`} 
          icon={IoWalletOutline}
          trend="up"
          trendValue="15%"
          color="blue"
          loading={loading}
          delay={0}
        />
        <StatCard 
          title="Tasks Completed" 
          value={tasks} 
          icon={IoCheckmarkDoneOutline}
          trend="up"
          trendValue="8"
          color="green"
          loading={loading}
          delay={0.1}
        />
        <StatCard 
          title="Pending" 
          value={`$${pending.toFixed(2)}`} 
          icon={IoTimeOutline}
          color="orange"
          loading={loading}
          delay={0.2}
        />
        <StatCard 
          title="Referrals" 
          value={userProfile?.stats?.referrals || 0} 
          icon={IoPeopleOutline}
          trend="up"
          trendValue="2"
          color="indigo"
          loading={loading}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <EarningsChart data={MOCK_CHART_DATA} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity activities={MOCK_ACTIVITY} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;