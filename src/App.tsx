import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useToast } from './hooks/useToast';
import type { Product, ProductFormData, NavigationTab } from './types/product';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { PersistenceNotice } from './components/common/PersistenceNotice';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductFormModal } from './components/products/ProductFormModal';
import { ProductDetailsModal } from './components/products/ProductDetailsModal';
import { DeleteConfirmModal } from './components/products/DeleteConfirmModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Products hook
  const {
    products,
    loading,
    error,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredProducts,
    paginatedProducts,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults,
    refetch,
  } = useProducts();

  // Toast hook
  const { toasts, addToast, removeToast } = useToast();

  // Open Add modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  // Open View Details modal
  const handleOpenViewModal = (product: Product) => {
    setViewingProduct(product);
    setIsDetailsModalOpen(true);
  };

  // Open Delete modal
  const handleOpenDeleteModal = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Submit Add or Edit Form
  const handleFormSubmit = (formData: ProductFormData) => {
    if (editingProduct) {
      const success = updateProduct(editingProduct.id, formData);
      if (success) {
        addToast('success', 'Product Updated', `"${formData.title}" was successfully updated.`);
      } else {
        addToast('error', 'Update Failed', 'Could not locate the product to update.');
      }
    } else {
      const newProduct = addProduct(formData);
      addToast(
        'success',
        'Product Created',
        `"${newProduct.title}" has been added to inventory and saved to localStorage.`
      );
      // If user was on dashboard, navigate to products page to see it
      if (activeTab === 'dashboard') {
        setActiveTab('products');
      }
    }
  };

  // Confirm Delete
  const handleConfirmDelete = (id: number) => {
    const target = products.find((p) => p.id === id);
    const success = deleteProduct(id);
    if (success) {
      addToast(
        'info',
        'Product Deleted',
        target ? `"${target.title}" was removed from inventory.` : 'Product was deleted.'
      );
    }
  };

  // Reset to default
  const handleResetData = async () => {
    await resetToDefaults();
    addToast('info', 'Catalogue Reset', 'Restored initial DummyJSON catalogue dataset.');
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top persistence banner */}
      <PersistenceNotice
        onReset={handleResetData}
        productCount={products.length}
      />

      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onResetData={handleResetData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalProducts={products.length}
      />

      {/* Layout wrapper: Sidebar + Main Content */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenAddModal={handleOpenAddModal}
          onResetData={handleResetData}
          totalProducts={products.length}
          totalCategories={categories.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {activeTab === 'dashboard' && (
              <DashboardPage
                stats={stats}
                products={products}
                onOpenAddModal={handleOpenAddModal}
                onNavigateToProducts={() => setActiveTab('products')}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  setActiveTab('products');
                }}
                onViewProduct={handleOpenViewModal}
                onEditProduct={handleOpenEditModal}
              />
            )}

            {activeTab === 'products' && (
              <ProductsPage
                products={products}
                paginatedProducts={paginatedProducts}
                filteredProducts={filteredProducts}
                loading={loading}
                error={error}
                categories={categories}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onOpenAddModal={handleOpenAddModal}
                onViewProduct={handleOpenViewModal}
                onEditProduct={handleOpenEditModal}
                onDeleteProduct={handleOpenDeleteModal}
                onResetFilters={handleResetFilters}
                onRetry={refetch}
                onResetData={handleResetData}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesPage
                products={products}
                categories={categories}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                }}
                onNavigateToProducts={() => setActiveTab('products')}
              />
            )}
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        existingCategories={categories}
      />

      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        product={viewingProduct}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={(product) => {
          setIsDetailsModalOpen(false);
          handleOpenEditModal(product);
        }}
        onDelete={(product) => {
          setIsDetailsModalOpen(false);
          handleOpenDeleteModal(product);
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        product={deletingProduct}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
