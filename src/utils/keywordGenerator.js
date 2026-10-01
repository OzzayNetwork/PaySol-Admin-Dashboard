// utils/keywordGenerator.js

/**
 * ----------------------------------------
 * STEP 1: Define stop words
 * ----------------------------------------
 * These are common words that add little or no
 * meaning to search and keyword matching.
 */
const STOP_WORDS = [
  "and", "or", "the", "with", "for", "of", "in", "on", "at", "by", "to"
];

/**
 * ----------------------------------------
 * STEP 2: Remove empty values
 * ----------------------------------------
 * Filters out null, undefined, empty strings,
 * and other falsy values from the source list.
 */
function removeEmptyValues(sources = []) {
  return sources.filter(Boolean);
}

/**
 * ----------------------------------------
 * STEP 3: Combine values into one text string
 * ----------------------------------------
 * Joins all provided values into one string
 * so they can be processed together.
 */
function combineText(sources = []) {
  return sources.join(" ");
}

/**
 * ----------------------------------------
 * STEP 4: Split text into words
 * ----------------------------------------
 * Breaks the combined text into smaller parts
 * using spaces, commas, dots, and hyphens.
 */
function splitIntoWords(text = "") {
  return text.split(/[\s,.-]+/);
}

/**
 * ----------------------------------------
 * STEP 5: Normalize words
 * ----------------------------------------
 * Converts all words to lowercase so matching
 * stays consistent.
 */
function normalizeWords(words = []) {
  return words.map(word => word.toLowerCase());
}

/**
 * ----------------------------------------
 * STEP 6: Remove empty words
 * ----------------------------------------
 * Cleans up any blank values created during splitting.
 */
function removeEmptyWords(words = []) {
  return words.filter(word => word);
}

/**
 * ----------------------------------------
 * STEP 7: Remove stop words
 * ----------------------------------------
 * Excludes common words that do not improve
 * keyword quality.
 */
function removeStopWords(words = []) {
  return words.filter(word => !STOP_WORDS.includes(word));
}

/**
 * ----------------------------------------
 * STEP 8: Remove duplicates
 * ----------------------------------------
 * Keeps each keyword only once.
 */
function removeDuplicates(words = []) {
  return [...new Set(words)];
}

/**
 * ----------------------------------------
 * MAIN FUNCTION: Generate keywords
 * ----------------------------------------
 * Accepts an array of source values from the parent,
 * then processes them step by step.
 */
export function generateKeywords(sources = []) {
  // Step 1: Remove empty values from the raw sources
  const filledSources = removeEmptyValues(sources);

  // Step 2: Combine all values into one text block
  const combinedText = combineText(filledSources);

  // Step 3: Split the text into words
  let words = splitIntoWords(combinedText);

  // Step 4: Normalize words to lowercase
  words = normalizeWords(words);

  // Step 5: Remove blank words
  words = removeEmptyWords(words);

  // Step 6: Remove stop words
  words = removeStopWords(words);

  // Step 7: Remove duplicates
  const uniqueWords = removeDuplicates(words);
 //console.log(uniqueWords)

  return uniqueWords;
}