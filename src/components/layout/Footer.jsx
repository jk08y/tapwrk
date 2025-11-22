// path: src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

// Custom X (Twitter) Icon for modernity
const XIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-ios-blue dark:hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialButton = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-ios-blue hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container-safe">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-xl font-bold text-ios-dark dark:text-white tracking-tight">Tapwrk</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              Micro-earnings platform designed for the modern digital economy. 
            </p>
            <div className="flex gap-3">
              <SocialButton href="#" icon={XIcon} label="X (formerly Twitter)" />
              <SocialButton href="#" icon={IoLogoInstagram} label="Instagram" />
              <SocialButton href="#" icon={IoLogoLinkedin} label="LinkedIn" />
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-ios-dark dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <FooterLink to="/tasks">Browse Tasks</FooterLink>
              <FooterLink to="/how-it-works">How it Works</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/referrals">Referral Program</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-ios-dark dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/press">Press Kit</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-ios-dark dark:text-white mb-6">Support</h4>
            <ul className="space-y-4">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/status">System Status</FooterLink>
              <FooterLink to="/security">Security</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-ios-dark dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {currentYear} Tapwrk Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;