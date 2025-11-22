// path: src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const Navbar = () => {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null; // Dashboard has its own layout

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-4 sm:p-6">
      <nav 
        className={cn(
          'pointer-events-auto w-full max-w-6xl flex items-center justify-between',
          'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)',
          // Base Shape & Border
          'rounded-full border backdrop-blur-xl',
          // Dynamic Styling based on scroll
          scrolled 
            ? 'py-2.5 px-4 bg-white/90 dark:bg-[#1C1C1E]/90 border-gray-200/50 dark:border-white/10 shadow-lg shadow-black/5' 
            : 'py-3 px-5 bg-white/60 dark:bg-[#1C1C1E]/60 border-white/20 dark:border-white/5 shadow-ios-float'
        )}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2.5 group select-none">
          <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 border border-white/10">
             <img src="/logo.png" alt="Tapwrk" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
             {/* Fallback Logo */}
             <div className="absolute inset-0 bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white font-bold text-sm">T</div>
          </div>
          <span className="font-bold text-lg tracking-tight text-ios-dark dark:text-white hidden sm:block">Tapwrk</span>
        </Link>
        
        {/* Desktop Navigation - Centered Pill */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center p-1.5 rounded-full bg-gray-100/80 dark:bg-white/10 border border-white/50 dark:border-white/5 backdrop-blur-md">
            {['Features', 'How it Works', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-5 py-1.5 text-xs font-semibold rounded-full text-gray-600 dark:text-gray-300 hover:text-ios-dark hover:bg-white dark:hover:text-white dark:hover:bg-white/10 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-ios-dark dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <IoMoon size={20} /> : <IoSunny size={20} />}
          </button>

          {currentUser ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm" className="px-5 h-10 text-xs font-bold shadow-lg shadow-blue-500/30 rounded-full">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-ios-blue transition-colors">
                Log In
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="px-5 h-10 text-xs font-bold shadow-lg shadow-blue-500/30 rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;