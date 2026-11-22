import React, { useState } from 'react';
import { Database, RotateCcw, X } from 'lucide-react';

interface PersistenceNoticeProps {
  onReset: () => void;
  productCount: number;
}

export const PersistenceNotice: React.FC<PersistenceNoticeProps> = ({
  onReset,
  productCount,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-indigo-50/90 border-b border-indigo-100/80 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-indigo-950 font-medium">
          <span className="p-1 rounded-md bg-indigo-100 text-indigo-700 shrink-0">
            <Database className="w-3.5 h-3.5" />
          </span>
          <span>
            <strong className="font-semibold text-indigo-900">Frontend-Only Persistence:</strong>{' '}
            All product creations, edits, and deletions persist in your browser&apos;s{' '}
            <code className="px-1.5 py-0.5 rounded bg-indigo-100/70 text-indigo-800 font-mono text-xs">localStorage</code>{' '}
            ({productCount} products stored). No real backend database is connected.
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Reset data to initial DummyJSON defaults"
          >
            <RotateCcw className="w-3 h-3 text-indigo-500" />
            Restore API Defaults
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-indigo-400 hover:text-indigo-700 p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
