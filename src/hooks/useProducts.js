import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch product list from DummyJSON API.
 * Returns { products, loading, error }
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch on component mount
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://dummyjson.com/products?limit=30', {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch products`)
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        // Ignore abort errors (component unmounted)
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    // Cleanup: abort fetch if component unmounts
    return () => controller.abort()
  }, [])

  return { products, loading, error }
}
