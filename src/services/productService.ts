import type { Product } from '../types/product';

const DUMMY_JSON_URL = 'https://dummyjson.com/products?limit=100';

interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Resilient initial fallback products in case offline or API is temporarily unreachable
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    description: 'Titanium design with A17 Pro chip, customizable Action button, and versatile 48MP camera system.',
    price: 1199,
    discountPercentage: 10.5,
    rating: 4.85,
    stock: 45,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'MacBook Pro 16"',
    description: 'Supercharged by M3 Max with up to 16-core CPU and 40-core GPU for extreme professional workflows.',
    price: 2499,
    discountPercentage: 8.0,
    rating: 4.92,
    stock: 28,
    brand: 'Apple',
    category: 'laptops',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Epic camera with 200MP sensor, built-in S Pen, and titanium frame.',
    price: 1299,
    discountPercentage: 12.0,
    rating: 4.78,
    stock: 55,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling with two processors, 8 microphones, and ultra-comfortable design.',
    price: 399,
    discountPercentage: 15.0,
    rating: 4.88,
    stock: 80,
    brand: 'Sony',
    category: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Dell XPS 15 OLED',
    description: 'Stunning 3.5K OLED touchscreen display, 13th Gen Intel Core i9, and NVIDIA GeForce RTX 4070.',
    price: 1899,
    discountPercentage: 7.5,
    rating: 4.65,
    stock: 20,
    brand: 'Dell',
    category: 'laptops',
    thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Chanel Bleu de Chanel Parfum',
    description: 'An ode to masculine freedom expressed in an aromatic-woody fragrance with a captivating trail.',
    price: 185,
    discountPercentage: 5.0,
    rating: 4.9,
    stock: 65,
    brand: 'Chanel',
    category: 'fragrances',
    thumbnail: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'Advanced Night Repair Serum',
    description: 'Fast visible repair and youth-generating power. Deep penetration for comprehensive skin rejuvenation.',
    price: 115,
    discountPercentage: 10.0,
    rating: 4.72,
    stock: 110,
    brand: 'Estée Lauder',
    category: 'skincare',
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-586835165d75?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 8,
    title: 'Minimalist Ceramic Vase Set',
    description: 'Handcrafted stoneware ceramic vases featuring matte textured finish suitable for dried floral arrangements.',
    price: 49.99,
    discountPercentage: 20.0,
    rating: 4.55,
    stock: 90,
    brand: 'ArtisanHome',
    category: 'home-decoration',
    thumbnail: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'Organic Single Origin Coffee Beans',
    description: 'Whole bean medium roast sourced from Ethiopian highlands with notes of jasmine, bergamot, and peach.',
    price: 24.5,
    discountPercentage: 0,
    rating: 4.95,
    stock: 200,
    brand: 'OriginRoast',
    category: 'groceries',
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 10,
    title: 'iPad Air 11-inch M2',
    description: 'Incredible performance with Apple M2 chip, Liquid Retina display, and compatibility with Apple Pencil Pro.',
    price: 599,
    discountPercentage: 5.0,
    rating: 4.81,
    stock: 40,
    brand: 'Apple',
    category: 'tablets',
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'Logitech MX Master 3S',
    description: 'Quiet clicks and 8K DPI track-on-glass sensor for ultimate precision and ergonomic workflow.',
    price: 99.99,
    discountPercentage: 10.0,
    rating: 4.89,
    stock: 120,
    brand: 'Logitech',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 12,
    title: 'Bose QuietComfort Ultra Earbuds',
    description: 'Groundbreaking spatial audio, world-class noise cancellation, and CustomTune audio calibration.',
    price: 299,
    discountPercentage: 12.0,
    rating: 4.67,
    stock: 75,
    brand: 'Bose',
    category: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
  },
];

export const productService = {
  /**
   * Fetches products from DummyJSON API, with a graceful fallback to rich mock data
   */
  async fetchProducts(): Promise<{ products: Product[]; source: 'api' | 'fallback' }> {
    try {
      const response = await fetch(DUMMY_JSON_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data: DummyJsonResponse = await response.json();
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid response structure from API');
      }

      // Normalize product fields to ensure thumbnail and rating exist
      const normalizedProducts: Product[] = data.products.map((p) => ({
        ...p,
        thumbnail: p.thumbnail || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        rating: typeof p.rating === 'number' ? p.rating : 4.5,
        price: typeof p.price === 'number' ? p.price : 99.99,
        category: p.category || 'general',
      }));

      return { products: normalizedProducts, source: 'api' };
    } catch (error) {
      console.warn('DummyJSON API fetch failed or blocked; using fallback product dataset:', error);
      return { products: FALLBACK_PRODUCTS, source: 'fallback' };
    }
  },
};
