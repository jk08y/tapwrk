// path: src/components/layout/AnimatedRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layouts
import MainLayout from './MainLayout';
import DashboardLayout from './DashboardLayout';

// Components
import Loader from '../common/Loader';
import ProtectedRoute from '../auth/ProtectedRoute';

// Lazy Load Pages
const Home = lazy(() => import('../../pages/Home'));
const Login = lazy(() => import('../../pages/Login'));
const Signup = lazy(() => import('../../pages/Signup'));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Tasks = lazy(() => import('../../pages/Tasks'));
const Earnings = lazy(() => import('../../pages/Earnings'));
const Referrals = lazy(() => import('../../pages/Referrals'));
const Profile = lazy(() => import('../../pages/Profile'));
const Settings = lazy(() => import('../../pages/Settings'));
const Support = lazy(() => import('../../pages/Support'));

// Animation wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="tasks" element={<PageWrapper><Tasks /></PageWrapper>} />
            <Route path="earnings" element={<PageWrapper><Earnings /></PageWrapper>} />
            <Route path="referrals" element={<PageWrapper><Referrals /></PageWrapper>} />
            <Route path="profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="settings" element={<PageWrapper><Settings /></PageWrapper>} />
            <Route path="help" element={<PageWrapper><Support /></PageWrapper>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;