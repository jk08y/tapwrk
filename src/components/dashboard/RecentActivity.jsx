// path: src/components/dashboard/RecentActivity.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoTime, IoWallet } from 'react-icons/io5';
import Skeleton from '../common/Skeleton';

const RecentActivity = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="ios-card p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 mb-4 last:mb-0">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ios-card p-6">
      <h3 className="text-lg font-bold text-ios-dark dark:text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity.</p>
        ) : (
          activities.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className={`mt-1 min-w-[40px] h-10 rounded-full flex items-center justify-center ${
                item.type === 'earning' ? 'bg-green-100 text-ios-green dark:bg-green-900/20' :
                item.type === 'task' ? 'bg-blue-100 text-ios-blue dark:bg-blue-900/20' :
                'bg-orange-100 text-orange-500 dark:bg-orange-900/20'
              }`}>
                {item.type === 'earning' ? <IoWallet size={20} /> : 
                 item.type === 'task' ? <IoCheckmarkCircle size={20} /> : <IoTime size={20} />}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-semibold text-ios-dark dark:text-white">{item.title}</h4>
                  <span className={`text-xs font-bold ${item.amount > 0 ? 'text-ios-green' : 'text-gray-400'}`}>
                    {item.amount > 0 ? `+$${item.amount.toFixed(2)}` : ''}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;