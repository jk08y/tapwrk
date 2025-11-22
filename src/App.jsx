// path: src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Routing & Utilities
import AnimatedRoutes from './components/layout/AnimatedRoutes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      {/* Ensures window scrolls to top on route change */}
      <ScrollToTop />
      
      <ThemeProvider>
        <AuthProvider>
          {/* Handles all page routing and transition animations */}
          <AnimatedRoutes />
          
          {/* Global Notifications */}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            // Custom class for spacing, specific styles are in index.css
            className="mt-4"
          />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;