import React from 'react';

interface LoadingSkeletonProps {
  viewMode?: 'grid' | 'table';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  viewMode = 'grid',
  count = 8,
}) => {
  if (viewMode === 'table') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-pulse">
        <div className="h-12 bg-slate-100 border-b border-slate-200" />
        <div className="divide-y divide-slate-100">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0" />
                <div className="space-y-2 flex-1 max-w-sm">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="w-20 h-6 bg-slate-200 rounded-full" />
              <div className="w-16 h-4 bg-slate-200 rounded" />
              <div className="w-16 h-4 bg-slate-200 rounded" />
              <div className="w-20 h-8 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
        >
          {/* Shimmer image area */}
          <div className="w-full h-48 bg-slate-200 relative" />

          {/* Shimmer content area */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-20 h-5 bg-slate-200 rounded-full" />
                <div className="w-12 h-4 bg-slate-100 rounded" />
              </div>
              <div className="h-5 bg-slate-200 rounded-md w-4/5" />
              <div className="space-y-1.5">
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-3/4" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="h-6 bg-slate-200 rounded w-20" />
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded-lg" />
                <div className="w-8 h-8 bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
