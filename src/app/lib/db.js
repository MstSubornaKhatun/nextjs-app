import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Mock data for initial products
export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and water resistance.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Wearables',
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Clothing',
    inStock: true,
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: 'High-quality camera lens for professional photography. Compatible with major camera brands.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
    category: 'Photography',
    inStock: true,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support. Perfect for long working hours.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    category: 'Furniture',
    inStock: true,
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'Lifestyle',
    inStock: true,
  }
]