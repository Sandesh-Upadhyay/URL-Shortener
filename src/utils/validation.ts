import { ValidationResult } from '../types';

export function validateUrl(url: string): ValidationResult {
  if (!url.trim()) {
    return {
      isValid: false,
      error: 'Please enter a URL'
    };
  }

  let urlToCheck = url.trim();
  if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
    urlToCheck = `https://${urlToCheck}`;
  }

  try {
    const urlObject = new URL(urlToCheck);
    
    // Basic URL validation
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return {
        isValid: false,
        error: 'URL must start with http:// or https://'
      };
    }

    // Simple domain check
    const hostname = urlObject.hostname;
    if (!hostname || hostname.length < 1) {
      return {
        isValid: false,
        error: 'Please enter a valid domain name'
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL (e.g., https://example.com)'
    };
  }
}

export function sanitizeUrl(url: string): string {
  const trimmedUrl = url.trim();
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return `https://${trimmedUrl}`;
  }
  return trimmedUrl;
}