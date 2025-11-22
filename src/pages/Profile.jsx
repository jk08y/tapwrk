// path: src/pages/Profile.jsx
import React, { useState } from 'react';
// Fix: Adjusted relative path to point correctly to context
import { useAuth } from '../context/AuthContext';
// Fix: Adjusted relative path to point correctly to services
import { updateUserDocument } from '../services/firestore';
// Fix: Adjusted relative path to point correctly to components
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
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
// Fix: Adjusted relative path to point correctly to utils
import { cn } from '../utils/cn';

// Reusable Profile Input Component for consistency
const ProfileInput = ({ label, icon: Icon, ...props }) => (
  <div className="w-full space-y-2">
    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-ios-blue transition-colors">
        <Icon size={18} />
      </div>
      <input
        className={cn(
          "w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3.5 pl-11 text-sm font-medium text-ios-dark dark:text-white placeholder-gray-400 outline-none transition-all",
          "focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 focus:bg-white dark:focus:bg-[#0A0A0A]",
          props.disabled && "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-white/5 border-transparent"
        )}
        {...props}
      />
    </div>
  </div>
);

const Profile = () => {
  const { userProfile, refreshProfile } = useAuth();
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

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your personal information and public presence.</p>
        </div>
        {!editing && (
          <Button variant="secondary" size="sm" onClick={() => setEditing(true)} className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 shadow-sm">
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Avatar Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 text-center shadow-sm overflow-hidden relative">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              {/* Avatar */}
              <div className="relative mb-6 group cursor-pointer mx-auto w-28 h-28 sm:w-32 sm:h-32">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-[#1C1C1E] shadow-xl flex items-center justify-center">
                  {userProfile?.photoURL ? (
                    <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-gray-300 dark:text-gray-600">
                      {formData.displayName.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                {editing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <IoCameraOutline className="text-white text-2xl drop-shadow-md" />
                  </div>
                )}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-[#1C1C1E] rounded-full"></div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-ios-dark dark:text-white mb-1 tracking-tight truncate px-2">
                {userProfile?.displayName || 'User'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium truncate px-2">{userProfile?.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-ios-blue text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100 dark:border-blue-500/20">
                <IoShieldCheckmarkOutline size={14} />
                <span>Verified Earner</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Joined</p>
                  <p className="font-semibold text-ios-dark dark:text-white text-sm sm:text-base flex items-center justify-center gap-1">
                    <IoCalendarOutline className="text-gray-400" />
                    {userProfile?.createdAt?.toDate ? new Date(userProfile.createdAt.toDate()).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
                <div className="text-center border-l border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Tasks</p>
                  <p className="font-semibold text-ios-dark dark:text-white text-sm sm:text-base flex items-center justify-center gap-1">
                    <IoCheckmarkDoneOutline className="text-green-500" />
                    {userProfile?.stats?.tasksCompleted || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <motion.div layout className="lg:col-span-2">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Details Group */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-gray-800/50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-ios-blue">
                    <IoPersonOutline size={16} />
                  </div>
                  <h3 className="text-base font-bold text-ios-dark dark:text-white">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ProfileInput
                    label="Full Name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    disabled={!editing}
                    icon={IoPersonOutline}
                    placeholder="e.g. John Doe"
                  />
                  <ProfileInput
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    icon={IoMailOutline}
                  />
                </div>
              </div>

              {/* Contact Group */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-gray-800/50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-ios-green">
                    <IoGlobeOutline size={16} />
                  </div>
                  <h3 className="text-base font-bold text-ios-dark dark:text-white">Contact & Location</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    placeholder="e.g. United States"
                  />
                </div>
              </div>

              {/* Bio Group */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">
                  Bio / About Me
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!editing}
                  rows="4"
                  className={cn(
                    "w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-sm font-medium text-ios-dark dark:text-white placeholder-gray-400 outline-none transition-all resize-none",
                    "focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 focus:bg-white dark:focus:bg-[#0A0A0A]",
                    !editing && "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-white/5 border-transparent"
                  )}
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              {/* Action Buttons */}
              {editing && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 flex gap-3 border-t border-gray-100 dark:border-gray-800"
                >
                  <Button type="button" variant="secondary" onClick={() => setEditing(false)} disabled={loading} className="w-full sm:w-32">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={loading} className="flex-1 gap-2 shadow-lg shadow-blue-500/20">
                    <IoSaveOutline size={18} /> Save Changes
                  </Button>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;