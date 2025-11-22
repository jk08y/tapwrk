// path: src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#151516] pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container-safe">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-ios-dark dark:text-white mb-4 block tracking-tight">
              Tapwrk
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
              The premium micro-earnings platform designed for the modern digital economy. Earn anywhere, anytime.
            </p>
            <div className="flex gap-4">
              {[IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:bg-ios-blue hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-ios-dark dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/tasks" className="hover:text-ios-blue transition-colors">Browse Tasks</Link></li>
              <li><Link to="/how-it-works" className="hover:text-ios-blue transition-colors">How it Works</Link></li>
              <li><Link to="/pricing" className="hover:text-ios-blue transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ios-dark dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-ios-blue transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-ios-blue transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-ios-blue transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ios-dark dark:text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/help" className="hover:text-ios-blue transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-ios-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-ios-blue transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2025 Tapwrk Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-600 dark:hover:text-gray-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;