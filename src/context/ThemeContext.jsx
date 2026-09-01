import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Always default to 'light' mode as requested
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    // Always keep light mode active
    root.classList.remove('dark');
    localStorage.setItem('krgo-theme', 'light');
  }, [theme]);

  const toggleTheme = () => {
    // Theme toggle disabled per user request (kept light)
    setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
