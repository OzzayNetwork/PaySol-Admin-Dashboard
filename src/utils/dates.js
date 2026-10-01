// src/utils/dates.js

/**
 * Comprehensive Date/Time Utility
 * Multiple formats, time ago, and user preference support
 */

// Import dayjs for robust date manipulation
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en'; // Default English locale

// Initialize dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('en'); // Default to English locale

// ==================== CONFIGURATION ====================

// User preferences (could be stored in localStorage, Vuex/Pinia, or database)
let userPreferences = {
   dateFormat: 'DD/MM/YYYY',         // Kenya standard
  timeFormat: '24h',                // common for official systems
  showSeconds: false,
  showRelativeTime: true,     // Default: show "time ago" for recent dates
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
   firstDayOfWeek: 1,                // Monday
  locale: 'en-KE',                  // or sw-KE
  shortMonthNames: true,
  preferDMYParsing: true            // NEW: resolves 02/03/2026 safely
};

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedPrefs = localStorage.getItem('dateTimePreferences');
  if (savedPrefs) {
    userPreferences = { ...userPreferences, ...JSON.parse(savedPrefs) };
  }
}

// ==================== FORMAT DEFINITIONS ====================

export const DATE_FORMATS = {

  // Kenya / Africa-friendly
  'DD/MM/YYYY': 'DD/MM/YYYY',       // 25/12/2024
  'D/M/YYYY': 'D/M/YYYY',           // 5/2/2026
  'DD/MM/YY': 'DD/MM/YY',           // 25/12/24
  'D MMM YYYY': 'D MMM YYYY',       // 5 Feb 2026
  'DD MMM YYYY': 'DD MMM YYYY',     // 05 Feb 2026
  'D MMMM YYYY': 'D MMMM YYYY',     // 5 February 2026
  'ddd, D MMM YYYY': 'ddd, D MMM YYYY', // Thu, 5 Feb 2026
  'Do MMM YYYY': 'Do MMM YYYY',     // 5th Feb 2026  ✅ (needs advancedFormat)


   // ISO / system formats
  'YYYY-MM-DD': 'YYYY-MM-DD',
  'YYYY-MM-DDTHH:mm:ssZ': 'YYYY-MM-DDTHH:mm:ssZ',
  'YYYY-MM-DD HH:mm:ss': 'YYYY-MM-DD HH:mm:ss',

  // Other common global formats (still supported)
  'MM/DD/YYYY': 'MM/DD/YYYY',
  'DD-MM-YYYY': 'DD-MM-YYYY',
  'DD.MM.YYYY': 'DD.MM.YYYY',
  'MMM D, YYYY': 'MMM D, YYYY',
  'MMMM D, YYYY': 'MMMM D, YYYY',

  // US formats (mm/dd/yyyy)
  'MM/DD/YYYY': 'MM/DD/YYYY',      // 12/25/2024
  'MM-DD-YYYY': 'MM-DD-YYYY',      // 12-25-2024
  'MM.DD.YYYY': 'MM.DD.YYYY',      // 12.25.2024
  
  // European formats (dd/mm/yyyy)
  'DD/MM/YYYY': 'DD/MM/YYYY',      // 25/12/2024
  'DD-MM-YYYY': 'DD-MM-YYYY',      // 25-12-2024
  
  // International formats
  'YYYY-MM-DD': 'YYYY-MM-DD',      // 2024-12-25 (ISO)
  'YYYY/MM/DD': 'YYYY/MM/DD',      // 2024/12/25
  
  // Text formats
  'MMMM D, YYYY': 'MMMM D, YYYY',  // December 25, 2024
  'MMM D, YYYY': 'MMM D, YYYY',    // Dec 25, 2024
  'D MMMM YYYY': 'D MMMM YYYY',    // 25 December 2024
  'ddd, MMM D, YYYY': 'ddd, MMM D, YYYY', // Wed, Dec 25, 2024
};

export const TIME_FORMATS = {
  '12h': 'h:mm A',                 // 2:30 PM
  '12h-full': 'h:mm:ss A',         // 2:30:45 PM
  '24h': 'HH:mm',                  // 14:30
  '24h-full': 'HH:mm:ss',          // 14:30:45
};

export const DATETIME_FORMATS = {
  'standard': 'MM/DD/YYYY h:mm A',     // 12/25/2024 2:30 PM
  'full': 'MMMM D, YYYY h:mm A',       // December 25, 2024 2:30 PM
  'compact': 'MMM D, h:mm A',          // Dec 25, 2:30 PM
  'iso': 'YYYY-MM-DDTHH:mm:ssZ',       // ISO 8601
  'file-safe': 'YYYY-MM-DD_HH-mm',     // Good for filenames
  'log': 'YYYY-MM-DD HH:mm:ss',        // For logging
};

// ==================== PREFERENCE MANAGEMENT ====================

/**
 * Set user date/time preferences
 */
export function setUserPreferences(prefs) {
  userPreferences = { ...userPreferences, ...prefs };
  
  // Update dayjs locale if changed
  if (prefs.locale) {
    dayjs.locale(prefs.locale.toLowerCase().replace('_', '-'));
  }
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('dateTimePreferences', JSON.stringify(userPreferences));
  }
  
  return userPreferences;
}

/**
 * Get current user preferences
 */
export function getUserPreferences() {
  return { ...userPreferences };
}

/**
 * Reset to default preferences
 */
export function resetPreferences() {
  const defaults = {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    showSeconds: false,
    showRelativeTime: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    firstDayOfWeek: 0,
    locale: 'en-US',
    shortMonthNames: true
  };
  
  setUserPreferences(defaults);
  return defaults;
}

// ==================== CORE FORMATTING FUNCTIONS ====================

/**
 * Format a date string according to user preferences
 */
export function formatDate(date, format = null) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  const targetFormat = format || userPreferences.dateFormat;
  return d.format(targetFormat);
}

/**
 * Format time according to user preferences (defaults to AM/PM format)
 */
export function formatTime(date, withSeconds = null) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid time';
  
  const showSeconds = withSeconds !== null ? withSeconds : userPreferences.showSeconds;
  
  // Always default to 12-hour format with AM/PM
  if (userPreferences.timeFormat === '24h') {
    return d.format(showSeconds ? TIME_FORMATS['24h-full'] : TIME_FORMATS['24h']);
  }
  
  // 12-hour format with AM/PM
  return d.format(showSeconds ? TIME_FORMATS['12h-full'] : TIME_FORMATS['12h']);
}

/**
 * Format date and time according to user preferences
 */
export function formatDateTime(date, format = null) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid datetime';
  
  if (format) {
    return d.format(format);
  }
  
  // Use standard format with AM/PM
  if (userPreferences.timeFormat === '12h') {
    return d.format(DATETIME_FORMATS.standard);
  }
  
  // For 24h format
  const datePart = formatDate(date);
  const timePart = formatTime(date);
  return `${datePart} ${timePart}`;
}

// ==================== TIME AGO / RELATIVE TIME ====================

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function timeAgo(date, includeSuffix = true) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  return d.fromNow(!includeSuffix);
}

/**
 * Smart date display - shows relative time for recent dates
 */
export function smartDate(date, options = {}) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  const {
    threshold = 7,
    showTime = true,
    showYear = true,
    capitalize = true,
    shortMonth = null // Override user preference
  } = options;
  
  const now = dayjs();
  const isFuture = d.isAfter(now);
  const isToday = d.isSame(now, 'day');
  const isTomorrow = d.isSame(now.add(1, 'day'), 'day');
  const isYesterday = d.isSame(now.subtract(1, 'day'), 'day');
  
  const diffSeconds = Math.abs(now.diff(d, 'second'));
  const diffMinutes = Math.abs(now.diff(d, 'minute'));
  const diffHours = Math.abs(now.diff(d, 'hour'));
  const diffDays = Math.abs(now.diff(d, 'day'));
  
  const useShortMonth = shortMonth !== null ? shortMonth : userPreferences.shortMonthNames;
  const monthFormat = useShortMonth ? 'MMM' : 'MMMM';
  
  // FUTURE DATES
  if (isFuture) {
    if (isToday) {
      return showTime ? `Today at ${formatTime(date)}` : 'Today';
    }
    
    if (isTomorrow) {
      return showTime ? `Tomorrow at ${formatTime(date)}` : 'Tomorrow';
    }
    
    if (diffDays < 7) {
      return showTime ? `${d.format('ddd')} at ${formatTime(date)}` : d.format('dddd');
    }
    
    const yearFormat = d.isSame(now, 'year') && !showYear ? '' : ', YYYY';
    const format = `${monthFormat} D${yearFormat}`;
    
    if (showTime) {
      return `${d.format(format)} at ${formatTime(date)}`;
    }
    
    let result = d.format(format);
    return capitalize ? result : result.toLowerCase();
  }
  
  // PAST DATES
  if (diffSeconds < 60) {
    return 'A few seconds ago';
  }
  
  if (diffMinutes < 60) {
    const minutes = Math.floor(diffMinutes);
    if (minutes === 0) return 'Just now';
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  if (diffHours < 24 && !isToday && !isYesterday) {
    const hours = Math.floor(diffHours);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  if (isToday) {
    return showTime ? `Today at ${formatTime(date)}` : 'Today';
  }
  
  if (isYesterday) {
    return showTime ? `Yesterday at ${formatTime(date)}` : 'Yesterday';
  }
  
  if (diffDays < 7) {
    return showTime ? `${d.format('ddd')} at ${formatTime(date)}` : d.format('dddd');
  }
  
  const yearFormat = d.isSame(now, 'year') && !showYear ? '' : ', YYYY';
  const format = `${monthFormat} D${yearFormat}`;
  
  if (showTime) {
    return `${d.format(format)} at ${formatTime(date)}`;
  }
  
  let result = d.format(format);
  return capitalize ? result : result.toLowerCase();
}

/**
 * Format exactly like your screenshot examples with proper future date handling
 * Always uses 3-letter month abbreviations (Dec, Jan, Feb, etc.)
 */
export function formatLikeScreenshot(date) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  const now = dayjs();
  const isFuture = d.isAfter(now);
  const isToday = d.isSame(now, 'day');
  const isTomorrow = d.isSame(now.add(1, 'day'), 'day');
  const isYesterday = d.isSame(now.subtract(1, 'day'), 'day');
  
  const diffSeconds = Math.abs(now.diff(d, 'second'));
  const diffDays = Math.abs(now.diff(d, 'day'));
  
  // FUTURE DATES
  if (isFuture) {
    if (isToday) {
      return `Today at ${formatTime(date)}`;
    }
    
    if (isTomorrow) {
      return `Tomorrow at ${formatTime(date)}`;
    }
    
    if (diffDays < 7) {
      return `${d.format('ddd')} at ${formatTime(date)}`;
    }
    
    if (d.isSame(now, 'year')) {
      return d.format('MMM D'); // Dec 8, Oct 26 (3-letter month)
    }
    
    return d.format('MMM D, YYYY'); // Oct 2, 2024 (3-letter month)
  }
  
  // PAST DATES
  if (diffSeconds < 60) {
    return 'A few seconds ago';
  }
  
  if (isToday) {
    return `Today at ${formatTime(date)}`;
  }
  
  if (isYesterday) {
    return `Yesterday at ${formatTime(date)}`;
  }
  
  if (diffDays < 7) {
    return `${d.format('ddd')} at ${formatTime(date)}`;
  }
  
  if (d.isSame(now, 'year')) {
    return d.format('MMM D'); // Dec 8, Oct 26 (3-letter month)
  }
  
  return d.format('MMM D, YYYY'); // Oct 2, 2024 (3-letter month)
}

/**
 * Get detailed time breakdown with future support
 */
export function getTimeBreakdown(date) {
  if (!date) return null;
  
  const d = dayjs(date);
  if (!d.isValid()) return null;
  
  const now = dayjs();
  const diffSeconds = now.diff(d, 'second');
  const diffMinutes = Math.floor(Math.abs(diffSeconds) / 60);
  const diffHours = Math.floor(Math.abs(diffSeconds) / 3600);
  const diffDays = Math.floor(Math.abs(diffSeconds) / 86400);
  
  const isFuture = d.isAfter(now);
  const isToday = d.isSame(now, 'day');
  const isTomorrow = d.isSame(now.add(1, 'day'), 'day');
  const isYesterday = d.isSame(now.subtract(1, 'day'), 'day');
  
  return {
    seconds: diffSeconds,
    absoluteSeconds: Math.abs(diffSeconds),
    minutes: diffMinutes,
    hours: diffHours,
    days: diffDays,
    weeks: Math.floor(diffDays / 7),
    months: Math.floor(diffDays / 30),
    years: Math.floor(diffDays / 365),
    
    isFuture,
    isPast: d.isBefore(now),
    isToday,
    isYesterday,
    isTomorrow,
    isThisWeek: diffDays < 7,
    isThisMonth: diffDays < 30,
    isThisYear: d.isSame(now, 'year'),
    
    humanized: isFuture ? `in ${d.fromNow(true)}` : d.fromNow(),
    formatted: formatDateTime(date),
    formattedShort: formatLikeScreenshot(date)
  };
}

// ==================== DATE MANIPULATION ====================

/**
 * Add time to a date
 */
export function addToDate(date, amount, unit = 'day') {
  const d = dayjs(date);
  if (!d.isValid()) return date;
  return d.add(amount, unit).toDate();
}

/**
 * Subtract time from a date
 */
export function subtractFromDate(date, amount, unit = 'day') {
  const d = dayjs(date);
  if (!d.isValid()) return date;
  return d.subtract(amount, unit).toDate();
}

/**
 * Get start/end of period
 */
export function startOf(date, unit = 'day') {
  const d = dayjs(date);
  if (!d.isValid()) return date;
  return d.startOf(unit).toDate();
}

export function endOf(date, unit = 'day') {
  const d = dayjs(date);
  if (!d.isValid()) return date;
  return d.endOf(unit).toDate();
}

/**
 * Get difference between two dates
 */
export function dateDiff(date1, date2, unit = 'day') {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  
  if (!d1.isValid() || !d2.isValid()) return 0;
  
  return d2.diff(d1, unit);
}

// ==================== VALIDATION & PARSING ====================

/**
 * Check if a string is a valid date
 */
export function isValidDate(dateString) {
  if (!dateString) return false;
  
  const d = dayjs(dateString);
  return d.isValid();
}

/**
 * Parse date string with multiple format support
 */
export function parseDate(dateString, format = null) {
  if (!dateString) return null;
  
  let d;
  if (format) {
    d = dayjs(dateString, format);
  } else {
    d = dayjs(dateString);
  }
  
  return d.isValid() ? d.toDate() : null;
}

// ==================== FILE/DOCUMENT SPECIFIC ====================

/**
 * Format file modified/created dates (like your screenshot)
 * Always uses 3-letter month abbreviations
 */
export function formatFileDate(date, type = 'Modified') {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  const now = dayjs();
  const isFuture = d.isAfter(now);
  const isToday = d.isSame(now, 'day');
  const isTomorrow = d.isSame(now.add(1, 'day'), 'day');
  const isYesterday = d.isSame(now.subtract(1, 'day'), 'day');
  
  const diffSeconds = Math.abs(now.diff(d, 'second'));
  
  // FUTURE DATES
  if (isFuture) {
    if (diffSeconds < 60) {
      return 'In a few seconds';
    }
    
    if (isToday) {
      return `Today at ${formatTime(date)}`;
    }
    
    if (isTomorrow) {
      return `Tomorrow at ${formatTime(date)}`;
    }
    
    if (d.isSame(now, 'year')) {
      return d.format('MMM D'); // Dec 8 (3-letter month)
    }
    
    return d.format('MMM D, YYYY'); // Oct 2, 2024 (3-letter month)
  }
  
  // PAST DATES
  if (diffSeconds < 60) {
    return 'A few seconds ago';
  }
  
  if (isToday) {
    return `Today at ${formatTime(date)}`;
  }
  
  if (isYesterday) {
    return `Yesterday at ${formatTime(date)}`;
  }
  
  if (d.isSame(now, 'year')) {
    return d.format('MMM D'); // Dec 8 (3-letter month)
  }
  
  return d.format('MMM D, YYYY'); // Oct 2, 2024 (3-letter month)
}

/**
 * Format upload date for document management
 */
export function formatUploadDate(date) {
  return formatFileDate(date, 'Uploaded');
}

/**
 * Format last modified date
 */
export function formatLastModified(date) {
  return formatFileDate(date, 'Modified');
}

// ==================== FUTURE DATE FORMATTING ====================

/**
 * Format future dates in a user-friendly way with 3-letter months
 */
export function formatFutureDate(date) {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return 'Invalid date';
  
  const now = dayjs();
  if (!d.isAfter(now)) {
    return formatLikeScreenshot(date);
  }
  
  const isToday = d.isSame(now, 'day');
  const isTomorrow = d.isSame(now.add(1, 'day'), 'day');
  
  if (isToday) {
    return `Today at ${formatTime(date)}`;
  }
  
  if (isTomorrow) {
    return `Tomorrow at ${formatTime(date)}`;
  }
  
  const diffDays = Math.abs(now.diff(d, 'day'));
  
  if (diffDays < 7) {
    return `${d.format('dddd')} at ${formatTime(date)}`;
  }
  
  if (d.isSame(now, 'year')) {
    return d.format('MMM D'); // Dec 25 (3-letter month)
  }
  
  return d.format('MMM D, YYYY'); // Dec 25, 2025 (3-letter month)
}

// ==================== QUICK FORMATTERS ====================

/**
 * Quick format - default settings with AM/PM
 */
export function format(date) {
  return formatDateTime(date);
}

/**
 * Short date only (MM/DD/YY)
 */
export function shortDate(date) {
  return formatDate(date, 'MM/DD/YY');
}

/**
 * Long date with weekday
 */
export function longDate(date, useShortMonth = null) {
  const shortMonth = useShortMonth !== null ? useShortMonth : userPreferences.shortMonthNames;
  const format = shortMonth ? 'dddd, MMM D, YYYY' : 'dddd, MMMM D, YYYY';
  return formatDate(date, format);
}

/**
 * Time only with AM/PM
 */
export function time(date, showSeconds = false) {
  const d = dayjs(date);
  if (!d.isValid()) return '';
  return d.format(showSeconds ? 'h:mm:ss A' : 'h:mm A');
}

/**
 * For filenames/timestamps
 */
export function timestamp(date = new Date()) {
  return dayjs(date).format('YYYYMMDD_HHmmss');
}

/**
 * For API/DB storage
 */
export function dbDate(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Simple time ago (less than 24 hours) with short months for older dates
 */
export function simpleTimeAgo(date) {
  const d = dayjs(date);
  if (!d.isValid()) return '';
  
  const now = dayjs();
  const isFuture = d.isAfter(now);
  const diffHours = Math.abs(now.diff(d, 'hour'));
  
  if (isFuture) {
    if (diffHours < 1) {
      const diffMinutes = Math.abs(now.diff(d, 'minute'));
      return diffMinutes <= 1 ? 'In 1 minute' : `In ${diffMinutes}m`;
    }
    
    if (diffHours < 24) {
      return `In ${diffHours}h`;
    }
    
    const diffDays = Math.abs(now.diff(d, 'day'));
    if (diffDays < 7) {
      return `In ${diffDays}d`;
    }
    
    return d.format('MMM D'); // Dec 25 (3-letter month)
  }
  
  // Past dates
  if (diffHours < 1) {
    const diffMinutes = now.diff(d, 'minute');
    return diffMinutes <= 1 ? 'Just now' : `${diffMinutes}m ago`;
  }
  
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  
  const diffDays = now.diff(d, 'day');
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  
  return d.format('MMM D'); // Dec 25 (3-letter month)
}

/**
 * Format with short month (3 letters) always
 */
export function shortMonthDate(date, showYear = true) {
  const d = dayjs(date);
  if (!d.isValid()) return '';
  
  const now = dayjs();
  const yearFormat = d.isSame(now, 'year') && !showYear ? '' : ', YYYY';
  return d.format(`MMM D${yearFormat}`); // Always 3-letter month
}

/**
 * Format with full month name
 */
export function fullMonthDate(date, showYear = true) {
  const d = dayjs(date);
  if (!d.isValid()) return '';
  
  const now = dayjs();
  const yearFormat = d.isSame(now, 'year') && !showYear ? '' : ', YYYY';
  return d.format(`MMMM D${yearFormat}`); // Full month name
}

// ==================== VUE COMPOSABLE ====================

/**
 * Vue composable for reactive date formatting
 */
export function useDates() {
  const formatDateReactive = (date, format = null) => {
    return formatDate(date, format);
  };
  
  const formatTimeReactive = (date, withSeconds = null) => {
    return formatTime(date, withSeconds);
  };
  
  const smartDateReactive = (date, options = {}) => {
    return smartDate(date, options);
  };
  
  const formatLikeScreenshotReactive = (date) => {
    return formatLikeScreenshot(date);
  };
  
  const formatFutureDateReactive = (date) => {
    return formatFutureDate(date);
  };
  
  const timeAgoReactive = (date) => {
    return timeAgo(date);
  };
  
  const shortMonthDateReactive = (date, showYear = true) => {
    return shortMonthDate(date, showYear);
  };
  
  const updatePreferences = (prefs) => {
    return setUserPreferences(prefs);
  };
  
  return {
    formatDate: formatDateReactive,
    formatTime: formatTimeReactive,
    formatDateTime: formatDateReactive,
    smartDate: smartDateReactive,
    screenshotFormat: formatLikeScreenshotReactive,
    futureDate: formatFutureDateReactive,
    timeAgo: timeAgoReactive,
    shortMonthDate: shortMonthDateReactive,
    updatePreferences,
    preferences: getUserPreferences()
  };
}

// ==================== TESTING UTILITIES ====================

/**
 * Test function to verify month formatting
 */
export function testMonthFormatting() {
  const testDate = dayjs('2024-12-25');
  
  console.log('Month formatting examples:');
  console.log('Full month:', testDate.format('MMMM D, YYYY')); // December 25, 2024
  console.log('Short month:', testDate.format('MMM D, YYYY')); // Dec 25, 2024
  console.log('formatLikeScreenshot:', formatLikeScreenshot(testDate)); // Dec 25 (3-letter month)
  
  // Test all months
  const months = [
    '2024-01-15', '2024-02-15', '2024-03-15', '2024-04-15',
    '2024-05-15', '2024-06-15', '2024-07-15', '2024-08-15',
    '2024-09-15', '2024-10-15', '2024-11-15', '2024-12-15'
  ];
  
  console.log('\nAll months (short format):');
  months.forEach(date => {
    const d = dayjs(date);
    console.log(`${d.format('YYYY-MM-DD')}: ${d.format('MMM D')}`);
  });
}

// ==================== DEFAULT EXPORT ====================

export default {
  // Core functions
  formatDate,
  formatTime,
  formatDateTime,
  timeAgo,
  smartDate,
  formatLikeScreenshot,
  formatFutureDate,
  simpleTimeAgo,
  shortMonthDate,
  fullMonthDate,
  
  // Manipulation
  addToDate,
  subtractFromDate,
  startOf,
  endOf,
  dateDiff,
  
  // Validation
  isValidDate,
  parseDate,
  
  // Quick formatters
  format,
  shortDate,
  longDate,
  time,
  timestamp,
  dbDate,
  
  // File specific
  formatFileDate,
  formatUploadDate,
  formatLastModified,
  
  // Preferences
  setUserPreferences,
  getUserPreferences,
  resetPreferences,
  
  // Testing
  testMonthFormatting,
  
  // Constants
  DATE_FORMATS,
  TIME_FORMATS,
  DATETIME_FORMATS,
  
  // Composable
  useDates
};

/**
 * European date format (DD/MM/YYYY)
 */
export function europeanFormat(date) {
  return formatDate(date, 'DD/MM/YYYY');
}
