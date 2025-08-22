"use client"
import { useEffect, useState } from "react"

export default function MyProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map(p => (
            <li key={p.id} className="p-4 bg-white shadow rounded-xl">
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.description}</p>
              <span className="text-blue-600">${p.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}