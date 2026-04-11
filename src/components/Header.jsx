import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'

/**
 * Header — navigation bar with logo, links, and cart icon with item count badge.
 */
export default function Header() {
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="sticky top-0 z-50 bg-bark text-cream shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-tight hover:text-gold transition-colors duration-200"
          >
            Shoppy<span className="text-ember">Globe</span>
          </Link>

          {/* ── Nav Links ── */}
          <nav className="hidden sm:flex items-center gap-8 font-body text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/80'}`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/80'}`
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/80'}`
              }
            >
              Checkout
            </NavLink>
          </nav>

          {/* ── Cart Icon with badge ── */}
          <Link to="/cart" className="relative p-2 hover:text-gold transition-colors duration-200">
            {/* Cart SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11M10 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
            {/* Item count badge */}
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="cart-badge absolute -top-1 -right-1 bg-ember text-white text-xs font-mono font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
              >
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* ── Mobile nav (shown below sm) ── */}
      <div className="sm:hidden border-t border-cream/10 px-4 py-2 flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/70'}`
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/70'}`
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            `hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold' : 'text-cream/70'}`
          }
        >
          Checkout
        </NavLink>
      </div>
    </header>
  )
}
