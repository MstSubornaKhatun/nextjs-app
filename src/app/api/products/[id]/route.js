// import { mockProducts, prisma } from '@/app/lib/db'
import { mockProducts, prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'


export async function GET(request, { params }) {
  const { id } = params
  
  try {
    // Try to get product from database first
    let product = await prisma.product.findUnique({
      where: { id }
    })
    
    // If not found in database, try mock data
    if (!product) {
      product = mockProducts.find(p => p.id === id)
    }
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Get related products (same category, excluding current product)
    let relatedProducts = []
    
    try {
      relatedProducts = await prisma.product.findMany({
        where: {
          category: product.category,
          id: {
            not: id
          }
        },
        take: 4
      })
      
      // If no related products in database, use mock data
      if (relatedProducts.length === 0) {
        relatedProducts = mockProducts
          .filter(p => p.category === product.category && p.id !== id)
          .slice(0, 4)
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
      relatedProducts = mockProducts
        .filter(p => p.category === product.category && p.id !== id)
        .slice(0, 4)
    }
    
    return NextResponse.json({
      product,
      relatedProducts
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    
    // Fallback to mock data
    const product = mockProducts.find(p => p.id === id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    const relatedProducts = mockProducts
      .filter(p => p.category === product.category && p.id !== id)
      .slice(0, 4)
    
    return NextResponse.json({
      product,
      relatedProducts
    })
  }
}