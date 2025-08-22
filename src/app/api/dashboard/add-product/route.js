import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, category, image, inStock } = body

    // Validation
    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      )
    }

    // Check if user ID exists in session
    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found in session' },
        { status: 400 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        image: image.trim(),
        inStock: Boolean(inStock),
        userId: session.user.id
      }
    })

    return NextResponse.json({
      message: 'Product created successfully',
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        inStock: product.inStock,
        createdAt: product.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating product:', error)

    // Check if it's a database connection error
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this name already exists' },
        { status: 409 }
      )
    }

    // Check for database connection issues
    if (error.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      )
    }

    // Check for foreign key constraint error
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid user. Please log in again.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: 'User ID not found in session' },
        { status: 400 }
      )
    }

    // Get user's products with pagination support
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page')) || 1
    const limit = parseInt(url.searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: skip,
        take: limit
      }),
      prisma.product.count({
        where: {
          userId: session.user.id
        }
      })
    ])

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasMore: skip + products.length < totalCount
      }
    })

  } catch (error) {
    console.error('Error fetching user products:', error)
    
    if (error.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}