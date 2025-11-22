// path: src/components/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { IoMenu } from 'react-icons/io5';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ios-light dark:bg-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-72 min-h-screen flex flex-col">
        {/* Mobile Header - Updated for rounder aesthetics */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-ios-dark dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 active:scale-95 transition-all"
                >
                    <IoMenu size={22} />
                </button>
                <span className="font-bold text-lg tracking-tight dark:text-white">Tapwrk</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo shadow-inner border-2 border-white dark:border-black"></div>
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