import React from 'react';
import type { Product } from '../../types/product';
import {
  X,
  Star,
  Package,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { getCategoryVariant } from '../../utils/categoryUtils';
import { usePermissions } from '../../hooks/usePermissions';

interface ProductDetailsModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  product,
  onClose,
  onEdit,
  onDelete,
}) => {
  const { canEditProduct, canDeleteProduct } = usePermissions();

  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full sm:w-1/2 aspect-square rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-inner">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Details Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant={getCategoryVariant(product.category)}>
                  {product.category}
                </Badge>
                {product.isCustom && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white rounded-full">
                    Custom Created
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              {/* Title */}
              <h2 id="product-detail-title" className="text-xl font-bold text-slate-900 leading-snug">
                {product.title}
              </h2>

              {/* Brand */}
              {product.brand && (
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mt-1">
                  Brand: {product.brand}
                </p>
              )}

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Overview & Specifications
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Metadata Attributes */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Inventory Stock</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-indigo-500" />
                    {product.stock ?? 50} units
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Product ID</span>
                  <span className="font-mono font-bold text-slate-800 text-xs mt-1 block">
                    #{product.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons with permission checks */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
              {/* Delete button: Admin only */}
              {canDeleteProduct && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(product);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              )}

              {/* Edit button: Admin & Manager only */}
              {canEditProduct && (
                <button
                  type="button"
                  onClick={() => {
                    onEdit(product);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
