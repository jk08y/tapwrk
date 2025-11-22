// path: src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { loginWithEmail, loginWithGoogle } from '../services/auth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { IoMailOutline, IoLockClosedOutline, IoLogoGoogle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Welcome back!");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome back!");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ios-light dark:bg-black relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 rounded-full blur-[100px]" />
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
              <div className="w-14 h-14 bg-gradient-to-tr from-ios-blue to-ios-indigo rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-4">
                T
              </div>
              <h1 className="text-2xl font-bold text-ios-dark dark:text-white mb-1 tracking-tight">Welcome Back</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your dashboard</p>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <Input 
                label="Email"
                type="email"
                placeholder="name@example.com"
                icon={IoMailOutline}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm py-3"
              />
              
              <div>
                <Input 
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={IoLockClosedOutline}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm py-3"
                />
                <div className="flex justify-end mt-1.5">
                  <Link to="/forgot-password" class="text-[11px] font-semibold text-ios-blue hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full shadow-lg shadow-blue-500/20 py-3 text-sm font-semibold rounded-xl" isLoading={loading}>
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700/50"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-medium"><span className="px-3 bg-white/50 dark:bg-[#1C1C1E] text-gray-400">Or</span></div>
            </div>

            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2 py-3 text-sm rounded-xl"
              onClick={handleGoogleLogin}
            >
              <IoLogoGoogle className="text-red-500" size={18} />
              <span>Google</span>
            </Button>

            <p className="text-center mt-6 text-xs text-gray-500">
              New to Tapwrk?{' '}
              <Link to="/signup" className="font-bold text-ios-blue hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Login;