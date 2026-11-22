import React from 'react';
import type { Product } from '../../types/product';
import { Star, Eye, Edit2, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getCategoryVariant } from '../../utils/categoryUtils';

interface RecentProductsProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const RecentProducts: React.FC<RecentProductsProps> = ({
  products,
  onViewProduct,
  onEditProduct,
  onViewAll,
}) => {
  // Show top 5 products (sorted by rating and recency)
  const displayProducts = products.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Top Rated & Recent</h3>
              <p className="text-xs text-slate-500">Highlighted inventory items</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            All Products <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-50/60 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={getCategoryVariant(product.category)}>
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-slate-900">
                  ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onViewProduct(product)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Quick preview"
                    aria-label={`Preview ${product.title}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditProduct(product)}
                    className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit product"
                    aria-label={`Edit ${product.title}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
