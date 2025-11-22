// path: src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resetPassword } from '../services/auth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { IoMailOutline, IoCheckmarkCircleOutline, IoArrowBack } from 'react-icons/io5';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Reset link sent!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ios-light dark:bg-black relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 pt-24 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="glass-strong p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-black/5 border border-white/40 dark:border-gray-700/50 backdrop-blur-xl">
            {sent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoCheckmarkCircleOutline size={32} />
                </div>
                <h2 className="text-xl font-bold text-ios-dark dark:text-white mb-2">Check your mail</h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  We have sent password recovery instructions to your email.
                </p>
                <Button onClick={() => setSent(false)} variant="secondary" className="w-full py-3 text-sm rounded-xl">
                  Try another email
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-ios-dark dark:text-white mb-2 tracking-tight">Reset Password</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Enter your email and we'll send you instructions to reset your password.
                  </p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                  <Input 
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    icon={IoMailOutline}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm py-3"
                  />

                  <div className="space-y-3">
                    <Button type="submit" className="w-full py-3 text-sm font-semibold rounded-xl" isLoading={loading}>
                      Send Instructions
                    </Button>
                    <Link to="/login">
                        <Button variant="ghost" className="w-full py-2 text-sm text-gray-500">
                            <IoArrowBack className="mr-1" /> Back to Login
                        </Button>
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ForgotPassword;