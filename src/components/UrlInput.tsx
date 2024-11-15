import React from 'react';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string;
}

export function UrlInput({ url, setUrl, onSubmit, isLoading, error }: UrlInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL here..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Shortening...
            </span>
          ) : (
            'Shorten URL'
          )}
        </button>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </form>
  );
}