import React from 'react';
import { Tags, ArrowRight } from 'lucide-react';

interface CategoryDistributionProps {
  categoryCounts: Record<string, number>;
  totalProducts: number;
  onSelectCategory: (category: string) => void;
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  categoryCounts,
  totalProducts,
  onSelectCategory,
}) => {
  // Sort categories by count descending
  const sortedCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const colors = [
    'bg-indigo-600',
    'bg-violet-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Tags className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Category Breakdown</h3>
              <p className="text-xs text-slate-500">Distribution of products across top categories</p>
            </div>
          </div>
        </div>

        <div className="space-y-3.5 mt-5">
          {sortedCategories.map(([category, count], idx) => {
            const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
            const barColor = colors[idx % colors.length];

            return (
              <div
                key={category}
                onClick={() => onSelectCategory(category)}
                className="group cursor-pointer hover:bg-slate-50/80 p-1.5 -mx-1.5 rounded-xl transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectCategory(category);
                  }
                }}
              >
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="capitalize text-slate-700 group-hover:text-indigo-600 font-semibold transition-colors flex items-center gap-1.5">
                    {category}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{count} items</span>
                    <span className="text-slate-400 font-mono text-[11px]">({percentage}%)</span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing top {sortedCategories.length} categories</span>
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
        >
          View all in Catalogue &rarr;
        </button>
      </div>
    </div>
  );
};
