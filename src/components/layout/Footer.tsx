import React from 'react';
import { Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/70 backdrop-blur-xs py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-700">Product Hub</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Responsive Admin Dashboard & Inventory System</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-slate-600">
            <Database className="w-3.5 h-3.5 text-indigo-500" />
            LocalStorage Mode
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
            React 19
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
            TypeScript
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
            Tailwind v4
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
            Zod
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
            React Hook Form
          </span>
        </div>
      </div>
    </footer>
  );
};
