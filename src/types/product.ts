export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images?: string[];
  isCustom?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  brand?: string;
  stock?: number;
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'title-asc'
  | 'newest';

export type ViewMode = 'grid' | 'table';

export type NavigationTab = 'dashboard' | 'products' | 'categories';

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  averagePrice: number;
  highestPriceProduct: Product | null;
  lowestPriceProduct: Product | null;
  topRatedProduct: Product | null;
  categoryCounts: Record<string, number>;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
  averagePrice: number;
}
