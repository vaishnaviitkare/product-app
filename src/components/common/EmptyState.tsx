import React from 'react';
import { SearchX, PackageOpen, RotateCcw, Plus } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'products' | 'error';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'search',
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  const isSearch = type === 'search';
  const isError = type === 'error';

  const defaultTitle = isError
    ? 'Unable to load products'
    : isSearch
    ? 'No matching products found'
    : 'No products in inventory';

  const defaultDescription = isError
    ? 'We encountered an issue fetching products from the API. Please check your connection or reset to defaults.'
    : isSearch
    ? 'Try adjusting your search terms or clearing your category filters to find what you are looking for.'
    : 'Your product catalogue is currently empty. Add your first product or restore the default DummyJSON catalogue.';

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs my-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
        {isSearch ? (
          <SearchX className="w-8 h-8" />
        ) : isError ? (
          <RotateCcw className="w-8 h-8 text-rose-500" />
        ) : (
          <PackageOpen className="w-8 h-8" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-1">
        {title || defaultTitle}
      </h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {description || defaultDescription}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          >
            {isSearch ? (
              <RotateCcw className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {actionText || (isSearch ? 'Reset Filters' : 'Add First Product')}
          </button>
        )}

        {secondaryActionText && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};
