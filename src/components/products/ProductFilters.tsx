import React from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  X,
  Filter,
} from 'lucide-react';
import type { SortOption, ViewMode } from '../../types/product';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalFiltered: number;
  totalProducts: number;
  onResetFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
  totalProducts,
  onResetFilters,
}) => {
  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || sortBy !== 'newest';

  // Popular quick category pills
  const quickCategories = categories.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top row: Search bar + Category dropdown + Sort dropdown + View Mode */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, description, or brand..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category selector */}
        <div className="w-full md:w-56">
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-4 h-4" />
            </div>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 capitalize transition-all cursor-pointer"
            >
              <option value="all">All Categories ({totalProducts})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort selector */}
        <div className="w-full md:w-56">
          <label htmlFor="sort-select" className="sr-only">Sort products</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>
        </div>

        {/* View toggle (Grid / Table) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start md:self-auto shrink-0 border border-slate-200/80">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-indigo-600 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Grid view"
            aria-label="Switch to grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-indigo-600 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Table view"
            aria-label="Switch to table view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom row: Category quick filter pills + Active filter count + Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Quick filter:</span>
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1 rounded-full transition-colors font-medium cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {quickCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-full transition-colors capitalize font-medium cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{totalFiltered}</strong> of{' '}
            <strong className="text-slate-800">{totalProducts}</strong> products
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
