/**
 * LoadingSpinner — full-page centered loading indicator.
 * Used as Suspense fallback for lazy-loaded routes.
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Animated ring spinner */}
      <div className="w-12 h-12 border-4 border-warm border-t-ember rounded-full animate-spin" />
      <p className="font-body text-sm text-charcoal/50 font-medium tracking-widest uppercase">
        Loading…
      </p>
    </div>
  )
}
