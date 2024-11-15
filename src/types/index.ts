export interface UrlHistory {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  id: string;
}

export interface ApiResponse {
  success: boolean;
  data?: {
    full_short_link: string;
    [key: string]: any;
  };
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}