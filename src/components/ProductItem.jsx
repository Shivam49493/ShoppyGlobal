import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addToCart } from '../store/cartSlice'
import LazyImage from './LazyImage'

/**
 * ProductItem — card displaying a single product with Add to Cart action.
 * Receives product data via props from ProductList.
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch()

  // Dispatch addToCart action with relevant product fields
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }))
  }

  return (
    <article className="card-hover bg-white rounded-2xl overflow-hidden border border-warm group animate-slide-up">

      {/* ── Product Image ── */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* ── Product Info ── */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category tag */}
        <span className="font-mono text-xs text-gold uppercase tracking-widest">
          {product.category}
        </span>

        {/* Title links to detail page */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base font-bold text-bark leading-snug hover:text-ember transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-gold text-sm">★</span>
          <span className="font-mono text-xs text-charcoal/60">{product.rating?.toFixed(1)}</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-display text-lg font-bold text-ember">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-press bg-bark text-cream text-xs font-medium px-4 py-2 rounded-xl hover:bg-ember transition-colors duration-200 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
}
