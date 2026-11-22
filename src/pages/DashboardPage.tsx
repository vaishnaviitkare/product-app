import React from 'react';
import {
  Package,
  Tags,
  DollarSign,
  Star,
  Plus,
  TrendingUp,
  Award,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { Product, DashboardStats } from '../types/product';
import { StatCard } from '../components/dashboard/StatCard';
import { CategoryDistribution } from '../components/dashboard/CategoryDistribution';
import { RecentProducts } from '../components/dashboard/RecentProducts';
import { usePermissions } from '../hooks/usePermissions';

interface DashboardPageProps {
  stats: DashboardStats;
  products: Product[];
  onOpenAddModal: () => void;
  onNavigateToProducts: () => void;
  onSelectCategory: (category: string) => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  products,
  onOpenAddModal,
  onNavigateToProducts,
  onSelectCategory,
  onViewProduct,
  onEditProduct,
}) => {
  const { canAddProduct } = usePermissions();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-950/10 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Inventory Admin Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Welcome to Product Hub
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed">
            Monitor catalogue metrics, track category distributions, create new products with instant
            Zod schema validation, and manage persistent inventory.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToProducts}
            className="px-4 py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            Browse Products
            <ArrowUpRight className="w-4 h-4" />
          </button>
          {canAddProduct && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="px-5 py-2.5 text-sm font-semibold bg-white text-indigo-900 hover:bg-indigo-50 active:bg-indigo-100 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* High Level Key Metric Cards */}
      <section aria-labelledby="key-metrics-heading">
        <h2 id="key-metrics-heading" className="sr-only">
          Key Inventory Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            subtitle="Active in inventory"
            icon={Package}
            variant="indigo"
            trend={{ label: 'Live Catalog', positive: true }}
          />

          <StatCard
            title="Total Categories"
            value={stats.totalCategories}
            subtitle="Distinct product lines"
            icon={Tags}
            variant="emerald"
            trend={{ label: 'Diverse range', positive: true }}
          />

          <StatCard
            title="Average Price"
            value={`$${stats.averagePrice.toFixed(2)}`}
            subtitle="Across all items"
            icon={DollarSign}
            variant="amber"
            trend={{ label: 'Balanced pricing' }}
          />

          <StatCard
            title="Top Rating"
            value={stats.topRatedProduct ? `${stats.topRatedProduct.rating.toFixed(2)} ★` : 'N/A'}
            subtitle={stats.topRatedProduct ? stats.topRatedProduct.title : 'No ratings yet'}
            icon={Star}
            variant="purple"
            trend={{ label: 'Customer favorite', positive: true }}
          />
        </div>
      </section>

      {/* Catalogue Highlights banner */}
      {stats.highestPriceProduct && stats.lowestPriceProduct && (
        <section aria-labelledby="catalogue-insights-heading">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h2 id="catalogue-insights-heading" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Catalogue Price & Quality Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Highest Price */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Highest Priced Item
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {stats.highestPriceProduct.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-extrabold text-indigo-600">
                      ${stats.highestPriceProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      ({stats.highestPriceProduct.category})
                    </span>
                  </div>
                </div>
              </div>

              {/* Lowest Price */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Most Accessible Item
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {stats.lowestPriceProduct.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-extrabold text-emerald-600">
                      ${stats.lowestPriceProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      ({stats.lowestPriceProduct.category})
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Rated Product */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Highest Customer Satisfaction
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {stats.topRatedProduct?.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-extrabold text-amber-600 flex items-center gap-1">
                      {stats.topRatedProduct?.rating.toFixed(2)} ★
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      ({stats.topRatedProduct?.category})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Middle row: Category Distribution & Recent / Top Rated Products */}
      <section aria-label="Inventory Distribution & Top Rated Products" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDistribution
          categoryCounts={stats.categoryCounts}
          totalProducts={stats.totalProducts}
          onSelectCategory={(category) => {
            onSelectCategory(category);
            onNavigateToProducts();
          }}
        />

        <RecentProducts
          products={products}
          onViewProduct={onViewProduct}
          onEditProduct={onEditProduct}
          onViewAll={onNavigateToProducts}
        />
      </section>
    </div>
  );
};
