import type { Product } from '../types/product';

const STORAGE_KEYS = {
  PRODUCTS: 'product_hub_products',
  CUSTOM_FLAG: 'product_hub_has_custom_data',
  DELETED_IDS: 'product_hub_deleted_ids',
} as const;

export const storageService = {
  /**
   * Retrieves stored products from localStorage
   */
  getStoredProducts(): Product[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) return null;
      return JSON.parse(data) as Product[];
    } catch (err) {
      console.error('Failed to read products from localStorage:', err);
      return null;
    }
  },

  /**
   * Saves products to localStorage
   */
  saveStoredProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FLAG, 'true');
    } catch (err) {
      console.error('Failed to save products to localStorage:', err);
    }
  },

  /**
   * Checks if the user has custom saved data in localStorage
   */
  hasCustomData(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.CUSTOM_FLAG) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Clears custom product data from localStorage to restore defaults
   */
  clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_FLAG);
      localStorage.removeItem(STORAGE_KEYS.DELETED_IDS);
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
    }
  },
};
