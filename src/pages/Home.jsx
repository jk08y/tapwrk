// path: src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoRocketOutline, 
  IoWalletOutline, 
  IoShieldCheckmarkOutline, 
  IoCheckmarkCircle, 
  IoGlobeOutline, 
  IoPeopleOutline,
  IoStar,
  IoCloseOutline
} from 'react-icons/io5';
import Button from '../components/common/Button.jsx';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
  }
};

// --- Components ---

const StatBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full shadow-sm">
    <div className="text-ios-blue"><Icon size={14} /></div>
    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{label}</span>
  </div>
);

const TaskCard = ({ title, reward, status, icon }) => (
  <div className="h-14 w-full bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-xl flex items-center px-4 gap-4 hover:border-ios-blue/30 dark:hover:border-ios-blue/30 transition-colors">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white text-sm flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-ios-dark dark:text-white truncate">{title}</div>
      <div className="text-xs text-gray-400">{status}</div>
    </div>
    <div className="text-sm font-bold text-ios-green flex-shrink-0">${reward}</div>
  </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [notifications, setNotifications] = useState([
    { id: 1, amount: 42.50, task: 'Survey Completed', icon: '✓' },
    { id: 2, amount: 15.00, task: 'Review Posted', icon: '✓' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        setNotifications(prev => prev.slice(1));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="overflow-hidden bg-ios-light dark:bg-black min-h-screen">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] opacity-60 dark:opacity-40 animate-pulse-slow"></div>
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] opacity-60 dark:opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-safe relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-ios-blue text-[11px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-ios-blue animate-pulse"></span>
                Live in 120+ Countries
              </span>
            </motion.div>

            {/* Main Headline - Scaled down for elegance */}
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ios-dark dark:text-white leading-[1.15] mb-6">
              Micro-tasks. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-indigo">Macro earnings.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
              Join the premium workforce. Complete verified tasks from top global brands and get paid instantly via PayPal or Crypto.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 text-base shadow-lg shadow-blue-500/25">
                  Start Earning
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full h-12 text-base bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof / Stats */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-3 opacity-80">
              <StatBadge icon={IoPeopleOutline} label="50k+ Earners" />
              <StatBadge icon={IoCheckmarkCircle} label="Verified Payouts" />
              <StatBadge icon={IoStar} label="4.9/5 Rating" />
            </motion.div>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            {/* Glassmorphism Container */}
            <div className="relative rounded-t-[2.5rem] border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-2 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              
              {/* Inner Screen */}
              <div className="rounded-t-[2rem] overflow-hidden bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 shadow-inner aspect-[16/10] md:aspect-[16/7] relative">
                {/* Abstract UI */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/30 dark:from-[#0A0A0A] dark:to-[#0A0A0A] p-3 md:p-6 grid grid-cols-12 gap-3 md:gap-6">
                  
                  {/* Sidebar - Hidden on Mobile */}
                  <div className="hidden md:block col-span-3 bg-white dark:bg-[#151516] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 space-y-3">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ios-blue to-ios-indigo"></div>
                      <div className="h-3 w-20 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-full"></div>
                    </div>
                    {[
                      { label: 'Dashboard', active: true },
                      { label: 'Available' },
                      { label: 'Completed' },
                      { label: 'Earnings' }
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={`h-8 w-full rounded-lg transition-all ${
                          item.active 
                            ? 'bg-ios-blue/10 dark:bg-ios-blue/20 border border-ios-blue/30' 
                            : 'bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
                        }`}
                      ></div>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="col-span-12 md:col-span-9 space-y-3 md:space-y-6 flex flex-col">
                    {/* Header with Avatar */}
                    <div className="flex justify-between items-center flex-shrink-0">
                      <div className="space-y-1">
                        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Dashboard</div>
                        <div className="h-4 md:h-5 w-32 md:w-40 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-white/15 dark:to-white/10 rounded-full"></div>
                        <div className="h-2 md:h-3 w-24 md:w-28 bg-gray-100 dark:bg-white/5 rounded-full mt-1"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">BALANCE</div>
                        <div className="h-6 md:h-7 w-20 md:w-24 bg-gradient-to-r from-ios-blue to-ios-indigo rounded-lg mt-1"></div>
                      </div>
                    </div>

                    {/* Stats Cards Grid - Responsive */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 flex-shrink-0">
                      <div className="col-span-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-ios-blue via-ios-blue to-ios-indigo shadow-xl shadow-blue-500/20 space-y-2 md:space-y-3">
                        <div className="text-[9px] md:text-xs text-white/70 font-semibold tracking-wider">TOTAL EARNINGS</div>
                        <div className="h-6 md:h-8 w-32 md:w-40 bg-white/90 rounded-lg flex items-center px-2 md:px-3">
                          <span className="text-xs md:text-sm font-bold text-ios-blue">$1,247.50</span>
                        </div>
                        <div className="flex gap-2 pt-1 md:pt-2">
                          <div className="h-1.5 md:h-2 flex-1 bg-white/40 rounded-full"></div>
                          <div className="h-1.5 md:h-2 flex-1 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                      <div className="col-span-1 p-3 md:p-4 bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-xl md:rounded-2xl space-y-2 md:space-y-3">
                        <div className="text-[9px] md:text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wider">COMPLETED</div>
                        <div className="h-5 md:h-6 w-12 md:w-16 bg-gradient-to-r from-ios-green to-emerald-500 rounded-lg"></div>
                      </div>
                    </div>

                    {/* Tabs and Task List - Scrollable on Mobile */}
                    <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto">
                      <div className="flex gap-2 border-b border-gray-100 dark:border-gray-800 pb-2 md:pb-3 overflow-x-auto flex-shrink-0">
                        {['Available', 'In Progress', 'Completed'].map((tab, i) => (
                          <div 
                            key={i}
                            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                              i === 0
                                ? 'bg-ios-blue/10 dark:bg-ios-blue/20 text-ios-blue border border-ios-blue/30'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Task Cards - Compact on Mobile */}
                      <div className="space-y-2 md:space-y-3">
                        <div className="text-[9px] md:text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wider px-1 mb-2">AVAILABLE TASKS</div>
                        <div className="h-12 md:h-14 w-full bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-lg md:rounded-xl flex items-center px-2 md:px-4 gap-3 hover:border-ios-blue/30 dark:hover:border-ios-blue/30 transition-colors">
                          <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white text-xs md:text-sm flex-shrink-0">
                            📱
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs md:text-sm font-semibold text-ios-dark dark:text-white truncate">Product Review</div>
                            <div className="text-[10px] md:text-xs text-gray-400 truncate">5 min ago</div>
                          </div>
                          <div className="text-xs md:text-sm font-bold text-ios-green flex-shrink-0">$12.50</div>
                        </div>
                        <div className="h-12 md:h-14 w-full bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-lg md:rounded-xl flex items-center px-2 md:px-4 gap-3 hover:border-ios-blue/30 dark:hover:border-ios-blue/30 transition-colors">
                          <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white text-xs md:text-sm flex-shrink-0">
                            📝
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs md:text-sm font-semibold text-ios-dark dark:text-white truncate">Survey - Tech</div>
                            <div className="text-[10px] md:text-xs text-gray-400 truncate">12 min ago</div>
                          </div>
                          <div className="text-xs md:text-sm font-bold text-ios-green flex-shrink-0">$8.75</div>
                        </div>
                        <div className="h-12 md:h-14 w-full bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-lg md:rounded-xl flex items-center px-2 md:px-4 gap-3 hover:border-ios-blue/30 dark:hover:border-ios-blue/30 transition-colors">
                          <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white text-xs md:text-sm flex-shrink-0">
                            ✓
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs md:text-sm font-semibold text-ios-dark dark:text-white truncate">Moderation</div>
                            <div className="text-[10px] md:text-xs text-gray-400 truncate">28 min ago</div>
                          </div>
                          <div className="text-xs md:text-sm font-bold text-ios-green flex-shrink-0">$15.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Notifications */}
                <div className="absolute bottom-8 right-8 space-y-3 max-w-xs">
                  {notifications.map((notif) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ y: 20, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl p-3 flex items-center gap-3 backdrop-blur-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-ios-green flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{notif.task}</div>
                        <div className="text-sm font-bold text-ios-green">+${notif.amount.toFixed(2)}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== BENTO GRID FEATURES ==================== */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="container-safe">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-ios-dark dark:text-white mb-4">Earn on your terms</h2>
            <p className="text-gray-500 dark:text-gray-400">We've streamlined the micro-tasking experience. No fluff, just earnings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            {/* Feature 1: Large */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-2 p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-ios-blue flex items-center justify-center text-2xl mb-4">
                  <IoRocketOutline />
                </div>
                <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-2">Instant Access</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">No interviews. No waiting lists. Sign up and start your first task in under 2 minutes.</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
            </motion.div>

            {/* Feature 2: Tall */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:row-span-2 p-8 rounded-[2rem] bg-white dark:bg-ios-dark text-ios-dark dark:text-white border border-transparent relative overflow-hidden"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl mb-4">
                  <IoWalletOutline />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">Withdraw your earnings via PayPal, Crypto, or Bank Transfer.</p>
                
                <div className="mt-auto bg-gray-100 dark:bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-gray-200 dark:border-white/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70 text-gray-700 dark:text-gray-300">Available</span>
                    <span className="font-bold text-ios-dark dark:text-white">$145.50</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-ios-green rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Standard */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/20 text-ios-green flex items-center justify-center text-2xl mb-4">
                <IoShieldCheckmarkOutline />
              </div>
              <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-2">Verified Tasks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Every task is vetted for safety and quality assurance.</p>
            </motion.div>

            {/* Feature 4: Standard */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center text-2xl mb-4">
                <IoGlobeOutline />
              </div>
              <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-2">Work Anywhere</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Accessible from 120+ countries on any device.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-24 px-4">
        <div className="container-safe">
          <div className="relative rounded-[3rem] overflow-hidden bg-ios-blue p-8 md:p-16 text-center shadow-2xl shadow-blue-900/20">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Start earning today.</h2>
              <p className="text-blue-100 text-lg mb-8">
                Join the community of smart earners who are turning their spare time into real income.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/signup">
                  <button className="px-8 py-4 rounded-full bg-white text-ios-blue font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors active:scale-95">
                    Create Free Account
                  </button>
                </Link>
              </div>
              <p className="mt-6 text-xs text-blue-200/80">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;