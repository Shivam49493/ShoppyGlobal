import { Link, useLocation } from 'react-router-dom'

/**
 * NotFound — 404 page displayed for unknown routes.
 * Shows the attempted path and helpful error details.
 */
export default function NotFound() {
  const location = useLocation()

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-slide-up">

      {/* Big 404 display */}
      <div className="relative mb-6">
        <span className="font-display text-[10rem] font-extrabold text-warm leading-none select-none">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[10rem] font-extrabold text-bark/10 blur-sm leading-none">
          404
        </span>
      </div>

      {/* Error heading */}
      <h1 className="font-display text-3xl font-extrabold text-bark mb-3">
        Page Not Found
      </h1>

      {/* Error details */}
      <div className="bg-white border-2 border-warm rounded-2xl p-5 mb-8 text-left max-w-md mx-auto">
        <p className="font-mono text-xs text-charcoal/40 uppercase tracking-widest mb-3">Error Details</p>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex gap-2">
            <span className="text-ember font-bold">Code:</span>
            <span className="text-charcoal/70">404 Not Found</span>
          </div>
          <div className="flex gap-2">
            <span className="text-ember font-bold">Path:</span>
            <span className="text-charcoal/70 break-all">{location.pathname}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-ember font-bold">Message:</span>
            <span className="text-charcoal/70">
              The requested URL <code className="bg-warm px-1 rounded">{location.pathname}</code> could not be found on this server.
            </span>
          </div>
        </div>
      </div>

      <p className="font-body text-charcoal/50 mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Navigation options */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="btn-press bg-bark text-cream px-8 py-3 rounded-2xl font-semibold hover:bg-ember transition-colors"
        >
          ← Back to Shop
        </Link>
        <Link
          to="/cart"
          className="btn-press bg-white text-bark border-2 border-bark px-8 py-3 rounded-2xl font-semibold hover:bg-warm transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  )
}
