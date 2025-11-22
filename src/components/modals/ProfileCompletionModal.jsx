// path: src/components/modals/ProfileCompletionModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAuth } from '../../context/AuthContext';
import { updateUserDocument } from '../../services/firestore';
import Button from '../common/Button';
import Input from '../common/Input';
import { IoPerson, IoGlobeOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { cn } from '../../utils/cn';

const steps = [
  { id: 1, title: "Contact Info" },
  { id: 2, title: "Personal Details" }
];

const ProfileCompletionModal = ({ isOpen, onComplete }) => {
  const { currentUser, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [country, setCountry] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!phone || phone.length < 10) {
        toast.error("Please enter a valid phone number.");
        return;
      }
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullName.trim() || !country.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Update Firestore with new details and set onboardingCompleted to true
      await updateUserDocument(currentUser.uid, {
        phoneNumber: phone,
        displayName: fullName,
        country: country,
        onboardingCompleted: true,
        updatedAt: new Date()
      });

      // Refresh local state to reflect changes
      await refreshProfile();
      
      toast.success("Profile completed successfully!");
      if (onComplete) onComplete();
      
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop with heavy blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl transition-opacity" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700"
      >
        {/* Header with Progress */}
        <div className="px-8 pt-8 pb-6 bg-ios-light dark:bg-black/50 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-ios-dark dark:text-white text-center mb-2">
            Complete Your Profile
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Step {step} of 2: {steps[step - 1].title}
          </p>
          
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-ios-blue"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode='wait'>
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-ios-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoGlobeOutline size={32} />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">Phone Verification</h3>
                  <p className="text-gray-500 text-sm">We need your phone number for account security and payment verification.</p>
                </div>

                {/* Phone Input Override Styles for Dark Mode */}
                <div className="phone-input-container">
                  <label className="block text-sm font-medium text-ios-gray dark:text-gray-400 ml-1 mb-2">
                    Mobile Number
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={phone}
                    onChange={setPhone}
                    className="ios-input-phone"
                  />
                </div>

                <Button onClick={handleNext} className="w-full mt-4">
                  Next Step
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                 <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-ios-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoPerson size={32} />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">Almost There</h3>
                  <p className="text-gray-500 text-sm">Confirm your details to start earning.</p>
                </div>

                <Input 
                  label="Full Name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  icon={IoPerson}
                />

                <Input 
                  label="Country of Residence"
                  placeholder="United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  icon={IoGlobeOutline}
                />

                <div className="flex gap-3 mt-6">
                  <Button variant="secondary" onClick={handleBack} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    isLoading={loading} 
                    className="flex-1"
                  >
                    Complete Setup
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Inject Custom Styles for Phone Input */}
      <style>{`
        .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          font-size: 1rem;
          color: inherit;
          padding-left: 12px;
          height: 100%;
        }
        .ios-input-phone {
          display: flex;
          align-items: center;
          width: 100%;
          background-color: var(--bg-card, #fff);
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 12px 16px;
          transition: all 0.2s;
        }
        .dark .ios-input-phone {
          background-color: #1C1C1E;
          border-color: #374151;
          color: white;
        }
        .ios-input-phone:focus-within {
          border-color: #007AFF;
          box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ProfileCompletionModal;