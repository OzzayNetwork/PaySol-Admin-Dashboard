// src/utils/fileIcons-simple.js


import dbIcon from "../assets/images/icons/accdb.svg"
import pdfIcon from "../assets/images/icons/pdf.svg"
import wordIcon from "../assets/images/icons/docx.svg"
import excelIcon from "../assets/images/icons/xlsx.svg"
import powerpointIcon from "../assets/images/icons/pptx.svg"
import csvIcon from "../assets/images/icons/csv.svg"
import imageIcon from "../assets/images/icons/photo.svg"
import videoIcon from "../assets/images/icons/video.svg"
import audioIcon from "../assets/images/icons/audio.svg"
import archiveIcon from "../assets/images/icons/zip.svg"
import codeIcon from "../assets/images/icons/code.svg"
import textIcon from "../assets/images/icons/txt.svg"
import folderIcon from "../assets/images/icons/folder.svg"
import defaultIcon from "../assets/images/icons/genericfile.svg"
import webIcon from "../assets/images/icons/html.svg"
import linkIcon from "../assets/images/icons/link.svg"
import fontIcon from "../assets/images/icons/font.svg"
import rtfIcon from "../assets/images/icons/rtf.svg"
import exeIcon from "../assets/images/icons/exe.svg"

// All-in-one mapping: extension -> icon component
export const fileIcons = {
  // Documents
  'pdf': pdfIcon,
  'doc': wordIcon,
  'docx': wordIcon,
  'txt': textIcon,
  'log': textIcon,
  'rtf': rtfIcon,
  'accdb': dbIcon,
    'exe': exeIcon,
  
  // Spreadsheets
  'xls': excelIcon,
  'xlsx': excelIcon,
  'csv': csvIcon,
  
  // Presentations
  'ppt': powerpointIcon,
  'pptx': powerpointIcon,
  
  // Images
  'jpg': imageIcon,
  'jpeg': imageIcon,
  'png': imageIcon,
  'gif': imageIcon,
  'svg': imageIcon,
  'bmp': imageIcon,
  'webp': imageIcon,
  
  // Videos
  'mp4': videoIcon,
  'webm': videoIcon,
  'avi': videoIcon,
  'mov': videoIcon,
  
  // Audio
  'mp3': audioIcon,
  'wav': audioIcon,
  'ogg': audioIcon,
  
  // Archives
  'zip': archiveIcon,
  'rar': archiveIcon,
  '7z': archiveIcon,
  
  // Code
  'html': webIcon,
  'css': codeIcon,
  'js': codeIcon,
  'json': codeIcon,
  'php': codeIcon,
  'py': codeIcon,

  // Font files
  'ttf': fontIcon,          // TrueType Font
  'otf': fontIcon,          // OpenType Font
  'woff': fontIcon,         // Web Open Font Format
  'woff2': fontIcon,        // Web Open Font Format 2
  'eot': fontIcon,          // Embedded OpenType (legacy IE)
  'fon': fontIcon,          // Windows Font Resource
  'fnt': fontIcon,          // Windows Font File
  'pfa': fontIcon,          // PostScript Font ASCII
  'pfb': fontIcon,          // PostScript Font Binary
  'dfont': fontIcon,        // Mac OS X Data Fork Font
  'font': fontIcon,        // Mac OS X Data Fork Font
  
  // Font collections
  'ttc': fontIcon,          // TrueType Collection (multiple fonts in one file)
  'otc': fontIcon,          // OpenType Collection
  
  // Adobe fonts
  'pcf': fontIcon,          // Portable Compiled Format
  'bdf': fontIcon,          // Glyph Bitmap Distribution Format
  
  // Special
  'folder': folderIcon,
  'link': linkIcon,
  
  // Default (must be last)
  'default': defaultIcon
};

/**
 * Get icon component for a file type
 * @param {string} fileType - File extension or file type string
 * @param {string} fileName - Optional filename for better detection
 * @returns {Component} Vue component or URL for the icon
 */
export function getFileIcon(fileType, fileName = '') {
  if (!fileType && !fileName) return fileIcons.default;
  
  // Clean input
  const input = (fileType || fileName).toLowerCase().trim();
  
  // Remove leading dot
  const cleanInput = input.replace(/^\./, '');
  
  // Try direct match first
  if (fileIcons[cleanInput]) {
    return fileIcons[cleanInput];
  }
  
  // Try to extract extension from filename
  if (input.includes('.')) {
    const parts = input.split('.');
    const extension = parts.pop();
    
    if (fileIcons[extension]) {
      return fileIcons[extension];
    }
  }
  
  // Check for partial matches (like "word" in "word document")
  const partialMatches = {
    'word': wordIcon,
    'excel': excelIcon,
    'powerpoint': powerpointIcon,
    'image': imageIcon,
    'video': videoIcon,
    'audio': audioIcon,
    'archive': archiveIcon,
    'code': codeIcon,
    'text': textIcon
  };
  
  for (const [key, icon] of Object.entries(partialMatches)) {
    if (input.includes(key)) {
      return icon;
    }
  }
  
  return fileIcons.default;
}