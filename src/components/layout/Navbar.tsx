import React from 'react';
import {
  Menu,
  Plus,
  Search,
  Database,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import type { NavigationTab } from '../../types/product';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenAddModal: () => void;
  onToggleSidebar: () => void;
  onResetData: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalProducts: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  setActiveTab,
  onOpenAddModal,
  onToggleSidebar,
  onResetData,
  searchTerm,
  onSearchChange,
  totalProducts,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left section: Hamburger for mobile + Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-lg tracking-tight">ProductHub</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Inventory & Catalog Suite</p>
              </div>
            </button>
          </div>

          {/* Center: Search input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (searchTerm === '' && e.target.value !== '') {
                    setActiveTab('products');
                  }
                }}
                placeholder="Search products by title, category, or brand..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right section: Actions & Status */}
          <div className="flex items-center gap-2.5">
            {/* LocalStorage indicator */}
            <div
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 bg-slate-100/80 border border-slate-200 rounded-lg"
              title="Data is persisted in browser localStorage"
            >
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-medium text-slate-700">Storage:</span>
              <span className="font-semibold text-indigo-700">{totalProducts} items</span>
            </div>

            {/* Quick reset button */}
            <button
              type="button"
              onClick={onResetData}
              title="Reset catalogue to default DummyJSON state"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
              aria-label="Reset inventory to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Add product CTA button */}
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 active:to-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
