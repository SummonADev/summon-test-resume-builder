/**
 * Utility functions for detecting and rendering hyperlinks in resume text
 */

// URL pattern regex
const URL_PATTERN = /https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Detect if text contains URLs or email addresses
 */
export function containsLinks(text: string): boolean {
  return URL_PATTERN.test(text);
}

/**
 * Parse text and extract links with their positions
 */
export function extractLinks(text: string): Array<{ text: string; url: string; start: number; end: number }> {
  const links: Array<{ text: string; url: string; start: number; end: number }> = [];
  let match;
  const regex = /https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  while ((match = regex.exec(text)) !== null) {
    let url = match[0];

    // Format email addresses as mailto links
    if (url.includes('@') && !url.startsWith('mailto:')) {
      url = `mailto:${url}`;
    }
    // Add https to www links
    else if (url.startsWith('www.')) {
      url = `https://${url}`;
    }

    links.push({
      text: match[0],
      url,
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return links;
}

/**
 * Convert plain text links to clickable elements (for React)
 * Returns array of strings and link objects
 */
export function parseTextWithLinks(text: string): (string | { text: string; url: string })[] {
  if (!text) return [];

  const links = extractLinks(text);
  if (links.length === 0) return [text];

  const result: (string | { text: string; url: string })[] = [];
  let lastEnd = 0;

  links.forEach((link) => {
    // Add text before link
    if (link.start > lastEnd) {
      result.push(text.slice(lastEnd, link.start));
    }
    // Add link
    result.push({
      text: link.text,
      url: link.url,
    });
    lastEnd = link.end;
  });

  // Add remaining text
  if (lastEnd < text.length) {
    result.push(text.slice(lastEnd));
  }

  return result;
}

/**
 * Format a URL for proper link rendering
 */
export function formatUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('mailto:')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.includes('@')) return `mailto:${url}`;
  return `https://${url}`;
}

/**
 * Check if a string is likely a URL or email
 */
export function isUrl(text: string): boolean {
  return /^(https?:\/\/|www\.|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.test(text);
}
