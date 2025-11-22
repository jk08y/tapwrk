// path: src/components/layout/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoGrid, IoCheckmarkCircle, IoWallet, IoPerson, IoGridOutline, IoCheckmarkCircleOutline, IoWalletOutline, IoPersonOutline } from 'react-icons/io5';
import { cn } from '../../utils/cn';

const BottomNav = () => {
  const navItems = [
    { 
      name: 'Home', 
      to: '/dashboard', 
      icon: IoGridOutline, 
      activeIcon: IoGrid,
      exact: true 
    },
    { 
      name: 'Tasks', 
      to: '/dashboard/tasks', 
      icon: IoCheckmarkCircleOutline,
      activeIcon: IoCheckmarkCircle
    },
    { 
      name: 'Earnings', 
      to: '/dashboard/earnings', 
      icon: IoWalletOutline,
      activeIcon: IoWallet
    },
    { 
      name: 'Profile', 
      to: '/dashboard/profile', 
      icon: IoPersonOutline,
      activeIcon: IoPerson
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 inset-x-4 z-50 animate-float-up pointer-events-none">
      <div className="pointer-events-auto glass-strong bg-white/95 dark:bg-[#1C1C1E]/95 rounded-full shadow-2xl shadow-black/10 border border-white/20 dark:border-white/10 px-6 py-3 flex justify-between items-center max-w-xs mx-auto backdrop-blur-2xl">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative group",
              isActive ? "text-ios-blue" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            {({ isActive }) => {
              const IconComponent = isActive ? item.activeIcon : item.icon;
              return (
                <>
                  <span className={cn(
                    "transition-transform duration-300 absolute",
                    isActive ? "-translate-y-1" : "group-active:scale-90"
                  )}>
                    <IconComponent size={22} className={cn(isActive && "drop-shadow-sm")} />
                  </span>

                  {isActive && (
                    <span className="absolute bottom-2 w-1 h-1 bg-ios-blue rounded-full animate-fade-in" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;