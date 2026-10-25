const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Matches any of `words` as a whole word: a letter or digit on either side
 * means "inside a word", so "ge" doesn't match "Strategy" and "pm" doesn't
 * match "Development". Alternatives are tried in the order given.
 */
export const wholeWords = (words: string[], flags = "iu") =>
  new RegExp(`(?<![\\p{L}\\p{N}])(?:${words.map(escape).join("|")})(?![\\p{L}\\p{N}])`, flags);
