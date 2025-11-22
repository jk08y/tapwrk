// path: src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (theme === 'dark' || (theme === 'system' && mediaQuery.matches)) {
        root.classList.add('dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
      } else {
        root.classList.remove('dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F2F2F7');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const listener = () => {
        if (theme === 'system') applyTheme();
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);