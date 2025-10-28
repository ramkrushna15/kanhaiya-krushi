# Kanhaiya Krushi - Bilingual Website Setup

## Overview

This document explains how the bilingual (English/Marathi) functionality has been implemented in the Kanhaiya Krushi website, similar to FarmSchool.com.

## Features Implemented

✓ **Complete Internationalization (i18n) System**  
✓ **English and Marathi Language Support**  
✓ **Dynamic Language Switching**  
✓ **Persistent Language Preference** (localStorage)  
✓ **SEO-friendly Language Attributes**  
✓ **Responsive Language Toggle Component**  
✓ **Fallback Translation System**  
✓ **Loading States with Translation Support**  

## File Structure

```
client/src/
├── contexts/
│   └── LanguageContext.js          # React Context for language state
├── translations/
│   └── translations.js             # All translations (EN/MR)
├── hooks/
│   └── useTranslation.js           # Custom hook for translations
├── components/
│   ├── LanguageToggle.jsx          # Language switcher component
│   ├── LanguageToggle.css          # Language toggle styles
│   ├── Navbar.jsx                  # Updated with translations
│   └── Footer.jsx                  # Updated with translations
└── pages/
    └── Home.jsx                    # Example page with translations
```

## How It Works

### 1. Language Context (`LanguageContext.js`)

Provides global language state management:
- Stores current language (`en` or `mr`)
- Saves preference to localStorage
- Provides language switching functionality
- Updates document language attribute for SEO

### 2. Translation System (`translations.js`)

Contains all text content in both languages:
```javascript
export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      // ...
    }
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      // ...
    }
  }
};
```

### 3. Translation Hook (`useTranslation.js`)

Provides easy-to-use translation functions:
```javascript
const { t, changeLanguage, isMarathi, isEnglish } = useTranslation();

// Usage in components
<h1>{t('nav.home')}</h1>
<button onClick={() => changeLanguage('mr')}>Switch to Marathi</button>
```

### 4. Language Toggle Component

Displays as: **EN | मर**
- Clean, accessible design
- Integrates seamlessly with navbar and footer
- Maintains active state styling

## Implementation in Components

### Basic Usage

```jsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, isLoaded } = useTranslation();
  
  // Show loading state while translations load
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
};
```

### Advanced Usage with Interpolation

```jsx
const { ti } = useTranslation();

// For translations with variables
<p>{ti('common.welcome', { name: 'John' })}</p>
// Translates: "Welcome, {{name}}!" → "Welcome, John!"
```

## Adding New Translations

### Step 1: Add to Translation File

In `translations.js`, add your new keys:

```javascript
const translations = {
  en: {
    // ... existing translations
    newSection: {
      title: 'New Section Title',
      description: 'Section description in English'
    }
  },
  mr: {
    // ... existing translations  
    newSection: {
      title: 'नवीन विभाग शीर्षक',
      description: 'मराठीत विभाग वर्णन'
    }
  }
};
```

### Step 2: Use in Components

```jsx
const MyNewComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </div>
  );
};
```

## Converting Existing Pages

To convert an existing page to support translations:

### 1. Import the hook
```jsx
import { useTranslation } from '../hooks/useTranslation';
```

### 2. Initialize in component
```jsx
const { t, isLoaded } = useTranslation();
```

### 3. Add loading check
```jsx
if (!isLoaded) {
  return <div>Loading...</div>;
}
```

### 4. Replace text with translation calls
```jsx
// Before
<h1>About Us</h1>

// After  
<h1>{t('about.title')}</h1>
```

## SEO Considerations

The system automatically:
- Sets `document.documentElement.lang` to appropriate locale (`en-IN` or `mr-IN`)
- Supports proper page titles and meta descriptions per language
- Maintains clean URLs (no language prefix needed)

## Styling the Language Toggle

The language toggle component includes:
- Hover effects
- Active state styling  
- Responsive design
- Integration with navbar and footer themes

Custom CSS classes:
```css
.language-toggle { /* Container */ }
.lang-btn { /* Language buttons */ }
.lang-btn.active { /* Active language */ }
.lang-separator { /* Separator (|) */ }
```

## Browser Support

✓ **Modern browsers** (Chrome, Firefox, Safari, Edge)  
✓ **Mobile responsive**  
✓ **localStorage support** for preference persistence  
✓ **Fallback to English** if translation missing  

## Development Tips

### 1. Consistent Translation Keys
Use hierarchical keys for organization:
```
nav.home
nav.about
home.title
home.subtitle
footer.contactUs
```

### 2. Loading States
Always check `isLoaded` before rendering translated content:
```jsx
if (!isLoaded) return <LoadingSpinner />;
```

### 3. Fallback Content
The system falls back to English if Marathi translation is missing.

### 4. Testing
Test both languages thoroughly:
- Switch languages multiple times
- Check localStorage persistence
- Verify all text is translated
- Test on mobile devices

## Future Enhancements

Possible improvements:
- [ ] Add more regional languages (Hindi, Gujarati)
- [ ] Implement right-to-left (RTL) support
- [ ] Add language-specific number/date formatting
- [ ] Create admin panel for translation management
- [ ] Add pluralization support
- [ ] Implement lazy loading for translation files

## Troubleshooting

### Common Issues:

**1. Translations not showing**
- Check if `LanguageProvider` wraps your app
- Verify translation keys exist in `translations.js`
- Ensure `isLoaded` check is in place

**2. Language not persisting**
- Check browser localStorage is enabled
- Verify `changeLanguage()` is called correctly

**3. Missing translations**
- System automatically falls back to English
- Check console for warnings about missing keys

## Testing the Implementation

To test the bilingual functionality:

1. **Start the development server**:
   ```bash
   cd client
   npm start
   ```

2. **Test language switching**:
   - Click the language toggle (EN | मर)
   - Verify all text changes language
   - Refresh page - language should persist

3. **Check different pages**:
   - Navigate through all pages
   - Ensure consistent language experience

4. **Mobile testing**:
   - Test language toggle on mobile
   - Verify responsive behavior

## Conclusion

The bilingual implementation provides a professional, user-friendly experience similar to FarmSchool.com. The system is scalable, maintainable, and follows React best practices.

For questions or issues, refer to the translation files and component implementations for examples.