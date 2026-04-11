import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * LazyImage — wraps <img> with native lazy loading + fade-in on load.
 * Displays a skeleton placeholder until the image loads.
 */
export default function LazyImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div className={`skeleton absolute inset-0 ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy" // native browser lazy loading
        onLoad={() => setLoaded(true)}
        className={`img-lazy transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
}
