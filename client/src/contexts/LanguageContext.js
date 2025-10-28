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

  // Apply language-specific styling and attributes
  useEffect(() => {
    if (isLoaded) {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      // Set document language attribute for SEO and accessibility
      htmlElement.lang = language === 'mr' ? 'mr-IN' : 'en-IN';
      
      // Apply language-specific CSS classes
      bodyElement.classList.remove('language-en', 'language-mr');
      bodyElement.classList.add(`language-${language}`);
      
      // Set dir attribute (both are LTR)
      htmlElement.dir = 'ltr';
      
      // Add/remove Marathi font class for better typography
      if (language === 'mr') {
        bodyElement.classList.add('marathi-text');
      } else {
        bodyElement.classList.remove('marathi-text');
      }
    }
  }, [language, isLoaded]);

  // Save language preference to localStorage
  const changeLanguage = (newLanguage) => {
    if (['en', 'mr'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('kanhaiya-krushi-language', newLanguage);
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