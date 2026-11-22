import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../schemas/productSchema';
import type { ProductFormSchema } from '../../schemas/productSchema';
import type { Product, ProductFormData } from '../../types/product';
import {
  X,
  Plus,
  Edit3,
  Image as ImageIcon,
  DollarSign,
  Star,
  Tag,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: Product | null;
  existingCategories: string[];
}

const SAMPLE_IMAGES = [
  {
    name: 'Smart Device',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Audio Gear',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Laptop / Tech',
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lifestyle / Decor',
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
  },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  existingCategories,
}) => {
  const isEditMode = !!initialData;
  const [previewErrorUrl, setPreviewErrorUrl] = useState<string | null>(null);

  const formValues: ProductFormSchema = useMemo(() => {
    if (initialData) {
      return {
        title: initialData.title,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
        thumbnail: initialData.thumbnail,
        rating: initialData.rating,
        brand: initialData.brand || '',
        stock: initialData.stock ?? 25,
      };
    }
    return {
      title: '',
      description: '',
      price: 49.99,
      category: existingCategories[0] || 'smartphones',
      thumbnail: SAMPLE_IMAGES[0].url,
      rating: 4.8,
      brand: '',
      stock: 30,
    };
  }, [initialData, existingCategories]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
    values: formValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const watchedThumbnail = useWatch({ control, name: 'thumbnail' });
  const watchedRating = useWatch({ control, name: 'rating' });

  const isImageError = previewErrorUrl === watchedThumbnail;

  // Handle form submission
  const onFormSubmit = (data: ProductFormSchema) => {
    onSubmit({
      title: data.title.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      category: data.category.trim().toLowerCase(),
      thumbnail: data.thumbnail.trim(),
      rating: Number(data.rating),
      brand: data.brand?.trim() || 'Custom',
      stock: data.stock !== undefined ? Number(data.stock) : 50,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${
                isEditMode
                  ? 'bg-amber-600 shadow-amber-600/20'
                  : 'bg-indigo-600 shadow-indigo-600/20'
              }`}
            >
              {isEditMode ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditMode
                  ? 'Update product details and pricing'
                  : 'Fill in product information to add to the inventory'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="product-title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="product-title"
              type="text"
              placeholder="e.g. Ultra Wireless Noise-Cancelling Headphones"
              {...register('title')}
              className={`w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="product-description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="product-description"
              rows={3}
              placeholder="Provide a detailed description of features, materials, and specs..."
              {...register('description')}
              className={`w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price & Rating (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label htmlFor="product-price" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Price (USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  id="product-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="29.99"
                  {...register('price', { valueAsNumber: true })}
                  className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.price
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="product-rating" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Rating (0.0 to 5.0) <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {watchedRating ? Number(watchedRating).toFixed(1) : '0.0'}
                </span>
              </div>
              <input
                id="product-rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.5"
                {...register('rating', { valueAsNumber: true })}
                className={`w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                  errors.rating
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {errors.rating && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.rating.message}
                </p>
              )}
            </div>
          </div>

          {/* Category & Brand (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label htmlFor="product-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Tag className="w-4 h-4" />
                </div>
                <input
                  id="product-category"
                  type="text"
                  list="category-suggestions"
                  placeholder="e.g. electronics, audio, fashion"
                  {...register('category')}
                  className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.category
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                <datalist id="category-suggestions">
                  {existingCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                  <option value="smartphones" />
                  <option value="laptops" />
                  <option value="audio" />
                  <option value="fragrances" />
                  <option value="skincare" />
                  <option value="groceries" />
                  <option value="home-decoration" />
                  <option value="accessories" />
                </datalist>
              </div>
              {errors.category && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="product-brand" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Brand (Optional)
              </label>
              <input
                id="product-brand"
                type="text"
                placeholder="e.g. Sony, Apple, Nike"
                {...register('brand')}
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Image URL & Live Preview */}
          <div>
            <label htmlFor="product-thumbnail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Image URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <input
                id="product-thumbnail"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                {...register('thumbnail')}
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-900 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                  errors.thumbnail
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.thumbnail && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.thumbnail.message}
              </p>
            )}

            {/* Quick preset image pickers */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Sample images:</span>
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.name}
                  type="button"
                  onClick={() => {
                    setValue('thumbnail', sample.url, { shouldValidate: true });
                    setPreviewErrorUrl(null);
                  }}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  {sample.name}
                </button>
              ))}
            </div>

            {/* Live Image Preview Card */}
            {watchedThumbnail && (
              <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                  <img
                    src={watchedThumbnail}
                    alt="Preview"
                    onError={() => setPreviewErrorUrl(watchedThumbnail)}
                    onLoad={() => {
                      if (previewErrorUrl === watchedThumbnail) {
                        setPreviewErrorUrl(null);
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs">
                  {isImageError ? (
                    <div className="text-amber-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Image could not be loaded from this URL. A fallback image will be shown.
                    </div>
                  ) : (
                    <div className="text-emerald-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Valid image preview loaded successfully.
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5 font-mono">
                    {watchedThumbnail}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              {isEditMode ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
