import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { Star, Eye, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getCategoryVariant } from '../../utils/categoryUtils';

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-3.5 px-4 sm:px-6">Product</th>
              <th scope="col" className="py-3.5 px-4">Category</th>
              <th scope="col" className="py-3.5 px-4">Rating</th>
              <th scope="col" className="py-3.5 px-4">Price</th>
              <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow: React.FC<{
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}> = ({ product, onView, onEdit, onDelete }) => {
  const [imgSrc, setImgSrc] = useState(product.thumbnail);

  return (
    <tr className="hover:bg-slate-50/70 transition-colors group">
      {/* Product Image and Title */}
      <td className="py-3.5 px-4 sm:px-6">
        <div className="flex items-center gap-3.5 max-w-md">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
            <img
              src={imgSrc}
              alt={product.title}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4
                onClick={() => onView(product)}
                className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer truncate"
              >
                {product.title}
              </h4>
              {product.isCustom && (
                <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-violet-100 text-violet-700 rounded">
                  Custom
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5 max-w-xs">
              {product.description}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <Badge variant={getCategoryVariant(product.category)}>
          {product.category}
        </Badge>
      </td>

      {/* Rating */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </td>

      {/* Price */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className="font-bold text-slate-900 text-base">
          ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onView(product)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            title="View Details"
            aria-label={`View ${product.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Product"
            aria-label={`Edit ${product.title}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Product"
            aria-label={`Delete ${product.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
