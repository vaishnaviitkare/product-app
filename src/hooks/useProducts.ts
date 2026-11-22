import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, ProductFormData, SortOption, ViewMode, DashboardStats } from '../types/product';
import { productService } from '../services/productService';
import { storageService } from '../services/storageService';

export function useProducts() {
  // Lazy initialize state from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = storageService.getStoredProducts();
    return stored && stored.length > 0 ? stored : [];
  });

  const [loading, setLoading] = useState<boolean>(() => {
    const stored = storageService.getStoredProducts();
    return !stored || stored.length === 0;
  });

  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'fallback' | 'storage'>(() => {
    const stored = storageService.getStoredProducts();
    return stored && stored.length > 0 ? 'storage' : 'api';
  });

  // Filters and sorting state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Synchronize initial products if localStorage was empty
  useEffect(() => {
    let ignore = false;

    if (products.length === 0) {
      productService
        .fetchProducts()
        .then((result) => {
          if (!ignore) {
            setProducts(result.products);
            setDataSource(result.source);
            storageService.saveStoredProducts(result.products);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!ignore) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
            setLoading(false);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [products.length]);

  // Derived unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) {
        set.add(p.category.toLowerCase());
      }
    });
    return Array.from(set).sort();
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, safeCurrentPage, itemsPerPage]);

  // Computed dashboard statistics
  const stats: DashboardStats = useMemo(() => {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        totalCategories: 0,
        averagePrice: 0,
        highestPriceProduct: null,
        lowestPriceProduct: null,
        topRatedProduct: null,
        categoryCounts: {},
      };
    }

    const categoryCounts: Record<string, number> = {};
    let totalPrice = 0;
    let highestPriceProduct = products[0];
    let lowestPriceProduct = products[0];
    let topRatedProduct = products[0];

    products.forEach((p) => {
      // Category count
      const cat = p.category ? p.category.toLowerCase() : 'other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

      // Price stats
      totalPrice += p.price;
      if (p.price > highestPriceProduct.price) highestPriceProduct = p;
      if (p.price < lowestPriceProduct.price) lowestPriceProduct = p;

      // Rating stats
      if (p.rating > topRatedProduct.rating) topRatedProduct = p;
    });

    const averagePrice = totalPrice / products.length;

    return {
      totalProducts: products.length,
      totalCategories: Object.keys(categoryCounts).length,
      averagePrice: Math.round(averagePrice * 100) / 100,
      highestPriceProduct,
      lowestPriceProduct,
      topRatedProduct,
      categoryCounts,
    };
  }, [products]);

  // State setters that reset pagination to page 1
  const handleSearchChange = useCallback((val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  // Action: Add Product
  const addProduct = useCallback((formData: ProductFormData): Product => {
    const newProduct: Product = {
      ...formData,
      id: Date.now(),
      discountPercentage: 0,
      stock: formData.stock ?? 50,
      brand: formData.brand || 'Custom',
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      storageService.saveStoredProducts(updated);
      return updated;
    });

    return newProduct;
  }, []);

  // Action: Edit Product
  const updateProduct = useCallback((id: number, formData: ProductFormData): boolean => {
    let updatedProduct: Product | null = null;

    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const updated = [...prev];
      updatedProduct = {
        ...updated[index],
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      updated[index] = updatedProduct;
      storageService.saveStoredProducts(updated);
      return updated;
    });

    return !!updatedProduct;
  }, []);

  // Action: Delete Product
  const deleteProduct = useCallback((id: number): boolean => {
    let deleted = false;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === id);
      if (!exists) return prev;
      deleted = true;
      const updated = prev.filter((p) => p.id !== id);
      storageService.saveStoredProducts(updated);
      return updated;
    });
    return deleted;
  }, []);

  // Action: Force refetch / reload
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.fetchProducts();
      setProducts(result.products);
      setDataSource(result.source);
      storageService.saveStoredProducts(result.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reload products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Action: Reset Data
  const resetToDefaults = useCallback(async () => {
    storageService.clearStorage();
    await refetch();
  }, [refetch]);

  return {
    products,
    loading,
    error,
    dataSource,
    categories,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    sortBy,
    setSortBy: handleSortChange,
    viewMode,
    setViewMode,
    currentPage: safeCurrentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    filteredProducts,
    paginatedProducts,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults,
    refetch,
  };
}
