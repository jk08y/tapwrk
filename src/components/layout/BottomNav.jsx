// path: src/components/layout/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoGridOutline, IoCheckmarkCircleOutline, IoWalletOutline, IoPersonOutline } from 'react-icons/io5';
import { cn } from '../../utils/cn';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', to: '/dashboard', icon: IoGridOutline, exact: true },
    { name: 'Tasks', to: '/dashboard/tasks', icon: IoCheckmarkCircleOutline },
    { name: 'Earnings', to: '/dashboard/earnings', icon: IoWalletOutline },
    { name: 'Profile', to: '/dashboard/profile', icon: IoPersonOutline },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 inset-x-4 z-50 animate-float-up pointer-events-none">
      <div className="pointer-events-auto glass-strong bg-gray-400/80 dark:bg-gray-500/80 rounded-full shadow-2xl shadow-black/10 border border-white/20 dark:border-white/10 px-6 py-3 flex justify-between items-center max-w-xs mx-auto backdrop-blur-2xl">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative group",
              isActive ? "text-white" : "text-white/60 hover:text-white/80"
            )}
          >
            {({ isActive }) => (
              <>
                <span className={cn(
                  "transition-transform duration-300 absolute",
                  isActive ? "-translate-y-1" : "group-active:scale-90"
                )}>
                  <item.icon size={22} className={cn(isActive && "drop-shadow-sm")} />
                </span>

                {isActive && (
                  <span className="absolute bottom-2 w-1 h-1 bg-white rounded-full animate-fade-in" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;