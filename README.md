# Product Hub — Modern Admin & Product Dashboard

A complete, professional, and responsive **Product Hub** admin and inventory management frontend application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **React Hook Form**, and **Zod**.

---

## 🚀 Live Overview & Core Capabilities

Product Hub provides a modern e-commerce dashboard and product catalog suite. It delivers real-time analytics, dynamic filtering, schema-validated product authoring, and frontend-only data persistence.

### Key Highlights
- **100% Strict TypeScript**: Zero `any` types, comprehensive type definitions, and type-safe schema inferencing.
- **Tailwind CSS v4**: Modern CSS theme engine with clean utility classes, custom scrollbars, responsive layouts, and fluid transitions.
- **Interactive Dashboard**: Real-time stats (Total Products, Categories, Average Price, Top Ratings), catalogue price highlights, and visual category breakdown bars.
- **Product Listing with Dual Views**: Switch seamlessly between a high-density responsive **Grid View** and an admin **Table View**.
- **Instant Search, Filter & Sort**: Live search across title, description, and brand; dynamic category selector and quick pills; sorting by price (low-to-high & high-to-low), rating, and title.
- **Add & Edit with Zod Validation**: Forms powered by **React Hook Form** with strict **Zod** schema validation, instant field-level feedback, and live image URL previews.
- **Safe Deletion**: Accessible modal confirmation dialog prior to deleting any product.
- **Frontend-Only Persistence**: All additions, modifications, and deletions are saved in browser `localStorage`. Changes persist across browser refreshes, with a one-click "Restore Defaults" button to re-sync with DummyJSON.

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.3.1` | Core UI library with modern hooks and concurrent rendering |
| **TypeScript** | `~6.0.3` | Strong typing, interfaces, and build-time safety |
| **Vite** | `^8.3.6` | Next-generation frontend tooling and fast production bundler |
| **Tailwind CSS** | `^4.3.5` | Next-generation utility-first styling with `@tailwindcss/vite` |
| **React Hook Form** | `^7.92.0` | High-performance, declarative form state management |
| **Zod** | `^4.6.7` | TypeScript-first schema declaration and validation |
| **@hookform/resolvers** | `^7.0.8` | Seamless bridge connecting React Hook Form with Zod |
| **Lucide React** | `^1.77.0` | Accessible, consistent iconography |

---

## 📦 Features Breakdown

### 1. Dashboard Overview
- **Key Metrics Cards**:
  - **Total Products**: Live count of active inventory items.
  - **Total Categories**: Distinct categories currently represented.
  - **Average Product Price**: Calculated arithmetic mean with fractional rounding.
  - **Top Rating**: Highest customer-rated product and its score.
- **Catalogue Price & Quality Highlights**:
  - Highest priced product spotlight.
  - Most accessible (lowest price) product highlight.
  - Customer satisfaction leader.
- **Category Breakdown Distribution**: Visual percentage progress bars displaying item counts for top product lines.
- **Top Rated & Recent Showcase**: Quick-action list of top-performing items with immediate preview and editing shortcuts.

### 2. Product Listing
- **Initial Data Ingestion**: Fetches comprehensive product data from `https://dummyjson.com/products?limit=100`, with automatic fallback dataset handling for offline resilience.
- **Display Attributes**: Product thumbnail image, title, category badge, formatted currency price, rating with stars, and description snippet.
- **Search**: Instant case-insensitive filtering matching title, description, category, or brand.
- **Category Filter**: Dynamically extracted categories dropdown plus quick-filter pill buttons.
- **Sorting**:
  - Price: Low to High
  - Price: High to Low
  - Highest Rated (5.0 → 0.0)
  - Title: A to Z
  - Newest / ID
- **Dual Display Modes**: Toggle between Responsive Card Grid and Table View.
- **Pagination**: Configurable items per page with page jump navigation.

### 3. Add & Edit Product
- **Form Fields**:
  - `title`: Min 3 characters, max 120 characters.
  - `description`: Min 10 characters, max 1000 characters.
  - `price`: Numeric input with step `0.01`, positive value (`> 0`).
  - `category`: Text input with autocomplete suggestions from active categories.
  - `thumbnail`: Valid image URL with live preview card and sample image presets.
  - `rating`: Numeric value between `0.0` and `5.0`.
  - `brand` & `stock`: Optional metadata fields.
- **Validation**: Enforced via Zod schema with instant, clear inline error messages.
- **Live Image URL Preview**: Renders an image card preview with error handling and fallback notice.

### 4. Edit & Delete Management
- **Edit Mode**: Pre-populates the modal form with existing product values and updates both state and `localStorage`.
- **Delete Confirmation Modal**: Accessible confirmation modal preventing accidental deletions by displaying a preview of the targeted product.
- **Toast Notifications**: Floating alerts in the bottom-right corner confirming additions, updates, deletions, and resets.

### 5. Data Persistence
- **Storage Strategy**: Product data is stored in the browser's `localStorage` under `product_hub_products`.
- **Persistence Scope**: Newly created products, edited titles/prices, and deleted items remain stored after page reloads.
- **Transparency Notice**: A top banner and sidebar widget explicitly explain that this is client-side browser storage (frontend-only persistence), not an external server database.
- **Reset to API Defaults**: Users can restore the default DummyJSON inventory at any time using the "Restore API Defaults" button.

---

## 📁 Suggested Folder Structure

```
product-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx               # Reusable color-coded category & status badges
│   │   │   ├── EmptyState.tsx          # Zero-results and empty inventory states
│   │   │   ├── LoadingSkeleton.tsx     # Shimmer skeleton for grid and table
│   │   │   ├── PersistenceNotice.tsx   # Top banner explaining localStorage persistence
│   │   │   └── ToastContainer.tsx      # Floating toast notification system
│   │   ├── dashboard/
│   │   │   ├── CategoryDistribution.tsx# Category progress bars
│   │   │   ├── RecentProducts.tsx      # Highlighted products list
│   │   │   └── StatCard.tsx            # Key metric card component
│   │   ├── layout/
│   │   │   ├── Footer.tsx              # Professional footer
│   │   │   ├── Navbar.tsx              # Top sticky header with global search & CTA
│   │   │   └── Sidebar.tsx             # Responsive sidebar & mobile drawer
│   │   └── products/
│   │       ├── DeleteConfirmModal.tsx  # Confirmation modal before deletion
│   │       ├── ProductCard.tsx         # Attractive responsive grid product card
│   │       ├── ProductDetailsModal.tsx # Full product specification view
│   │       ├── ProductFilters.tsx      # Search bar, category filter, sorting, view mode
│   │       ├── ProductFormModal.tsx    # React Hook Form + Zod Add/Edit modal
│   │       └── ProductTable.tsx        # High-density admin table view
│   ├── hooks/
│   │   ├── useProducts.ts              # Core state, filtering, pagination, and persistence
│   │   └── useToast.ts                 # Notification system hook
│   ├── pages/
│   │   ├── CategoriesPage.tsx          # Dedicated category metrics page
│   │   ├── DashboardPage.tsx           # High-level overview dashboard
│   │   └── ProductsPage.tsx            # Main catalog page with dual views
│   ├── schemas/
│   │   └── productSchema.ts            # Zod validation schemas
│   ├── services/
│   │   ├── productService.ts           # DummyJSON API client & fallback datasets
│   │   └── storageService.ts           # LocalStorage CRUD operations
│   ├── types/
│   │   └── product.ts                  # TypeScript interfaces and type definitions
│   ├── utils/
│   │   └── categoryUtils.ts            # Category color variant mapping
│   ├── App.tsx                         # Main application layout coordinator
│   ├── index.css                       # Tailwind CSS v4 entrypoint
│   └── main.tsx                        # React 19 application mounting point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

---

## 💻 Installation and Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This runs TypeScript checking (`tsc -b`) followed by Vite's production bundler (`vite build`).

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Lint Codebase
```bash
npm run lint
```

---

## 🛡️ Testing & Verification
The application has been verified with:
- `npx tsc -b`: 0 TypeScript errors.
- `npm run lint`: 0 ESLint errors and 0 warnings.
- `npm run build`: Production bundle generated cleanly (`dist/assets/index-*.css`, `dist/assets/index-*.js`).
- Local preview server tested and confirmed serving with status `200`.
