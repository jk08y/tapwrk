// path: src/pages/Tasks.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoFilterOutline, IoClose, IoTimeOutline, IoWalletOutline } from 'react-icons/io5';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import TaskCard from '../components/tasks/TaskCard';
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
    // Here you would typically navigate to a task execution page or open a new window
    setSelectedTask(null);
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ios-dark dark:text-white tracking-tight">Available Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Complete tasks to earn real money.</p>
        </div>
        <div className="w-full md:w-auto min-w-[300px]">
          <Input 
            icon={IoSearchOutline} 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-[#1C1C1E] border-none shadow-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-ios-blue text-white shadow-lg shadow-blue-500/25" 
                : "bg-white dark:bg-[#1C1C1E] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <motion.div layout className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onStart={() => handleStartTask(task)} />
          ))}
        </AnimatePresence>
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoFilterOutline size={30} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </motion.div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center px-4 pb-4 md:pb-0">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-[#1C1C1E] rounded-[2.5rem] shadow-2xl p-6 md:p-8 z-10 no-scrollbar"
            >
              <button 
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <IoClose size={20} />
              </button>

              <div className="mb-6 mt-2">
                <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-ios-blue text-xs font-bold uppercase tracking-wider">
                  {selectedTask.category}
                </span>
                <h2 className="text-2xl font-bold text-ios-dark dark:text-white mt-3 mb-2 leading-tight">
                  {selectedTask.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <IoTimeOutline size={16} /> {selectedTask.timeEstimate}
                  </span>
                  <span className="flex items-center gap-1.5 text-ios-green">
                    <IoWalletOutline size={16} /> ${selectedTask.reward.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <h3 className="font-semibold text-ios-dark dark:text-white mb-2">Description</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {selectedTask.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-ios-dark dark:text-white mb-2">Steps to Complete</h3>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-white/10 text-ios-blue flex items-center justify-center font-bold text-xs shadow-sm">1</span>
                      <p>Click the "Start Now" button below to open the task link.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-white/10 text-ios-blue flex items-center justify-center font-bold text-xs shadow-sm">2</span>
                      <p>Perform the required action (like, comment, or survey) accurately.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-white/10 text-ios-blue flex items-center justify-center font-bold text-xs shadow-sm">3</span>
                      <p>Return to Tapwrk and confirm completion. Funds are held pending verification.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                  <p className="text-xs text-orange-700 dark:text-orange-400 font-medium leading-relaxed">
                    ⚠️ Do not use VPNs, proxies, or automated bots. This will lead to immediate account suspension and forfeiture of earnings.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="secondary" onClick={() => setSelectedTask(null)} className="w-full sm:flex-1 order-2 sm:order-1">
                  Cancel
                </Button>
                <Button onClick={confirmStart} className="w-full sm:flex-1 order-1 sm:order-2 shadow-lg shadow-blue-500/20">
                  Start Now
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