import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('kanhaiya-krushi-language');
    if (savedLanguage && ['en', 'mr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (newLanguage) => {
    if (['en', 'mr'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('kanhaiya-krushi-language', newLanguage);
      // Update document lang attribute for SEO
      document.documentElement.lang = newLanguage === 'mr' ? 'mr-IN' : 'en-IN';
    }
  };

  const value = {
    language,
    changeLanguage,
    isLoaded,
    isMarathi: language === 'mr',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};