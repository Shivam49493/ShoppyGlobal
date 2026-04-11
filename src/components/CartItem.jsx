import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice'
import LazyImage from './LazyImage'

/**
 * CartItem — displays a single cart product with quantity controls and remove button.
 * Receives item data via props from Cart page.
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-warm animate-fade-in">

      {/* ── Thumbnail ── */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-warm">
        <LazyImage
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Details ── */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-display font-bold text-bark text-sm leading-snug line-clamp-2">
            {item.title}
          </h4>
          <p className="font-mono text-ember text-sm font-semibold mt-1">
            ${item.price}
          </p>
        </div>

        {/* ── Quantity Controls ── */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => dispatch(decrementQuantity(item.id))}
            className="w-7 h-7 rounded-full border-2 border-bark text-bark font-bold text-sm hover:bg-bark hover:text-cream transition-colors duration-200 flex items-center justify-center btn-press"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono text-sm font-semibold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(incrementQuantity(item.id))}
            className="w-7 h-7 rounded-full border-2 border-bark text-bark font-bold text-sm hover:bg-bark hover:text-cream transition-colors duration-200 flex items-center justify-center btn-press"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Subtotal + Remove ── */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-display font-bold text-charcoal text-base">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        {/* Remove button */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-charcoal/30 hover:text-ember transition-colors duration-200 p-1"
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}
