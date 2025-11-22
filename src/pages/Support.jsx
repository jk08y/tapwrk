// path: src/pages/Support.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearchOutline, IoChatbubbleEllipsesOutline, IoWalletOutline, IoShieldCheckmarkOutline, IoHardwareChipOutline, IoSend } from 'react-icons/io5';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import FAQItem from '../components/support/FAQItem';
import { toast } from 'react-toastify';

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I withdraw my earnings?",
    answer: "You can withdraw funds once you reach the $10.00 minimum threshold. Go to the Earnings page, select your preferred payment method (PayPal, Crypto, or Bank Transfer), enter the amount, and click Withdraw. Requests are processed within 24-48 hours."
  },
  {
    id: 2,
    question: "Why was my task rejected?",
    answer: "Tasks are usually rejected if they don't meet the specific requirements (e.g., comment was too short, wrong screenshot uploaded) or if our system detected VPN/proxy usage. Please check the task instructions carefully before submitting."
  },
  {
    id: 3,
    question: "How does the referral program work?",
    answer: "You earn a 10% commission on every task your referred friends complete forever. There is no limit to how many people you can refer or how much you can earn from them."
  },
  {
    id: 4,
    question: "Is my personal information safe?",
    answer: "Yes, we use bank-grade encryption to protect your data. We never sell your personal information to third parties. Your phone number is only used for account verification to prevent fraud."
  },
  {
    id: 5,
    question: "Can I use multiple accounts?",
    answer: "No. Creating multiple accounts is strictly prohibited and will result in a permanent ban of all associated accounts and forfeiture of earnings."
  }
];

const SupportCategory = ({ icon: Icon, title, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-ios-float transition-all flex flex-col items-center text-center gap-4"
  >
    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-ios-blue flex items-center justify-center text-2xl">
      <Icon />
    </div>
    <span className="font-semibold text-ios-dark dark:text-white">{title}</span>
  </motion.button>
);

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const filteredFaqs = FAQ_DATA.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.message.trim()) return toast.error("Please enter a message");
    
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll reply within 24 hours.");
      setContactForm({ subject: '', message: '' });
      setSending(false);
    }, 1500);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header Hero */}
      <div className="text-center space-y-6 py-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-ios-dark dark:text-white tracking-tight"
        >
          How can we help?
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <Input 
            icon={IoSearchOutline}
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-lg shadow-blue-500/10 text-lg py-4 rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SupportCategory icon={IoWalletOutline} title="Payments" onClick={() => setSearchQuery("withdraw")} />
        <SupportCategory icon={IoShieldCheckmarkOutline} title="Account" onClick={() => setSearchQuery("account")} />
        <SupportCategory icon={IoHardwareChipOutline} title="Tasks" onClick={() => setSearchQuery("task")} />
        <SupportCategory icon={IoChatbubbleEllipsesOutline} title="General" onClick={() => setSearchQuery("")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-ios-dark dark:text-white">Frequently Asked Questions</h2>
          <div className="ios-card p-6 md:p-8 bg-white dark:bg-[#1C1C1E]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqId === faq.id}
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="ios-card p-6 bg-gradient-to-br from-ios-blue to-ios-indigo text-white mb-6">
              <h3 className="font-bold text-lg mb-2">Live Chat Support</h3>
              <p className="text-blue-100 text-sm mb-4">Premium support for verified earners.</p>
              <Button className="w-full bg-white text-ios-blue hover:bg-blue-50 border-none">
                Start Chat
              </Button>
            </div>

            <div className="ios-card p-6 md:p-8">
              <h3 className="text-xl font-bold text-ios-dark dark:text-white mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input 
                  label="Subject"
                  placeholder="e.g., Missing Payment"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                />
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500 ml-1">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3.5 focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20 transition-all outline-none dark:text-white"
                    placeholder="Describe your issue..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  ></textarea>
                </div>

                <Button type="submit" className="w-full gap-2" isLoading={sending}>
                  <IoSend size={18} /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;