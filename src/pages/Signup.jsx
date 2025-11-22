// path: src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerWithEmail, loginWithGoogle } from '../services/auth';
import { createUserDocument } from '../services/firestore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { IoMailOutline, IoLockClosedOutline, IoLogoGoogle, IoPersonOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    
    setLoading(true);
    try {
      // 1. Create Authentication User
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      // 2. Create Firestore Document
      await createUserDocument(user.uid, {
        email: user.email,
        displayName: name || 'New User',
        authProvider: 'email'
      });

      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already in use. Try logging in.");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      
      // Check if it's a new user or existing (Firestore check handles merge if exists)
      await createUserDocument(user.uid, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        authProvider: 'google'
      });

      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Google sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ios-light dark:bg-black relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex-grow flex items-center justify-center p-4 pt-24 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="glass-strong p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-black/5 border border-white/40 dark:border-gray-700/50 backdrop-blur-xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-ios-dark dark:text-white mb-1 tracking-tight">Create Account</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start earning in minutes</p>
            </div>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              <Input 
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={IoPersonOutline}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm py-3"
              />

              <Input 
                label="Email"
                type="email"
                placeholder="name@example.com"
                icon={IoMailOutline}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm py-3"
              />
              
              <Input 
                label="Password"
                type="password"
                placeholder="Strong password"
                icon={IoLockClosedOutline}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm py-3"
              />

              <div className="pt-2">
                <Button type="submit" className="w-full shadow-lg shadow-blue-500/20 py-3 text-sm font-semibold rounded-xl" isLoading={loading}>
                  Sign Up
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700/50"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-medium"><span className="px-3 bg-white/50 dark:bg-[#1C1C1E] text-gray-400">Or</span></div>
            </div>

            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2 py-3 text-sm rounded-xl"
              onClick={handleGoogleSignup}
            >
              <IoLogoGoogle className="text-red-500" size={18} />
              <span>Google</span>
            </Button>

            <p className="text-center mt-6 text-xs text-gray-500">
              Already joined?{' '}
              <Link to="/login" className="font-bold text-ios-blue hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Signup;