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
    <div className="lg:hidden fixed bottom-6 inset-x-4 z-[60] animate-float-up pointer-events-none">
      {/* Added z-[60] to ensure it sits above other content but below modal overlays if needed.
        Enhanced shadow and border for better visibility.
      */}
      <div className="pointer-events-auto glass-strong bg-white/95 dark:bg-[#151516]/95 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/10 px-2 py-2 flex justify-between items-center max-w-xs mx-auto backdrop-blur-3xl">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 relative group",
              isActive ? "text-white" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            {({ isActive }) => (
              <>
                {/* Active Background Indicator */}
                {isActive && (
                  <span className="absolute inset-0 bg-ios-blue rounded-full shadow-lg shadow-blue-500/30 scale-100 transition-transform duration-300" />
                )}

                {/* Icon */}
                <span className={cn(
                  "relative z-10 transition-transform duration-300",
                  isActive ? "scale-110" : "group-active:scale-90"
                )}>
                  <item.icon size={24} className={cn(isActive && "drop-shadow-sm")} />
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;