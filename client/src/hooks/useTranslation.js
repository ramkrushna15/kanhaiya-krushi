import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

/**
 * Custom hook for translation functionality
 * @returns {Object} Translation functions and language info
 */
export const useTranslation = () => {
  const { language, changeLanguage, isLoaded, isMarathi, isEnglish } = useLanguage();

  /**
   * Get translated text for a given key
   * @param {string} key - The translation key (e.g., 'nav.home')
   * @returns {string} Translated text
   */
  const t = (key) => {
    if (!isLoaded) return '';
    return getTranslation(language, key);
  };

  /**
   * Get translated text with interpolation support
   * @param {string} key - The translation key
   * @param {Object} params - Parameters for interpolation
   * @returns {string} Translated and interpolated text
   */
  const ti = (key, params = {}) => {
    let translation = t(key);
    
    // Simple interpolation - replace {{param}} with values
    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        translation = translation.replace(
          new RegExp(`{{${param}}}`, 'g'), 
          params[param]
        );
      });
    }
    
    return translation;
  };

  /**
   * Get current language direction (for RTL support if needed)
   * @returns {string} 'ltr' for left-to-right
   */
  const getDirection = () => {
    // Both English and Marathi are LTR languages
    return 'ltr';
  };

  /**
   * Get current language locale code
   * @returns {string} Locale code
   */
  const getLocale = () => {
    return language === 'mr' ? 'mr-IN' : 'en-IN';
  };

  return {
    t,
    ti,
    language,
    changeLanguage,
    isLoaded,
    isMarathi,
    isEnglish,
    getDirection,
    getLocale
  };
};