import { useSelector, useDispatch } from 'react-redux'
import { useProducts } from '../hooks/useProducts'
import { selectSearchQuery, setSearchQuery, clearSearch } from '../store/searchSlice'
import ProductItem from '../components/ProductItem'
import LoadingSpinner from '../components/LoadingSpinner'

/**
 * ProductList page — fetches products via custom hook, renders search bar and grid.
 * Search is managed via Redux state (searchSlice).
 */
export default function ProductList() {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)

  // Custom hook handles data fetching with useEffect
  const { products, loading, error } = useProducts()

  // Filter products based on Redux search query
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Hero Header ── */}
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-bark leading-tight">
          Discover Products
        </h1>
        <p className="mt-2 font-body text-charcoal/50 text-base">
          Curated picks, delivered to your door.
        </p>
      </div>

      {/* ── Search Bar (Redux state) ── */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal/30"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products or categories…"
            className="w-full pl-12 pr-10 py-3 rounded-2xl border-2 border-warm bg-white font-body text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {/* Clear button */}
          {searchQuery && (
            <button
              onClick={() => dispatch(clearSearch())}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-ember transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-center font-mono text-xs text-charcoal/40">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}
      </div>

      {/* ── Loading State ── */}
      {loading && <LoadingSpinner />}

      {/* ── Error State ── */}
      {error && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="font-display text-2xl font-bold text-bark mb-2">Failed to load products</h2>
          <p className="font-body text-charcoal/50 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-ember text-white px-6 py-2 rounded-xl font-medium hover:bg-bark transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── Product Grid ── */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-bark/40">No products found.</p>
            </div>
          ) : (
            // Render list with unique keys
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
