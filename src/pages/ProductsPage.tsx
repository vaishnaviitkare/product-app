import React from 'react';
import type { Product, SortOption, ViewMode } from '../types/product';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductCard } from '../components/products/ProductCard';
import { ProductTable } from '../components/products/ProductTable';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  paginatedProducts: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onOpenAddModal: () => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onResetFilters: () => void;
  onRetry: () => void;
  onResetData: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  paginatedProducts,
  filteredProducts,
  loading,
  error,
  categories,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  currentPage,
  totalPages,
  onPageChange,
  onOpenAddModal,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  onResetFilters,
  onRetry,
  onResetData,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, search, filter, and manage your inventory with real-time updates.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Product
        </button>
      </div>

      {/* Filter and search control bar */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        totalFiltered={filteredProducts.length}
        totalProducts={products.length}
        onResetFilters={onResetFilters}
      />

      {/* Main product view area */}
      {loading ? (
        <LoadingSkeleton viewMode={viewMode} count={8} />
      ) : error ? (
        <EmptyState
          type="error"
          title="Failed to Load Products"
          description={error}
          actionText="Retry Loading"
          onAction={onRetry}
          secondaryActionText="Restore Default Catalogue"
          onSecondaryAction={onResetData}
        />
      ) : products.length === 0 ? (
        <EmptyState
          type="products"
          title="Inventory is Empty"
          description="You currently have 0 products in your inventory. Add your first custom product or restore default items."
          actionText="Add First Product"
          onAction={onOpenAddModal}
          secondaryActionText="Restore Default Catalogue"
          onSecondaryAction={onResetData}
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          type="search"
          title="No Products Match Your Criteria"
          description={`No products found matching "${searchTerm || selectedCategory}". Try checking for typos or resetting your filters.`}
          actionText="Reset All Filters"
          onAction={onResetFilters}
        />
      ) : (
        <>
          {/* Products Grid or Table */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={onViewProduct}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={paginatedProducts}
              onView={onViewProduct}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">
                Page <strong className="text-slate-800">{currentPage}</strong> of{' '}
                <strong className="text-slate-800">{totalPages}</strong> (
                {filteredProducts.length} total products)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current, and adjacent pages
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => onPageChange(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-1 text-slate-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
