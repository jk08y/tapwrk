// path: src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserDocument } from '../services/firestore';
import Button from '../components/common/Button';
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoGlobeOutline,
  IoCameraOutline,
  IoSaveOutline,
  IoCalendarOutline,
  IoCheckmarkDoneOutline,
  IoShieldCheckmarkOutline,
  IoTrophyOutline,
  IoWalletOutline,
  IoSettingsOutline,
  IoChevronForward,
  IoLogOutOutline
} from 'react-icons/io5';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

// Compact Profile Input Component
const ProfileInput = ({ label, icon: Icon, ...props }) => (
  <div className="w-full space-y-1.5 sm:space-y-2">
    <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-ios-blue transition-colors">
        <Icon size={16} />
      </div>
      <input
        className={cn(
          "w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 text-sm font-medium text-ios-dark dark:text-white placeholder-gray-400 outline-none transition-all",
          "focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 focus:bg-white dark:focus:bg-[#0A0A0A]",
          props.disabled && "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-white/5 border-transparent"
        )}
        {...props}
      />
    </div>
  </div>
);

// Menu Item Component
const MenuItem = ({ icon: Icon, label, value, onClick, danger }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all touch-manipulation active:scale-[0.98]",
      danger
        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
        : "text-ios-dark dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
    )}
  >
    <div className={cn(
      "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0",
      danger ? "bg-red-50 dark:bg-red-900/20 text-red-500" : "bg-gray-100 dark:bg-white/10"
    )}>
      <Icon size={18} />
    </div>
    <div className="flex-1 text-left">
      <p className="text-sm sm:text-base font-semibold">{label}</p>
      {value && <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{value}</p>}
    </div>
    <IoChevronForward className="text-gray-300 dark:text-gray-600" size={18} />
  </button>
);

const Profile = () => {
  const { userProfile, refreshProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    email: userProfile?.email || '',
    phoneNumber: userProfile?.phoneNumber || '',
    country: userProfile?.country || '',
    bio: userProfile?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserDocument(userProfile.uid, formData);
      await refreshProfile();
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto pb-24 sm:pb-10 px-4 sm:px-0">

      {/* Header */}
      <div className="pt-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Profile</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Manage your account and settings.</p>
      </div>

      {/* Profile Card - Compact Header Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
      >
        {/* Cover Gradient */}
        <div className="h-20 sm:h-24 bg-gradient-to-br from-ios-blue via-blue-500 to-indigo-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-50" />
        </div>

        <div className="px-4 sm:px-6 pb-5 sm:pb-6 -mt-10 sm:-mt-12 relative z-10">
          {/* Avatar */}
          <div className="flex items-end gap-3 sm:gap-4 mb-4">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1C1C1E] p-1 shadow-lg">
                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                  {userProfile?.photoURL ? (
                    <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-600">
                      {formData.displayName.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
              </div>
              {editing && (
                <button className="absolute inset-0 m-1 rounded-xl sm:rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm touch-manipulation">
                  <IoCameraOutline className="text-white" size={20} />
                </button>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6 bg-ios-green border-2 sm:border-[3px] border-white dark:border-[#1C1C1E] rounded-full" />
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <h2 className="text-lg sm:text-xl font-bold text-ios-dark dark:text-white truncate">
                {userProfile?.displayName || 'User'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{userProfile?.email}</p>
            </div>

            {!editing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditing(true)}
                className="bg-gray-100 dark:bg-white/10 border-none h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm rounded-full shrink-0"
              >
                Edit
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-gray-50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-ios-green mb-1">
                <IoCheckmarkDoneOutline size={14} />
              </div>
              <p className="text-base sm:text-lg font-bold text-ios-dark dark:text-white">{userProfile?.stats?.tasksCompleted || 0}</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">Tasks</p>
            </div>
            <div className="bg-gray-50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-ios-blue mb-1">
                <IoWalletOutline size={14} />
              </div>
              <p className="text-base sm:text-lg font-bold text-ios-dark dark:text-white">$145</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">Earned</p>
            </div>
            <div className="bg-gray-50 dark:bg-black/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-ios-indigo mb-1">
                <IoTrophyOutline size={14} />
              </div>
              <p className="text-base sm:text-lg font-bold text-ios-dark dark:text-white">#4.2K</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">Rank</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Form (Expandable) */}
      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <IoPersonOutline className="text-ios-blue" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-ios-dark dark:text-white">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <ProfileInput
                label="Full Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                disabled={!editing}
                icon={IoPersonOutline}
                placeholder="John Doe"
              />
              <ProfileInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={true}
                icon={IoMailOutline}
              />
              <ProfileInput
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!editing}
                icon={IoCallOutline}
                placeholder="+1 (555) 000-0000"
              />
              <ProfileInput
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!editing}
                icon={IoGlobeOutline}
                placeholder="United States"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!editing}
                rows="3"
                className={cn(
                  "w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-medium text-ios-dark dark:text-white placeholder-gray-400 outline-none transition-all resize-none",
                  "focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 focus:bg-white dark:focus:bg-[#0A0A0A]"
                )}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(false)}
                disabled={loading}
                className="flex-1 h-10 sm:h-11 rounded-full bg-gray-100 dark:bg-white/10 border-none text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
                className="flex-[2] h-10 sm:h-11 gap-1.5 shadow-lg shadow-blue-500/20 rounded-full text-xs sm:text-sm"
              >
                <IoSaveOutline size={16} /> Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Account Settings Menu */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm sm:text-base font-bold text-ios-dark dark:text-white">Account</h3>
        </div>

        <div className="p-2 sm:p-3 space-y-1">
          <MenuItem
            icon={IoShieldCheckmarkOutline}
            label="Verification Status"
            value="Verified Earner"
          />
          <MenuItem
            icon={IoCalendarOutline}
            label="Member Since"
            value={userProfile?.createdAt?.toDate ? new Date(userProfile.createdAt.toDate()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'N/A'}
          />
          <MenuItem
            icon={IoSettingsOutline}
            label="Settings"
          />
        </div>

        <div className="p-2 sm:p-3 pt-0 border-t border-gray-100 dark:border-gray-800 mt-1">
          <MenuItem
            icon={IoLogOutOutline}
            label="Log Out"
            danger
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;