import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './LanguageToggle.css';

const LanguageToggle = ({ className = '' }) => {
  const { language, changeLanguage, isLoaded } = useTranslation();

  if (!isLoaded) {
    return null;
  }

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== language) {
      changeLanguage(newLanguage);
    }
  };

  return (
    <div className={`language-toggle ${className}`}>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <span className="lang-separator">|</span>
      <button
        className={`lang-btn ${language === 'mr' ? 'active' : ''} marathi-text`}
        onClick={() => handleLanguageChange('mr')}
        aria-label="मराठी भाषेत स्विच करा"
        title="मराठी"
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageToggle;
