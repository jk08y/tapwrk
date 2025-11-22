// path: src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  IoGridOutline, 
  IoCheckmarkCircleOutline, 
  IoWalletOutline, 
  IoPeopleOutline, 
  IoPersonOutline, 
  IoSettingsOutline,
  IoLogOutOutline,
  IoMoon, 
  IoSunny,
  IoClose 
} from 'react-icons/io5';
import { cn } from '../../utils/cn';
import { logout } from '../../services/auth';

const Sidebar = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: IoGridOutline },
    { name: 'Tasks', to: '/dashboard/tasks', icon: IoCheckmarkCircleOutline },
    { name: 'Earnings', to: '/dashboard/earnings', icon: IoWalletOutline },
    { name: 'Referrals', to: '/dashboard/referrals', icon: IoPeopleOutline },
    { name: 'Profile', to: '/dashboard/profile', icon: IoPersonOutline },
    { name: 'Settings', to: '/dashboard/settings', icon: IoSettingsOutline },
  ];

  return (
    <>
      {/* Mobile Overlay - Increased z-index to cover BottomNav (z-50) */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container - Increased z-index to sit ABOVE the overlay */}
      <aside 
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-ios-cardLight dark:bg-[#151516] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6 relative">
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <IoClose size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-10 px-2 mt-2 lg:mt-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white font-bold text-xl shadow-glow">
              T
            </div>
            <span className="font-bold text-2xl tracking-tight dark:text-white">Tapwrk</span>
          </Link>

          {/* User Card (Compact) */}
          <div className="mb-8 p-4 rounded-2xl bg-ios-light dark:bg-white/5 flex items-center gap-3 border border-transparent dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {/* Placeholder or User Image */}
              {userProfile?.photoURL ? (
                <img src={userProfile.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
                  {userProfile?.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate dark:text-white">{userProfile?.displayName || 'User'}</p>
              <p className="text-xs text-ios-blue font-medium truncate">Level 1 Earner</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-ios-blue text-white shadow-lg shadow-blue-500/20" 
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                )}
              >
                <item.icon size={22} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <IoMoon size={20} /> : <IoSunny size={20} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            <button 
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <IoLogOutOutline size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;