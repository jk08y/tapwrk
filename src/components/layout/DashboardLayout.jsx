// path: src/components/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { IoMenu, IoPersonCircleOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { userProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ios-light dark:bg-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-72 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-ios-dark dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 active:scale-95 transition-all"
                >
                    <IoMenu size={22} />
                </button>
                
                {/* Logo & Label - Ensuring high visibility */}
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-gray-800">
                    <img 
                      src="/logo.png" 
                      alt="Tapwrk" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback */}
                    <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-ios-blue to-ios-indigo text-white text-xs font-bold">T</div>
                  </div>
                  <span className="font-bold text-lg tracking-tight text-ios-dark dark:text-white">Tapwrk</span>
                </Link>
            </div>

            {/* Right Icons - Clickable Profile */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-95">
                <IoNotificationsOutline size={22} />
              </button>
              
              <Link to="/dashboard/profile">
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600 active:scale-95 transition-transform shadow-sm">
                  {userProfile?.photoURL ? (
                    <img src={userProfile.photoURL} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ios-blue to-ios-indigo text-white text-xs font-bold">
                      {userProfile?.displayName?.charAt(0).toUpperCase() || <IoPersonCircleOutline size={24} />}
                    </div>
                  )}
                </div>
              </Link>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-28 lg:p-8 lg:pb-8 max-w-7xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;