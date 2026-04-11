import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal } from '../store/cartSlice'
import CartItem from '../components/CartItem'

/**
 * Cart page — displays all cart items, subtotal, and links to checkout.
 * Uses CartItem component for each item (unique key required).
 */
export default function Cart() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="font-display text-3xl font-bold text-bark mb-3">Your cart is empty</h2>
        <p className="font-body text-charcoal/50 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="inline-block bg-bark text-cream px-8 py-3 rounded-2xl font-semibold hover:bg-ember transition-colors btn-press"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-extrabold text-bark">Your Cart</h1>
        <p className="font-mono text-xs text-charcoal/40 mt-1 uppercase tracking-wider">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Cart Items List ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Each CartItem gets a unique key from product id */}
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* ── Order Summary ── */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-warm p-6 sticky top-24 animate-slide-up">
            <h2 className="font-display text-xl font-bold text-bark mb-5">Order Summary</h2>

            {/* Item breakdown */}
            <div className="flex flex-col gap-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm font-body text-charcoal/70">
                  <span className="truncate mr-2">{item.title} × {item.quantity}</span>
                  <span className="font-mono flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-warm my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-body font-semibold text-bark">Total</span>
              <span className="font-display text-2xl font-extrabold text-ember">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout CTA */}
            <Link
              to="/checkout"
              className="btn-press block text-center w-full bg-bark text-cream py-4 rounded-2xl font-semibold hover:bg-ember transition-colors duration-200"
            >
              Proceed to Checkout →
            </Link>

            {/* Continue shopping */}
            <Link
              to="/"
              className="block text-center mt-3 font-body text-sm text-charcoal/40 hover:text-ember transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
