// path: src/pages/Tasks.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoSearchOutline,
  IoFilterOutline,
  IoClose,
  IoTimeOutline,
  IoWalletOutline,
  IoCheckmarkCircle,
  IoWarningOutline,
  IoOpenOutline
} from 'react-icons/io5';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import TaskCard from '../components/tasks/TaskCard.jsx';
import { toast } from 'react-toastify';

// Mock Data
const TASKS_DATA = [
  { id: 1, title: "Like & Comment on Instagram Post", description: "Engage with the latest post from @tech_daily. Authentic comments only.", reward: 0.15, timeEstimate: "30s", category: "Social", platform: "instagram", hot: true },
  { id: 2, title: "Watch YouTube Video (3 mins)", description: "Watch the full video about AI trends and leave a like.", reward: 0.40, timeEstimate: "3m", category: "Social", platform: "youtube", hot: false },
  { id: 3, title: "Product Usage Survey", description: "Complete a detailed survey about your daily app usage habits.", reward: 1.50, timeEstimate: "5m", category: "Survey", type: "survey", hot: true },
  { id: 4, title: "AI Image Classification", description: "Identify objects in 10 different images to train our AI model.", reward: 0.75, timeEstimate: "2m", category: "AI Task", type: "ai", hot: false },
  { id: 5, title: "Follow TikTok Account", description: "Follow the creator and like their pinned video.", reward: 0.10, timeEstimate: "15s", category: "Social", platform: "tiktok", hot: false },
];

const CATEGORIES = ["All", "Social", "Survey", "AI Task"];

const Tasks = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = TASKS_DATA.filter(task => {
    const matchesCategory = activeCategory === "All" || task.category === activeCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartTask = (task) => {
    setSelectedTask(task);
  };

  const confirmStart = () => {
    toast.info(`Starting task: ${selectedTask.title}`);
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24 sm:pb-10 px-4 sm:px-0">

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Available Tasks</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Complete verified tasks to earn real money.</p>
        </div>

        <div className="w-full md:w-[320px] relative">
          <Input
            icon={IoSearchOutline}
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-[#1C1C1E] border-gray-200 dark:border-gray-800 shadow-sm h-11 sm:h-12 rounded-xl sm:rounded-2xl text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar mask-fade-right -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border touch-manipulation ${activeCategory === cat
                ? "bg-ios-blue border-ios-blue text-white shadow-lg shadow-blue-500/25"
                : "bg-white dark:bg-[#1C1C1E] border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <motion.div layout className="grid grid-cols-1 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onStart={() => handleStartTask(task)} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white dark:bg-[#1C1C1E] rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-800"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <IoFilterOutline size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No tasks found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Premium Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-0 sm:px-4 pb-0 sm:pb-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-white dark:bg-[#151516] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl z-10 no-scrollbar flex flex-col"
            >
              {/* Mobile Drag Handle */}
              <div className="sm:hidden w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-3 mb-1"></div>

              {/* Sticky Header */}
              <div className="sticky top-0 z-20 bg-white/80 dark:bg-[#151516]/80 backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-ios-blue animate-pulse"></span>
                  Task Details
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors touch-manipulation active:scale-95"
                >
                  <IoClose size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                {/* Title & Reward */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-ios-dark dark:text-white leading-tight">
                      {selectedTask.title}
                    </h2>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 shrink-0">
                      <div className="text-xl sm:text-2xl font-bold text-ios-green">${selectedTask.reward.toFixed(2)}</div>
                      <div className="text-xs text-gray-400 font-medium sm:mt-1">Reward</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      <IoTimeOutline /> {selectedTask.timeEstimate}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/10 text-xs font-semibold text-ios-blue">
                      {selectedTask.category}
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-gray-800"></div>

                {/* Steps */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Instructions</h3>

                  <div className="space-y-3 sm:space-y-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[13px] sm:left-[15px] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ios-blue text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 shrink-0">1</div>
                      <div className="pt-1 sm:pt-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">Open Task Link</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Click the button below to visit the target page.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-ios-blue text-ios-blue flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">2</div>
                      <div className="pt-1 sm:pt-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">Complete Action</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {selectedTask.description} Perform the action accurately and authentically.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">3</div>
                      <div className="pt-1 sm:pt-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">Verify & Earn</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Return here to confirm completion. Funds are credited after a quick check.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl sm:rounded-2xl border border-orange-100 dark:border-orange-900/30 flex gap-2 sm:gap-3">
                  <IoWarningOutline className="text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-[11px] sm:text-xs text-orange-800 dark:text-orange-400 font-medium leading-relaxed">
                    Do not use VPNs, proxies, or automated bots. Fraudulent attempts will result in an immediate ban.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6 bg-white dark:bg-[#151516] border-t border-gray-100 dark:border-gray-800 flex gap-2 sm:gap-3">
                <Button variant="secondary" onClick={() => setSelectedTask(null)} className="flex-1 bg-gray-100 dark:bg-white/5 border-none h-11 sm:h-auto text-sm sm:text-base touch-manipulation active:scale-95">
                  Cancel
                </Button>
                <Button onClick={confirmStart} className="flex-[2] shadow-xl shadow-blue-500/20 gap-2 h-11 sm:h-auto text-sm sm:text-base touch-manipulation active:scale-95">
                  Start Task <IoOpenOutline />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;