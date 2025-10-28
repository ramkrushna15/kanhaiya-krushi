// client/src/utils/formatters.js

/**
 * Format currency with proper spacing and Indian Rupee symbol
 * @param {number|string} price - Price value
 * @param {string} unit - Unit (kg, liter, piece, etc.)
 * @param {object} options - Formatting options
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, unit, options = {}) => {
  const {
    showUnit = true,
    separator = ' per ',
    locale = 'en-IN'
  } = options;

  // Handle invalid price
  if (!price || isNaN(price)) {
    return showUnit ? `Price on request${unit ? ` (${unit})` : ''}` : 'Price on request';
  }

  // Convert to number and format with Indian locale
  const formattedPrice = Number(price).toLocaleString(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  // Return with or without unit
  if (!showUnit || !unit) {
    return formattedPrice;
  }

  return `${formattedPrice}${separator}${unit}`;
};

/**
 * Format stock status with proper indicators
 * @param {number} stock - Stock quantity
 * @param {object} options - Formatting options
 * @returns {object} Stock status with indicator and text
 */
export const formatStock = (stock, options = {}) => {
  const { showQuantity = false, inStockText = 'In Stock', outOfStockText = 'Out of Stock' } = options;

  if (!stock || stock <= 0) {
    return {
      status: 'out-of-stock',
      indicator: '✗',
      text: outOfStockText,
      className: 'out-of-stock'
    };
  }

  const stockText = showQuantity ? `${inStockText} (${stock})` : inStockText;
  
  return {
    status: 'in-stock',
    indicator: '✓',
    text: stockText,
    className: 'in-stock'
  };
};

/**
 * Format product tags with proper spacing and cleanup
 * @param {Array} tags - Array of tag strings
 * @param {object} options - Formatting options
 * @returns {Array} Cleaned and formatted tags
 */
export const formatTags = (tags, options = {}) => {
  const { prefix = '#', maxTags = null } = options;

  if (!Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  // Clean tags: trim whitespace, remove empty tags, add prefix
  let cleanTags = tags
    .map(tag => String(tag).trim())
    .filter(tag => tag.length > 0)
    .map(tag => tag.startsWith(prefix) ? tag : `${prefix}${tag}`);

  // Limit number of tags if specified
  if (maxTags && maxTags > 0) {
    cleanTags = cleanTags.slice(0, maxTags);
  }

  return cleanTags;
};

/**
 * Format quantity with proper controls
 * @param {number} quantity - Current quantity
 * @param {object} options - Formatting options
 * @returns {object} Quantity data with controls
 */
export const formatQuantity = (quantity, options = {}) => {
  const { min = 1, max = 999, step = 1 } = options;

  const currentQty = Math.max(min, Math.min(max, Number(quantity) || min));

  return {
    current: currentQty,
    canDecrease: currentQty > min,
    canIncrease: currentQty < max,
    min,
    max,
    step
  };
};

/**
 * Format features list with proper indicators
 * @param {Array} features - Array of feature strings
 * @param {object} options - Formatting options
 * @returns {Array} Formatted features with indicators
 */
export const formatFeatures = (features, options = {}) => {
  const { indicator = '✓', maxFeatures = null } = options;

  if (!Array.isArray(features) || features.length === 0) {
    return [];
  }

  // Clean and format features
  let cleanFeatures = features
    .map(feature => String(feature).trim())
    .filter(feature => feature.length > 0)
    .map(feature => {
      // Remove existing indicators to avoid duplication
      const cleanFeature = feature.replace(/^[✓✗×•\-\*]\s*/, '');
      return `${indicator} ${cleanFeature}`;
    });

  // Limit number of features if specified
  if (maxFeatures && maxFeatures > 0) {
    cleanFeatures = cleanFeatures.slice(0, maxFeatures);
  }

  return cleanFeatures;
};

/**
 * Format contact information
 * @param {string} phone - Phone number
 * @param {string} email - Email address
 * @returns {object} Formatted contact info
 */
export const formatContact = (phone, email) => {
  const formatPhone = (phoneStr) => {
    if (!phoneStr) return null;
    // Clean phone number and format for Indian numbers
    const cleaned = phoneStr.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    return phoneStr; // Return original if format doesn't match
  };

  return {
    phone: formatPhone(phone),
    email: email?.trim() || null,
    phoneHref: phone ? `tel:${phone.replace(/\D/g, '')}` : null,
    emailHref: email ? `mailto:${email.trim()}` : null
  };
};
