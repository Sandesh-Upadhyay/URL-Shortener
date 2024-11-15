import { ApiResponse } from '../types';
import { sanitizeUrl } from '../utils/validation';

const API_BASE_URL = 'https://tinyurl.com/api-create.php';

export async function shortenUrl(url: string): Promise<ApiResponse> {
  try {
    const sanitizedUrl = sanitizeUrl(url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${API_BASE_URL}?url=${encodeURIComponent(sanitizedUrl)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'text/plain',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const shortUrl = await response.text();

    if (!shortUrl || !shortUrl.startsWith('https://')) {
      throw new Error('Invalid response from URL shortener service');
    }

    return {
      success: true,
      data: {
        full_short_link: shortUrl
      }
    };
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. Please try again.'
        };
      }
    }
    
    return {
      success: false,
      error: 'Failed to shorten URL. Please try again in a moment.'
    };
  }
}