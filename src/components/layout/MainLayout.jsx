// path: src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav'; // Imported BottomNav

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-ios-light dark:bg-black text-ios-dark dark:text-ios-light selection:bg-ios-blue selection:text-white flex flex-col">
      <Navbar />
      
      {/* Added padding-bottom to main content so it doesn't get hidden 
        behind the mobile bottom nav 
      */}
      <main className="relative z-0 pt-24 pb-28 lg:pb-0 flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Added BottomNav here so it appears on Home/Public pages too */}
      <BottomNav />
    </div>
  );
};

export default MainLayout;