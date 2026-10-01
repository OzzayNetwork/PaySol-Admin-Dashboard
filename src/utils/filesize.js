// src/utils/fileSize.js

/**
 * File Size Formatter Utility
 * Converts bytes to human-readable file sizes
 */

// Storage units in bytes
export const STORAGE_UNITS = {
  BYTE: 'B',
  KILOBYTE: 'KB',
  MEGABYTE: 'MB',
  GIGABYTE: 'GB',
  TERABYTE: 'TB',
  PETABYTE: 'PB'
};

// Standard conversion factors (base-10 for storage)
export const CONVERSION_FACTORS = {
  BYTE: 1,
  KILOBYTE: 1000,          // Base-10 for storage (1000 bytes)
  MEGABYTE: 1000000,       // 1000^2
  GIGABYTE: 1000000000,    // 1000^3
  TERABYTE: 1000000000000, // 1000^4
  PETABYTE: 1000000000000000 // 1000^5
};

// Alternative: Base-2 (binary) for memory (1024 bytes = 1 KB)
export const BINARY_CONVERSION_FACTORS = {
  BYTE: 1,
  KIBIBYTE: 1024,           // Base-2 (1024 bytes)
  MEBIBYTE: 1048576,        // 1024^2
  GIBIBYTE: 1073741824,     // 1024^3
  TEBIBYTE: 1099511627776,  // 1024^4
  PEBIBYTE: 1125899906842624 // 1024^5
};

// Binary unit names (IEC standard)
export const BINARY_UNITS = {
  BYTE: 'B',
  KIBIBYTE: 'KiB',
  MEBIBYTE: 'MiB',
  GIBIBYTE: 'GiB',
  TEBIBYTE: 'TiB',
  PEBIBYTE: 'PiB'
};

/**
 * Format bytes to human-readable file size
 * @param {number|string} bytes - File size in bytes
 * @param {object} options - Formatting options
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes, options = {}) {
  const {
    decimals = 2,
    binary = false,         // Use binary (KiB) or decimal (KB) units
    fixedDecimals = false,  // Always show specified decimals
    space = true,           // Add space between number and unit
    unitSeparator = space ? ' ' : '',
    autoUnit = true,        // Automatically choose best unit
    unit = null,            // Force specific unit (KB, MB, etc.)
    locale = 'en-US',       // Locale for number formatting
    compact = false         // Use compact notation for large numbers
  } = options;

  // Parse input
  let size = parseFloat(bytes);
  
  // Validate input
  if (isNaN(size) || !isFinite(size)) {
    return 'Invalid size';
  }
  
  if (size < 0) {
    return 'Invalid size';
  }
  
  // Handle zero bytes
  if (size === 0) {
    return `0${unitSeparator}${STORAGE_UNITS.BYTE}`;
  }

  // Choose conversion factors and units
  const factors = binary ? BINARY_CONVERSION_FACTORS : CONVERSION_FACTORS;
  const units = binary ? BINARY_UNITS : STORAGE_UNITS;

  // If unit is specified, use it
  if (unit && units[unit.toUpperCase()]) {
    const targetUnit = unit.toUpperCase();
    const factor = factors[targetUnit];
    const formattedSize = formatNumber(size / factor, decimals, fixedDecimals, locale, compact);
    return `${formattedSize}${unitSeparator}${units[targetUnit]}`;
  }

  // Auto-select best unit
  if (!autoUnit) {
    // Default to bytes if autoUnit is false
    const formattedSize = formatNumber(size, decimals, fixedDecimals, locale, compact);
    return `${formattedSize}${unitSeparator}${units.BYTE}`;
  }

  // Determine appropriate unit
  const unitsList = binary
    ? ['BYTE', 'KIBIBYTE', 'MEBIBYTE', 'GIBIBYTE', 'TEBIBYTE', 'PEBIBYTE']
    : ['BYTE', 'KILOBYTE', 'MEGABYTE', 'GIGABYTE', 'TERABYTE', 'PETABYTE'];

  let unitIndex = 0;
  let divisor = 1;

  // Find the largest unit that makes sense
  for (let i = unitsList.length - 1; i >= 0; i--) {
    const currentUnit = unitsList[i];
    const factor = factors[currentUnit];
    
    if (size >= factor) {
      unitIndex = i;
      divisor = factor;
      break;
    }
  }

  const targetUnit = unitsList[unitIndex];
  const formattedSize = formatNumber(size / divisor, decimals, fixedDecimals, locale, compact);
  
  return `${formattedSize}${unitSeparator}${units[targetUnit]}`;
}

/**
 * Format number with locale support
 */
function formatNumber(num, decimals, fixedDecimals, locale, compact) {
  let value = num;
  
  // Apply rounding based on decimals
  if (!fixedDecimals) {
    // Dynamic decimals: more decimals for small numbers
    let dynamicDecimals = decimals;
    if (num < 1) dynamicDecimals = Math.max(decimals, 2);
    if (num < 0.1) dynamicDecimals = Math.max(decimals, 3);
    
    const factor = Math.pow(10, dynamicDecimals);
    value = Math.round(num * factor) / factor;
  }
  
  // Create options for Intl.NumberFormat
  const options = {
    minimumFractionDigits: fixedDecimals ? decimals : 0,
    maximumFractionDigits: decimals,
    useGrouping: true
  };
  
  if (compact && num >= 1000) {
    options.notation = 'compact';
    options.compactDisplay = 'short';
  }
  
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Parse human-readable size back to bytes
 * @param {string} sizeString - Formatted size (e.g., "2.5 MB")
 * @returns {number} Size in bytes
 */
export function parseFileSize(sizeString) {
  if (!sizeString || typeof sizeString !== 'string') {
    return 0;
  }

  // Clean and parse the string
  const cleanString = sizeString.trim().toUpperCase();
  
  // Extract number and unit
  const match = cleanString.match(/^([\d.,]+)\s*([A-Za-z]+)$/);
  if (!match) {
    return 0;
  }

  const numberStr = match[1].replace(',', '.');
  const unit = match[2];
  
  const number = parseFloat(numberStr);
  if (isNaN(number)) {
    return 0;
  }

  // Map units to conversion factors (handle both decimal and binary)
  const unitMap = {
    // Decimal units
    'B': CONVERSION_FACTORS.BYTE,
    'KB': CONVERSION_FACTORS.KILOBYTE,
    'MB': CONVERSION_FACTORS.MEGABYTE,
    'GB': CONVERSION_FACTORS.GIGABYTE,
    'TB': CONVERSION_FACTORS.TERABYTE,
    'PB': CONVERSION_FACTORS.PETABYTE,
    
    // Binary units
    'KIB': BINARY_CONVERSION_FACTORS.KIBIBYTE,
    'MIB': BINARY_CONVERSION_FACTORS.MEBIBYTE,
    'GIB': BINARY_CONVERSION_FACTORS.GIBIBYTE,
    'TIB': BINARY_CONVERSION_FACTORS.TEBIBYTE,
    'PIB': BINARY_CONVERSION_FACTORS.PEBIBYTE,
    
    // Common variations
    'BYTE': CONVERSION_FACTORS.BYTE,
    'BYTES': CONVERSION_FACTORS.BYTE,
    'K': CONVERSION_FACTORS.KILOBYTE,
    'M': CONVERSION_FACTORS.MEGABYTE,
    'G': CONVERSION_FACTORS.GIGABYTE,
    'T': CONVERSION_FACTORS.TERABYTE
  };

  const factor = unitMap[unit];
  if (!factor) {
    return 0;
  }

  return number * factor;
}

/**
 * Compare two file sizes
 * @param {string|number} sizeA - First size (bytes or formatted string)
 * @param {string|number} sizeB - Second size (bytes or formatted string)
 * @returns {number} -1 if A < B, 0 if A = B, 1 if A > B
 */
export function compareFileSizes(sizeA, sizeB) {
  const bytesA = typeof sizeA === 'string' ? parseFileSize(sizeA) : parseFloat(sizeA);
  const bytesB = typeof sizeB === 'string' ? parseFileSize(sizeB) : parseFloat(sizeB);
  
  if (bytesA < bytesB) return -1;
  if (bytesA > bytesB) return 1;
  return 0;
}

/**
 * Calculate total size of multiple files
 * @param {Array} files - Array of file objects with size properties
 * @param {string} sizeProperty - Property name containing size (default: 'size')
 * @returns {object} { totalBytes, formattedTotal }
 */
export function calculateTotalSize(files, sizeProperty = 'size') {
  if (!Array.isArray(files)) {
    return { totalBytes: 0, formattedTotal: '0 B' };
  }

  const totalBytes = files.reduce((sum, file) => {
    const size = file[sizeProperty];
    if (typeof size === 'number') {
      return sum + size;
    }
    if (typeof size === 'string') {
      return sum + parseFileSize(size);
    }
    return sum;
  }, 0);

  return {
    totalBytes,
    formattedTotal: formatFileSize(totalBytes)
  };
}

/**
 * Check if file exceeds size limit
 * @param {number|string} fileSize - File size to check
 * @param {number|string} maxSize - Maximum allowed size
 * @returns {object} { exceeds: boolean, difference: number, message: string }
 */
export function checkSizeLimit(fileSize, maxSize) {
  const bytes = typeof fileSize === 'string' ? parseFileSize(fileSize) : fileSize;
  const maxBytes = typeof maxSize === 'string' ? parseFileSize(maxSize) : maxSize;
  
  const difference = bytes - maxBytes;
  const exceeds = difference > 0;
  
  let message = '';
  if (exceeds) {
    message = `File exceeds limit by ${formatFileSize(difference)}`;
  } else {
    const remaining = -difference;
    message = `${formatFileSize(remaining)} remaining`;
  }
  
  return {
    exceeds,
    difference,
    message,
    bytes,
    maxBytes
  };
}

/**
 * Get appropriate unit for a given byte size
 * @param {number} bytes - Size in bytes
 * @param {boolean} binary - Use binary units
 * @returns {string} Recommended unit
 */
export function getRecommendedUnit(bytes, binary = false) {
  const units = binary ? BINARY_UNITS : STORAGE_UNITS;
  const factors = binary ? BINARY_CONVERSION_FACTORS : CONVERSION_FACTORS;
  
  const unitList = binary
    ? ['BYTE', 'KIBIBYTE', 'MEBIBYTE', 'GIBIBYTE', 'TEBIBYTE', 'PEBIBYTE']
    : ['BYTE', 'KILOBYTE', 'MEGABYTE', 'GIGABYTE', 'TERABYTE', 'PETABYTE'];
  
  for (let i = unitList.length - 1; i >= 0; i--) {
    if (bytes >= factors[unitList[i]]) {
      return units[unitList[i]];
    }
  }
  
  return units.BYTE;
}

/**
 * Format file size with icon for display
 * @param {number} bytes - Size in bytes
 * @param {object} options - Formatting options
 * @returns {object} { text: string, icon: string, color: string }
 */
export function formatFileSizeWithIcon(bytes, options = {}) {
  const formatted = formatFileSize(bytes, options);
  
  // Determine icon based on size
  let icon = '📄'; // Default document icon
  let color = '#666';
  
  if (bytes === 0) {
    icon = '📄';
    color = '#999';
  } else if (bytes < 1024) {
    icon = '📄';
    color = '#666';
  } else if (bytes < 1048576) { // < 1 MB
    icon = '📄';
    color = '#4CAF50';
  } else if (bytes < 1073741824) { // < 1 GB
    icon = '💾';
    color = '#2196F3';
  } else {
    icon = '💽';
    color = '#FF9800';
  }
  
  return {
    text: formatted,
    icon,
    color,
    bytes
  };
}

// Pre-defined common size limits
export const SIZE_LIMITS = {
  EMAIL_ATTACHMENT: 25 * CONVERSION_FACTORS.MEGABYTE, // 25 MB
  WHATSAPP_MEDIA: 16 * CONVERSION_FACTORS.MEGABYTE,   // 16 MB
  INSTAGRAM_POST: 100 * CONVERSION_FACTORS.MEGABYTE,  // 100 MB
  DROPBOX_FREE: 2 * CONVERSION_FACTORS.GIGABYTE,      // 2 GB
  CD_CAPACITY: 700 * CONVERSION_FACTORS.MEGABYTE,     // 700 MB
  DVD_CAPACITY: 4.7 * CONVERSION_FACTORS.GIGABYTE,    // 4.7 GB
  BLURAY_CAPACITY: 25 * CONVERSION_FACTORS.GIGABYTE   // 25 GB
};

/**
 * Quick format - simple one-liner for common use
 */
export function formatSize(bytes) {
  return formatFileSize(bytes, { decimals: 1 });
}