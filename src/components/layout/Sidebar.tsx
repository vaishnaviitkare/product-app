import React from 'react';
import {
  LayoutDashboard,
  Package,
  Tags,
  Plus,
  RotateCcw,
  Database,
  ExternalLink,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { NavigationTab } from '../../types/product';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
  totalProducts: number;
  totalCategories: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  onOpenAddModal,
  onResetData,
  totalProducts,
  totalCategories,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'products' as NavigationTab,
      label: 'Products',
      icon: Package,
      badge: totalProducts,
    },
    {
      id: 'categories' as NavigationTab,
      label: 'Categories',
      icon: Tags,
      badge: totalCategories,
    },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top brand & nav */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 tracking-tight text-base leading-none">
                  Product Hub
                </h1>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Admin & Inventory
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="p-4">
            <button
              type="button"
              onClick={() => {
                onOpenAddModal();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Product
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Main navigation" className="px-3 space-y-1">
            <div className="px-3 pb-2 pt-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-indigo-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        isActive
                          ? 'bg-indigo-200/60 text-indigo-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Insights card */}
          <div className="px-4 mt-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200/80">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                Live Catalog
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Manage products, track pricing distributions, and test instant validation.
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60 font-medium">
                <span>Active Products</span>
                <span className="font-bold text-slate-800">{totalProducts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: LocalStorage Persistence Status & Reset */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/60">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Database className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-800">
                Storage: LocalStorage
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Frontend persistence active. Edits and new products persist in browser storage.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onResetData}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset API Data
            </button>
            <a
              href="https://dummyjson.com/docs/products"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              title="DummyJSON API Docs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
