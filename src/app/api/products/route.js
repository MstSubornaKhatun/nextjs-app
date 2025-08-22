import { mockProducts, prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/db'
// import { mockProducts } from '@/lib/db'

export async function GET() {
  try {
    // Try to get products from database first
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // If no products in database, return mock data
    if (products.length === 0) {
      return NextResponse.json(mockProducts)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback to mock data if database fails
    return NextResponse.json(mockProducts)
  }
}