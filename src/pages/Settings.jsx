// path: src/pages/Settings.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IoMoonOutline, IoSunnyOutline, IoNotificationsOutline, IoLockClosedOutline, IoShieldCheckmarkOutline, IoLogOutOutline, IoTrashOutline, IoChevronForward } from 'react-icons/io5';
import { logout } from '../services/auth';
import { toast } from 'react-toastify';

const SettingSection = ({ title, children }) => (
  <div className="ios-card mb-6 overflow-hidden p-0">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5">
      <h3 className="font-bold text-ios-dark dark:text-white">{title}</h3>
    </div>
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {children}
    </div>
  </div>
);

const SettingItem = ({ icon: Icon, label, value, action, danger = false }) => (
  <div 
    onClick={action}
    className={`flex items-center justify-between p-5 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${danger ? 'text-red-500' : 'text-ios-dark dark:text-gray-200'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-100 text-red-500 dark:bg-red-900/20' : 'bg-blue-50 text-ios-blue dark:bg-blue-900/20'}`}>
        <Icon size={20} />
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-3 text-gray-400">
      {value && <span className="text-sm">{value}</span>}
      <IoChevronForward size={18} />
    </div>
  </div>
);

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    // Redirect handled by AuthContext/Router
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure? This action cannot be undone.");
    if (confirmed) {
      toast.error("Account deletion requires contacting support for security.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Settings</h1>

      <SettingSection title="Appearance">
        <SettingItem 
          icon={theme === 'dark' ? IoMoonOutline : IoSunnyOutline}
          label="Theme"
          value={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          action={toggleTheme}
        />
      </SettingSection>

      <SettingSection title="Notifications">
        <SettingItem 
          icon={IoNotificationsOutline}
          label="Push Notifications"
          value="On"
          action={() => toast.info("Notifications settings saved")}
        />
        <SettingItem 
          icon={IoMailOutline}
          label="Email Updates"
          value="Weekly Digest"
          action={() => toast.info("Email settings saved")}
        />
      </SettingSection>

      <SettingSection title="Security">
        <SettingItem 
          icon={IoLockClosedOutline}
          label="Change Password"
          action={() => toast.info("Password reset link sent to email")}
        />
        <SettingItem 
          icon={IoShieldCheckmarkOutline}
          label="Two-Factor Authentication"
          value="Disabled"
          action={() => toast.info("2FA setup coming soon")}
        />
      </SettingSection>

      <SettingSection title="Account Actions">
        <SettingItem 
          icon={IoLogOutOutline}
          label="Log Out"
          action={handleLogout}
        />
        <SettingItem 
          icon={IoTrashOutline}
          label="Delete Account"
          danger
          action={handleDeleteAccount}
        />
      </SettingSection>

      <p className="text-center text-xs text-gray-400 pt-4">
        Tapwrk Version 1.0.0 (Build 2025.1)
      </p>
    </div>
  );
};

// Import IoMailOutline for the component above
import { IoMailOutline } from 'react-icons/io5';

export default Settings;