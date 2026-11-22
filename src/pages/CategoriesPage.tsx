import React, { useState } from 'react';
import type { Product, CategoryInfo } from '../types/product';
import { ArrowRight, Package, DollarSign, Plus, FolderPlus, X, Lock,} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { getCategoryVariant } from '../utils/categoryUtils';
import { usePermissions } from '../hooks/usePermissions';

interface CategoriesPageProps {
  products: Product[];
  categories: string[];
  onSelectCategory: (category: string) => void;
  onNavigateToProducts: () => void;
  onAddCategoryNotice?: (name: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  categories,
  onSelectCategory,
  onNavigateToProducts,
  onAddCategoryNotice,
}) => {
  const { canManageCategories } = usePermissions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Aggregate stats per category
  const categoryStats: CategoryInfo[] = categories.map((cat) => {
    const matching = products.filter(
      (p) => p.category.toLowerCase() === cat.toLowerCase()
    );
    const total = matching.reduce((sum, p) => sum + p.price, 0);
    const avg = matching.length > 0 ? total / matching.length : 0;

    return {
      name: cat,
      count: matching.length,
      averagePrice: Math.round(avg * 100) / 100,
    };
  });

  // Sort by count descending
  categoryStats.sort((a, b) => b.count - a.count);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageCategories) return;
    const trimmed = newCategoryName.trim().toLowerCase();
    if (!trimmed) return;

    if (onAddCategoryNotice) {
      onAddCategoryNotice(trimmed);
    }
    setNewCategoryName('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore inventory distribution, pricing averages, and product densities across all {categories.length} categories.
          </p>
        </div>

        {/* Category Management Action (Admin Only) */}
        {canManageCategories ? (
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <FolderPlus className="w-4 h-4" />
            Create Category
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Category management requires Admin role</span>
          </div>
        )}
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryStats.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              onSelectCategory(cat.name);
              onNavigateToProducts();
            }}
            className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-6 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={getCategoryVariant(cat.name)} size="md">
                  {cat.name}
                </Badge>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 capitalize group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore items belonging to the {cat.name} line
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-medium block">Total Products</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-indigo-500" />
                  {cat.count} items
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-medium block">Average Price</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  ${cat.averagePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal (Admin Only) */}
      {isAddModalOpen && canManageCategories && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            role="presentation"
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
                  <p className="text-xs text-slate-500">Admin Category Management</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label htmlFor="cat-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category Name
                </label>
                <input
                  id="cat-name-input"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. wearables, gaming, furniture"
                  className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all"
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newCategoryName.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
