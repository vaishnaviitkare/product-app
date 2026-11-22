import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { Star, Eye, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getCategoryVariant } from '../../utils/categoryUtils';
import { usePermissions } from '../../hooks/usePermissions';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onEdit,
  onDelete,
}) => {
  const { canEditProduct, canDeleteProduct } = usePermissions();
  const [imgSrc, setImgSrc] = useState(product.thumbnail);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <article
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Image area */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.title}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <Badge variant={getCategoryVariant(product.category)}>
            {product.category}
          </Badge>
          {product.isCustom && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white rounded-full shadow-xs">
              Custom
            </span>
          )}
        </div>

        {/* Rating overlay */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-xs text-xs font-bold text-slate-800 border border-slate-100">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {/* Quick action hover overlay with permission guards */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          {/* View Details: always available */}
          <button
            type="button"
            onClick={() => onView(product)}
            className="p-2.5 bg-white/95 hover:bg-white text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="View Details"
            aria-label={`View details of ${product.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Edit Product: hidden for Viewer */}
          {canEditProduct && (
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="p-2.5 bg-white/95 hover:bg-white text-slate-700 hover:text-amber-600 rounded-xl shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Edit Product"
              aria-label={`Edit ${product.title}`}
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}

          {/* Delete Product: hidden for Manager and Viewer (Admin only) */}
          {canDeleteProduct && (
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="p-2.5 bg-white/95 hover:bg-white text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Delete Product"
              aria-label={`Delete ${product.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Content info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {product.brand && (
            <p className="text-xs font-semibold text-indigo-600 tracking-wide uppercase mb-1">
              {product.brand}
            </p>
          )}

          <h3
            onClick={() => onView(product)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1 mb-2"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer: Price and bottom actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-xl font-extrabold text-slate-900">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View action button */}
            <button
              type="button"
              onClick={() => onView(product)}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
              title="View Details"
              aria-label={`View ${product.title}`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Edit action button: Admin & Manager only */}
            {canEditProduct && (
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                title="Edit Product"
                aria-label={`Edit ${product.title}`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}

            {/* Delete action button: Admin only */}
            {canDeleteProduct && (
              <button
                type="button"
                onClick={() => onDelete(product)}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Delete Product"
                aria-label={`Delete ${product.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
