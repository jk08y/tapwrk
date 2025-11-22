// path: src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserDocument } from '../services/firestore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoGlobeOutline, IoCameraOutline, IoSaveOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
  const { userProfile, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
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
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar Card */}
        <div className="md:col-span-1">
          <div className="ios-card p-6 flex flex-col items-center text-center sticky top-24">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-[#1C1C1E] shadow-lg">
                {userProfile?.photoURL ? (
                  <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {formData.displayName.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              {editing && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <IoCameraOutline className="text-white text-2xl" />
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-ios-dark dark:text-white mb-1">
              {userProfile?.displayName || 'User'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{userProfile?.email}</p>
            
            <div className="w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-ios-blue text-sm font-bold mb-6">
              Level 1 Earner
            </div>

            <div className="w-full grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 uppercase">Joined</p>
                <p className="font-semibold text-ios-dark dark:text-white">
                    {userProfile?.createdAt?.toDate ? new Date(userProfile.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Tasks</p>
                <p className="font-semibold text-ios-dark dark:text-white">{userProfile?.stats?.tasksCompleted || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <motion.div 
          layout
          className="md:col-span-2"
        >
          <div className="ios-card p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-ios-dark dark:text-white">Personal Information</h3>
              {!editing && (
                <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                  Edit Details
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={IoPersonOutline}
                />
                <Input
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true} // Email usually not editable directly
                  icon={IoMailOutline}
                  className="opacity-75 cursor-not-allowed"
                />
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={IoCallOutline}
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={IoGlobeOutline}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ios-gray dark:text-gray-400 ml-1">
                  Bio / About Me
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!editing}
                  rows="4"
                  className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3.5 text-ios-dark dark:text-white placeholder-gray-400 focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20 transition-all disabled:opacity-70 disabled:bg-gray-50 dark:disabled:bg-white/5"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              {editing && (
                <div className="flex gap-4 pt-4 animate-fade-in">
                  <Button type="button" variant="secondary" onClick={() => setEditing(false)} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={loading} className="gap-2">
                    <IoSaveOutline size={18} /> Save Changes
                  </Button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;