// path: src/pages/Settings.jsx
import React from 'react';
// Added .jsx extension for explicit resolution
import { useTheme } from '../context/ThemeContext.jsx';
import { 
  IoMoonOutline, 
  IoSunnyOutline, 
  IoNotificationsOutline, 
  IoLockClosedOutline, 
  IoShieldCheckmarkOutline, 
  IoLogOutOutline, 
  IoTrashOutline, 
  IoChevronForward,
  IoMailOutline,
  IoLanguageOutline,
  IoHelpCircleOutline
} from 'react-icons/io5';
// Added .js extension for explicit resolution
import { logout } from '../services/auth.js';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SettingSection = ({ title, children }) => (
  <div className="mb-8">
    {title && (
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-4">
        {title}
      </h3>
    )}
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {children}
      </div>
    </div>
  </div>
);

const SettingItem = ({ 
  icon: Icon, 
  label, 
  value, 
  action, 
  color = "blue", 
  danger = false,
  toggle = false
}) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-ios-blue dark:bg-blue-900/20',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    orange: 'bg-orange-50 text-orange-500 dark:bg-orange-900/20',
    purple: 'bg-purple-50 text-purple-500 dark:bg-purple-900/20',
    red: 'bg-red-50 text-red-500 dark:bg-red-900/20',
    gray: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
  };

  return (
    <motion.div 
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      whileTap={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
      onClick={action}
      className="flex items-center justify-between p-4 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
        <span className={`font-medium text-sm ${danger ? 'text-red-500' : 'text-ios-dark dark:text-white'}`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        {value && (
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {value}
          </span>
        )}
        
        {toggle ? (
          <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-ios-green' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        ) : (
          <IoChevronForward size={18} className="text-gray-300 dark:text-gray-600" />
        )}
      </div>
    </motion.div>
  );
};

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure? This action cannot be undone.");
    if (confirmed) {
      toast.error("Account deletion requires contacting support for security.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      
      <div className="mb-8 px-2">
        <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Customize your app experience.</p>
      </div>

      <SettingSection title="Preferences">
        <SettingItem 
          icon={theme === 'dark' ? IoMoonOutline : IoSunnyOutline}
          label="Appearance"
          value={theme === 'dark' ? 'Dark' : 'Light'}
          color="purple"
          action={toggleTheme}
        />
        <SettingItem 
          icon={IoLanguageOutline}
          label="Language"
          value="English"
          color="blue"
          action={() => toast.info("Language selection coming soon")}
        />
      </SettingSection>

      <SettingSection title="Notifications & Privacy">
        <SettingItem 
          icon={IoNotificationsOutline}
          label="Push Notifications"
          value={true}
          toggle
          color="red"
          action={() => toast.info("Notifications toggled")}
        />
        <SettingItem 
          icon={IoMailOutline}
          label="Email Updates"
          value="Weekly"
          color="blue"
          action={() => toast.info("Email settings saved")}
        />
      </SettingSection>

      <SettingSection title="Security">
        <SettingItem 
          icon={IoLockClosedOutline}
          label="Change Password"
          color="green"
          action={() => toast.info("Password reset link sent to email")}
        />
        <SettingItem 
          icon={IoShieldCheckmarkOutline}
          label="Two-Factor Authentication"
          value="Off"
          color="orange"
          action={() => toast.info("2FA setup coming soon")}
        />
      </SettingSection>

      <SettingSection title="Support">
        <SettingItem 
          icon={IoHelpCircleOutline}
          label="Help Center"
          color="blue"
          action={() => window.location.href = '/dashboard/help'}
        />
      </SettingSection>

      <SettingSection>
        <SettingItem 
          icon={IoLogOutOutline}
          label="Log Out"
          color="gray"
          action={handleLogout}
        />
        <SettingItem 
          icon={IoTrashOutline}
          label="Delete Account"
          danger
          color="red"
          action={handleDeleteAccount}
        />
      </SettingSection>

      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-gray-400 font-medium">Tapwrk v1.2.0 (Build 2025.1)</p>
        <p className="text-[10px] text-gray-300 mt-1">
          Made with ♥ by{' '}
          <a 
            href="https://github.com/jk08y" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            @jk08y
          </a>
        </p>
      </div>
    </div>
  );
};

export default Settings;