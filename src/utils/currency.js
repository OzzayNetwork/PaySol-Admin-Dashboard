// src/utils/currency.js

/**
 * Simple Currency Number Formatting Utility
 * Focus on formatting numbers as currency with KES as default
 */

// ==================== CONFIGURATION ====================

// User preferences for currency display
let userPreferences = {
  currency: 'KES',              // Default currency: Kenyan Shilling
  showSymbol: true,             // Show currency symbol (KES)
  symbolPosition: 'before',     // 'before' or 'after' the amount
  decimalPlaces: 2,             // Number of decimal places
  showDecimals: true,           // Show decimal places
  thousandsSeparator: true,     // Use comma as thousands separator
  compactNotation: false,       // Use compact notation (1K, 1M, 1B)
  roundingMode: 'half-up',      // Rounding mode
};

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedPrefs = localStorage.getItem('currencyPreferences');
  if (savedPrefs) {
    userPreferences = { ...userPreferences, ...JSON.parse(savedPrefs) };
  }
}

// ==================== CURRENCY DATABASE ====================

export const CURRENCIES = {
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KES',
    symbolNative: 'KES',
    decimalDigits: 2,
    locale: 'en-KE'
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    symbolNative: '$',
    decimalDigits: 2,
    locale: 'en-US'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    symbolNative: '€',
    decimalDigits: 2,
    locale: 'de-DE'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    symbolNative: '£',
    decimalDigits: 2,
    locale: 'en-GB'
  },
  UGX: {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'UGX',
    symbolNative: 'UGX',
    decimalDigits: 0,
    locale: 'en-UG'
  },
  TZS: {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TZS',
    symbolNative: 'TZS',
    decimalDigits: 0,
    locale: 'sw-TZ'
  }
};

// ==================== PREFERENCE MANAGEMENT ====================

/**
 * Set user currency preferences
 */
export function setCurrencyPreferences(prefs) {
  userPreferences = { ...userPreferences, ...prefs };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('currencyPreferences', JSON.stringify(userPreferences));
  }
  
  return userPreferences;
}

/**
 * Get current user preferences
 */
export function getUserCurrencyPreferences() {
  return { ...userPreferences };
}

/**
 * Reset to default preferences
 */
export function resetCurrencyPreferences() {
  const defaults = {
    currency: 'KES',
    showSymbol: true,
    symbolPosition: 'before',
    decimalPlaces: 2,
    showDecimals: true,
    thousandsSeparator: true,
    compactNotation: false,
    roundingMode: 'half-up'
  };
  
  setCurrencyPreferences(defaults);
  return defaults;
}

/**
 * Get currency information
 */
export function getCurrencyInfo(currencyCode = null) {
  const code = currencyCode || userPreferences.currency;
  return CURRENCIES[code.toUpperCase()] || CURRENCIES.KES;
}

// ==================== CORE FORMATTING FUNCTIONS ====================

/**
 * Format a number as currency (KES by default)
 */
export function formatCurrency(amount, options = {}) {
  // Handle null/undefined/NaN
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '';
  }
  
  const {
    currency = userPreferences.currency,
    showSymbol = userPreferences.showSymbol,
    symbolPosition = userPreferences.symbolPosition,
    decimalPlaces = userPreferences.decimalPlaces,
    showDecimals = userPreferences.showDecimals,
    thousandsSeparator = userPreferences.thousandsSeparator,
    compactNotation = userPreferences.compactNotation
  } = options;
  
  const currencyInfo = getCurrencyInfo(currency);
  
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '';
  }
  
  // Round the amount
  const roundedAmount = roundNumber(numAmount, showDecimals ? decimalPlaces : 0, userPreferences.roundingMode);
  
  // Handle compact notation
  if (compactNotation && Math.abs(roundedAmount) >= 1000) {
    return formatCompactCurrency(roundedAmount, currencyInfo, options);
  }
  
  // Format the number
  let formattedNumber;
  
  if (thousandsSeparator) {
    // Use Intl.NumberFormat for proper formatting
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: showDecimals ? decimalPlaces : 0,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true
    });
    formattedNumber = formatter.format(roundedAmount);
  } else {
    // Simple formatting without thousands separator
    formattedNumber = roundedAmount.toFixed(showDecimals ? decimalPlaces : 0);
  }
  
  // Add currency symbol WITH SPACE
  if (showSymbol) {
    if (symbolPosition === 'before') {
      return `${currencyInfo.symbol} ${formattedNumber}`;
    } else {
      return `${formattedNumber} ${currencyInfo.symbol}`;
    }
  }
  
  return formattedNumber;
}

/**
 * Format as compact notation (1K, 1M, 1B)
 */
function formatCompactCurrency(amount, currencyInfo, options) {
  const {
    showSymbol = true,
    symbolPosition = 'before',
    decimalPlaces = 1
  } = options;
  
  const absAmount = Math.abs(amount);
  let value, suffix;
  
  if (absAmount >= 1000000000) {
    value = amount / 1000000000;
    suffix = 'B';
  } else if (absAmount >= 1000000) {
    value = amount / 1000000;
    suffix = 'M';
  } else {
    value = amount / 1000;
    suffix = 'K';
  }
  
  // Round to specified decimal places
  const roundedValue = roundNumber(value, decimalPlaces, userPreferences.roundingMode);
  
  // Format the compact number
  let formattedNumber;
  if (decimalPlaces === 0 || roundedValue === Math.floor(roundedValue)) {
    formattedNumber = roundedValue.toFixed(0);
  } else {
    formattedNumber = roundedValue.toFixed(decimalPlaces).replace(/\.?0+$/, '');
  }
  
  const compactNumber = `${formattedNumber}${suffix}`;
  
  // Add currency symbol WITH SPACE
  if (showSymbol) {
    if (symbolPosition === 'before') {
      return `${currencyInfo.symbol} ${compactNumber}`;
    } else {
      return `${compactNumber} ${currencyInfo.symbol}`;
    }
  }
  
  return compactNumber;
}

/**
 * Format amount without currency symbol
 */
export function formatAmount(amount, options = {}) {
  const {
    decimalPlaces = userPreferences.decimalPlaces,
    showDecimals = userPreferences.showDecimals,
    thousandsSeparator = userPreferences.thousandsSeparator
  } = options;
  
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '';
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '';
  }
  
  const roundedAmount = roundNumber(numAmount, showDecimals ? decimalPlaces : 0, userPreferences.roundingMode);
  
  if (thousandsSeparator) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: showDecimals ? decimalPlaces : 0,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true
    });
    return formatter.format(roundedAmount);
  }
  
  return roundedAmount.toFixed(showDecimals ? decimalPlaces : 0);
}

/**
 * Format as Kenyan Shilling
 */
export function formatKES(amount, options = {}) {
  return formatCurrency(amount, { ...options, currency: 'KES' });
}

/**
 * Format as US dollars
 */
export function formatUSD(amount, options = {}) {
  return formatCurrency(amount, { ...options, currency: 'USD' });
}

/**
 * Format as Euros
 */
export function formatEUR(amount, options = {}) {
  return formatCurrency(amount, { ...options, currency: 'EUR' });
}

/**
 * Format as British Pounds
 */
export function formatGBP(amount, options = {}) {
  return formatCurrency(amount, { ...options, currency: 'GBP' });
}

/**
 * Format as compact/short notation (1K, 1M, 1B)
 */
export function formatCompact(amount, options = {}) {
  return formatCurrency(amount, { ...options, compactNotation: true });
}

/**
 * Format for accounting (parentheses for negatives)
 */
export function formatAccounting(amount, options = {}) {
  if (amount < 0) {
    const positiveAmount = Math.abs(amount);
    return `(${formatCurrency(positiveAmount, options)})`;
  }
  
  return formatCurrency(amount, options);
}

/**
 * Format as words (for checks, invoices, etc.)
 */
export function formatInWords(amount, options = {}) {
  const {
    currency = userPreferences.currency,
    includeCents = true
  } = options;
  
  const currencyInfo = getCurrencyInfo(currency);
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '';
  }
  
  const roundedAmount = roundNumber(numAmount, 2, userPreferences.roundingMode);
  const wholePart = Math.floor(roundedAmount);
  const centsPart = Math.round((roundedAmount - wholePart) * 100);
  
  const wholeWords = numberToWords(wholePart);
  const result = `${wholeWords} ${currencyInfo.name}`;
  
  if (includeCents && centsPart > 0) {
    const centsWords = numberToWords(centsPart);
    return `${result} and ${centsWords} cents`;
  }
  
  return result;
}

// Helper function to convert numbers to words
function numberToWords(num) {
  if (num === 0) return 'zero';
  
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const thousands = ['', 'thousand', 'million', 'billion'];
  
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tens[ten] + (one ? '-' + ones[one] : '');
  }
  
  // For simplicity, return the number for larger values
  return num.toLocaleString('en-US');
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Round number based on rounding mode
 */
function roundNumber(value, decimals, mode = 'half-up') {
  if (decimals <= 0) {
    switch (mode) {
      case 'up': return Math.ceil(value);
      case 'down': return Math.floor(value);
      default: return Math.round(value);
    }
  }
  
  const factor = Math.pow(10, decimals);
  
  switch (mode) {
    case 'up':
      return Math.ceil(value * factor) / factor;
    case 'down':
      return Math.floor(value * factor) / factor;
    case 'half-up':
    default:
      return Math.round(value * factor) / factor;
  }
}

/**
 * Parse a currency string back to number
 */
export function parseCurrency(currencyString) {
  if (!currencyString) return 0;
  
  // Remove currency symbols and thousand separators
  let cleaned = currencyString
    .replace(/[^\d.,-]/g, '')  // Remove non-numeric except dots, commas, and minus
    .replace(/,/g, '');        // Remove thousand separators
  
  // Handle decimal separator
  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');
  
  if (hasComma && !hasDot) {
    // Comma is decimal separator
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (hasComma && hasDot) {
    // Both present, assume comma is thousand separator
    cleaned = cleaned.replace(/,/g, '');
  }
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get symbol for currency
 */
export function getCurrencySymbol(currencyCode = null) {
  const currencyInfo = getCurrencyInfo(currencyCode);
  return currencyInfo.symbol;
}

/**
 * Format for input fields
 */
export function formatForInput(amount, options = {}) {
  const {
    decimalPlaces = userPreferences.decimalPlaces,
    showDecimals = userPreferences.showDecimals
  } = options;
  
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '';
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '';
  }
  
  return numAmount.toFixed(showDecimals ? decimalPlaces : 0);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(amount, percentage) {
  return (amount * percentage) / 100;
}

/**
 * Format percentage
 */
export function formatPercentage(value, options = {}) {
  const {
    decimalPlaces = 1,
    showSymbol = true
  } = options;
  
  const rounded = roundNumber(value, decimalPlaces, userPreferences.roundingMode);
  const symbol = showSymbol ? '%' : '';
  return `${rounded.toFixed(decimalPlaces)}${symbol}`;
}

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Validate currency code
 */
export function isValidCurrency(currencyCode) {
  return !!CURRENCIES[currencyCode?.toUpperCase()];
}

/**
 * Validate amount
 */
export function isValidAmount(amount) {
  if (amount === null || amount === undefined) return false;
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && isFinite(num);
}

// ==================== VUE COMPOSABLE ====================

/**
 * Vue composable for reactive currency formatting
 */
export function useCurrency() {
  const formatCurrencyReactive = (amount, options = {}) => {
    return formatCurrency(amount, options);
  };
  
  const formatKESReactive = (amount, options = {}) => {
    return formatKES(amount, options);
  };
  
  const updatePreferences = (prefs) => {
    return setCurrencyPreferences(prefs);
  };
  
  return {
    format: formatCurrencyReactive,
    formatKES: formatKESReactive,
    formatAmount,
    formatCompact,
    formatUSD,
    formatEUR,
    formatGBP,
    formatAccounting,
    formatPercentage,
    formatInWords,
    getCurrencySymbol,
    updatePreferences,
    preferences: getUserCurrencyPreferences(),
    currencies: CURRENCIES
  };
}

// ==================== DEFAULT EXPORT ====================

export default {
  // Core functions
  formatCurrency,
  formatAmount,
  formatCompact,
  
  // Currency specific
  formatKES,
  formatUSD,
  formatEUR,
  formatGBP,
  
  // Special formats
  formatAccounting,
  formatPercentage,
  formatInWords,
  
  // Helpers
  getCurrencyInfo,
  getCurrencySymbol,
  parseCurrency,
  formatForInput,
  calculatePercentage,
  
  // Validation
  isValidCurrency,
  isValidAmount,
  
  // Preferences
  setCurrencyPreferences,
  getUserCurrencyPreferences,
  resetCurrencyPreferences,
  
  // Constants
  CURRENCIES,
  
  // Composable
  useCurrency
};