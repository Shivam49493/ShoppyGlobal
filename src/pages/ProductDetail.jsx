import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import LazyImage from '../components/LazyImage'
import LoadingSpinner from '../components/LoadingSpinner'

/**
 * ProductDetail page — fetches a single product by route param :id using useEffect.
 * Displays full product info and allows adding to cart.
 */
export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Fetch product details based on route param when component mounts
  useEffect(() => {
    const controller = new AbortController()

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Product not found (HTTP ${res.status})`)
        const data = await res.json()
        setProduct(data)
        setActiveImage(0)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load product')
          setProduct(null) // Ensure product is null on error
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    return () => controller.abort()
  }, [id]) // re-fetch when route id changes

  const handleAddToCart = () => {
    if (!product) return // Guard clause
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <LoadingSpinner />

  // Error handling UI
  if (error || !product) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="font-display text-2xl font-bold text-bark mb-2">Oops!</h2>
      <p className="font-body text-charcoal/50">{error || 'Product not found'}</p>
      <Link to="/" className="mt-6 inline-block bg-ember text-white px-6 py-2 rounded-xl font-medium hover:bg-bark transition-colors">
        Back to Shop
      </Link>
    </div>
  )

  // Add null check here - if product is null, don't render the main content
  if (!product) return null

  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">

      {/* ── Breadcrumb ── */}
      <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-charcoal/40 uppercase tracking-wider">
        <Link to="/" className="hover:text-ember transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gold">{product.category}</span>
        <span>/</span>
        <span className="text-charcoal/60 truncate max-w-[160px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── Image Gallery ── */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div className="rounded-3xl overflow-hidden bg-warm aspect-square">
            <LazyImage
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-ember' : 'border-warm hover:border-gold'
                  }`}
                >
                  <LazyImage src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ── */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="font-mono text-xs text-gold uppercase tracking-widest">{product.category}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-bark mt-1 leading-tight">
              {product.title}
            </h1>
            <p className="font-body text-sm text-charcoal/50 mt-1">
              Brand: <span className="font-semibold text-charcoal/70">{product.brand || 'N/A'}</span>
            </p>
          </div>

          {/* Rating + Stock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={`text-lg ${s <= Math.round(product.rating) ? 'text-gold' : 'text-warm'}`}>★</span>
              ))}
              <span className="font-mono text-xs text-charcoal/40 ml-1">({product.rating?.toFixed(1)})</span>
            </div>
            <span className={`font-mono text-xs px-2 py-1 rounded-full ${
              product.stock > 10 ? 'bg-sage/10 text-sage' : 'bg-ember/10 text-ember'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold text-ember">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="font-mono text-sm bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                -{product.discountPercentage?.toFixed(0)}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-charcoal/70 text-sm leading-relaxed border-t border-warm pt-4">
            {product.description}
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`btn-press mt-2 w-full py-4 rounded-2xl font-body font-semibold text-base transition-all duration-300 ${
              added
                ? 'bg-sage text-white scale-95'
                : 'bg-bark text-cream hover:bg-ember'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>

          {/* Back link */}
          <Link
            to="/"
            className="text-center font-body text-sm text-charcoal/40 hover:text-ember transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}