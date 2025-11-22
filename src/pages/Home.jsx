// path: src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoRocketOutline, 
  IoWalletOutline, 
  IoShieldCheckmarkOutline, 
  IoCheckmarkCircle, 
  IoGlobeOutline, 
  IoPeopleOutline,
  IoStar
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

const Home = () => {
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
                <div className="absolute inset-0 bg-gray-50/50 dark:bg-[#0A0A0A] p-6 grid grid-cols-12 gap-6">
                  
                  {/* Sidebar Abstract */}
                  <div className="hidden md:block col-span-3 bg-white dark:bg-[#151516] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 space-y-3">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-ios-blue"></div>
                      <div className="h-3 w-20 bg-gray-100 dark:bg-white/10 rounded-full"></div>
                    </div>
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-8 w-full bg-gray-50 dark:bg-white/5 rounded-lg"></div>
                    ))}
                  </div>

                  {/* Main Content Abstract */}
                  <div className="col-span-12 md:col-span-9 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-32 bg-gradient-to-br from-ios-blue to-ios-indigo rounded-2xl shadow-lg shadow-blue-500/20 opacity-90"></div>
                      <div className="col-span-1 h-32 bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-2xl"></div>
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-14 w-full bg-white dark:bg-[#151516] border border-gray-100 dark:border-gray-800 rounded-xl flex items-center px-4 gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5"></div>
                          <div className="h-3 w-40 bg-gray-100 dark:bg-white/5 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Success Toast */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute bottom-8 right-8 bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl p-3 flex items-center gap-3 pr-6"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-ios-green flex items-center justify-center">
                    <IoCheckmarkCircle />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Payment Received</div>
                    <div className="text-sm font-bold text-ios-dark dark:text-white">+$42.50</div>
                  </div>
                </motion.div>
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
              className="md:row-span-2 p-8 rounded-[2rem] bg-ios-dark text-white dark:bg-white dark:text-black border border-transparent relative overflow-hidden"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center text-2xl mb-4">
                  <IoWalletOutline />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
                <p className="text-gray-400 dark:text-gray-600 text-sm mb-8">Withdraw your earnings via PayPal, Crypto, or Bank Transfer.</p>
                
                <div className="mt-auto bg-white/10 dark:bg-black/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 dark:border-black/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Available</span>
                    <span className="font-bold">$145.50</span>
                  </div>
                  <div className="h-1.5 bg-white/20 dark:bg-black/10 rounded-full overflow-hidden">
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