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
  IoClose,
  IoSparkles,
  IoChevronForward
} from 'react-icons/io5';
import { cn } from '../../utils/cn';
import { logout } from '../../services/auth';

const Sidebar = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const mainNavItems = [
    { name: 'Dashboard', to: '/dashboard', icon: IoGridOutline, end: true },
    { name: 'Tasks', to: '/dashboard/tasks', icon: IoCheckmarkCircleOutline },
    { name: 'Earnings', to: '/dashboard/earnings', icon: IoWalletOutline },
    { name: 'Referrals', to: '/dashboard/referrals', icon: IoPeopleOutline },
  ];

  const accountNavItems = [
    { name: 'Profile', to: '/dashboard/profile', icon: IoPersonOutline },
    { name: 'Settings', to: '/dashboard/settings', icon: IoSettingsOutline },
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={() => window.innerWidth < 1024 && onClose()}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
        isActive
          ? "bg-ios-blue text-white shadow-lg shadow-blue-500/25"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      )}
    >
      {({ isActive }) => (
        <>
          {/* Icon with background */}
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
            isActive
              ? "bg-white/20"
              : "bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10"
          )}>
            <item.icon size={18} className={cn(
              "transition-transform duration-200",
              isActive ? "" : "group-hover:scale-110"
            )} />
          </div>
          <span className="flex-1">{item.name}</span>
          {/* Chevron for active item */}
          {isActive && (
            <IoChevronForward size={14} className="opacity-60" />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[280px] z-[70]",
          "bg-white dark:bg-[#0D0D0E] border-r border-gray-200/80 dark:border-gray-800/80",
          "overflow-hidden",
          "transform transition-transform duration-300 ease-out shadow-2xl lg:shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Decorative gradient orb */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-ios-blue/20 via-ios-indigo/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-40 h-40 bg-gradient-to-tl from-ios-green/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="h-full flex flex-col relative z-10">
          {/* Header Section */}
          <div className="p-5 pb-4">
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
            >
              <IoClose size={18} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-ios-blue via-ios-indigo to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                T
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white block leading-tight">Tapwrk</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ios-blue">Pro</span>
              </div>
            </Link>

            {/* User Card - Premium Style */}
            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-white/5 dark:to-white/[0.02] border border-gray-200/50 dark:border-white/10 group hover:border-ios-blue/30 dark:hover:border-ios-blue/20 transition-all duration-300">
              {/* Subtle shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

              <div className="flex items-center gap-3 relative">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-sm">
                    {userProfile?.photoURL ? (
                      <img src={userProfile.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ios-blue to-ios-indigo text-white text-sm font-bold">
                        {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-ios-green rounded-full border-2 border-white dark:border-[#0D0D0E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{userProfile?.displayName || 'User'}</p>
                  <div className="flex items-center gap-1.5">
                    <IoSparkles size={10} className="text-amber-500" />
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Level 1 Earner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 overflow-y-auto px-3 no-scrollbar">
            {/* Main Navigation */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Main Menu</p>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>

            {/* Account Navigation */}
            <div>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Account</p>
              <nav className="space-y-1">
                {accountNavItems.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-white/[0.02]">
            {/* Theme Toggle - Pill Style */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/5 transition-all group mb-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors">
                {theme === 'dark' ? (
                  <IoMoon size={16} className="text-ios-indigo" />
                ) : (
                  <IoSunny size={16} className="text-amber-500" />
                )}
              </div>
              <span className="flex-1 text-left">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              {/* Toggle indicator */}
              <div className={cn(
                "w-10 h-5 rounded-full p-0.5 transition-colors",
                theme === 'dark' ? "bg-ios-blue" : "bg-gray-300"
              )}>
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
                  theme === 'dark' ? "translate-x-5" : "translate-x-0"
                )} />
              </div>
            </button>

            {/* Sign Out */}
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                <IoLogOutOutline size={16} />
              </div>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;