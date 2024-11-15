import React from 'react';
import { History, Clipboard, Check, ExternalLink, Trash2 } from 'lucide-react';
import { UrlHistory } from '../types';
import { formatDate } from '../utils';

interface HistoryListProps {
  history: UrlHistory[];
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  onDelete: (id: string) => void;
}

export function HistoryList({ history, copiedId, onCopy, onDelete }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">History</h2>
      </div>
      <div className="space-y-4">
        {history.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 mb-1">{formatDate(entry.createdAt)}</p>
              <p className="text-gray-900 font-medium truncate">{entry.originalUrl}</p>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={entry.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  {entry.shortUrl}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onCopy(entry.shortUrl, entry.id)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                title="Copy to clipboard"
              >
                {copiedId === entry.id ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Clipboard className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}