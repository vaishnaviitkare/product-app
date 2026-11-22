import React from 'react';
import type { Product, CategoryInfo } from '../types/product';
import { ArrowRight, Package, DollarSign } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { getCategoryVariant } from '../utils/categoryUtils';

interface CategoriesPageProps {
  products: Product[];
  categories: string[];
  onSelectCategory: (category: string) => void;
  onNavigateToProducts: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  categories,
  onSelectCategory,
  onNavigateToProducts,
}) => {
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Product Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore inventory distribution, pricing averages, and product densities across all {categories.length} categories.
        </p>
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
    </div>
  );
};
