import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import { UrlInput } from './components/UrlInput';
import { HistoryList } from './components/HistoryList';
import { UrlHistory } from './types';
import { validateUrl } from './utils/validation';
import { shortenUrl } from './services/api';

function App() {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<UrlHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('urlHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Failed to load history:', err);
        localStorage.removeItem('urlHistory');
      }
    }
  }, []);

  const saveToHistory = (newEntry: UrlHistory) => {
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    try {
      localStorage.setItem('urlHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('Failed to save history:', err);
    }
  };

  const handleSubmit = async () => {
    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid URL');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await shortenUrl(url);

    if (!result.success || !result.data) {
      setError(result.error || 'Failed to shorten URL');
      setIsLoading(false);
      return;
    }

    const newEntry: UrlHistory = {
      originalUrl: url,
      shortUrl: result.data.full_short_link,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID()
    };

    saveToHistory(newEntry);
    setUrl('');
    setError('');
    setIsLoading(false);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const deleteEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    try {
      localStorage.setItem('urlHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('Failed to update history:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link2 className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Transform your long URLs into short, shareable links</p>
        </div>

        <UrlInput
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        <HistoryList
          history={history}
          copiedId={copiedId}
          onCopy={copyToClipboard}
          onDelete={deleteEntry}
        />
      </div>
    </div>
  );
}

export default App;