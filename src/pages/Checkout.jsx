import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice'

/**
 * Checkout page — dummy form to collect user details + cart summary.
 * On "Place Order": shows confirmation, clears cart, redirects to home.
 */
export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  })
  const [errors, setErrors] = useState({})

  // Basic validation
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.zip.trim()) e.zip = 'ZIP code is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handlePlaceOrder = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    // Show success message, clear cart, then redirect after delay
    setOrderPlaced(true)
    dispatch(clearCart())
    setTimeout(() => navigate('/'), 3000)
  }

  // Redirect if cart is empty and order not just placed
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-3xl font-bold text-bark mb-3">Nothing to checkout</h2>
        <p className="font-body text-charcoal/50 mb-6">Add some items to your cart first.</p>
        <Link to="/" className="inline-block bg-bark text-cream px-8 py-3 rounded-2xl font-semibold hover:bg-ember transition-colors">
          Go Shopping
        </Link>
      </div>
    )
  }

  // ── Order Placed Success ──
  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-bounce-in">
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        <h2 className="font-display text-4xl font-extrabold text-bark mb-3">Order Placed!</h2>
        <p className="font-body text-charcoal/60 text-base mb-2">
          Thank you, <span className="font-semibold text-bark">{form.name}</span>! Your order is confirmed.
        </p>
        <p className="font-mono text-xs text-charcoal/40 uppercase tracking-wider">
          Redirecting to home…
        </p>
        <div className="mt-6 w-48 h-1 bg-warm rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-sage rounded-full animate-[grow_3s_ease-in-out_forwards]" style={{ animation: 'grow 3s linear forwards' }} />
        </div>
        <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-4xl font-extrabold text-bark mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Checkout Form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Contact Info */}
          <fieldset className="bg-white rounded-3xl border border-warm p-6">
            <legend className="font-display text-lg font-bold text-bark mb-4 px-1">Contact Details</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@email.com" />
              <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+1 234 567 8900" />
            </div>
          </fieldset>

          {/* Shipping Address */}
          <fieldset className="bg-white rounded-3xl border border-warm p-6">
            <legend className="font-display text-lg font-bold text-bark mb-4 px-1">Shipping Address</legend>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="123 Main Street" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="New York" />
                <Field label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} error={errors.zip} placeholder="10001" />
              </div>
            </div>
          </fieldset>

          {/* Payment Method */}
          <fieldset className="bg-white rounded-3xl border border-warm p-6">
            <legend className="font-display text-lg font-bold text-bark mb-4 px-1">Payment Method</legend>
            <div className="flex flex-col gap-3">
              {['card', 'upi', 'cod'].map(method => (
                <label key={method} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  form.payment === method ? 'border-bark bg-bark/5' : 'border-warm hover:border-gold'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.payment === method}
                    onChange={handleChange}
                    className="accent-bark"
                  />
                  <span className="font-body text-sm font-medium text-bark capitalize">
                    {method === 'card' ? '💳 Credit / Debit Card' : method === 'upi' ? '📱 UPI' : '💵 Cash on Delivery'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ── Order Summary ── */}
        <aside>
          <div className="bg-white rounded-3xl border border-warm p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-bark mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2 mb-4 max-h-52 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm font-body text-charcoal/70">
                  <span className="truncate mr-2">{item.title} × {item.quantity}</span>
                  <span className="font-mono flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-warm my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-body font-semibold text-bark">Total</span>
              <span className="font-display text-2xl font-extrabold text-ember">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="btn-press w-full bg-ember text-white py-4 rounded-2xl font-semibold text-base hover:bg-bark transition-colors duration-200"
            >
              Place Order
            </button>
          </div>
        </aside>

      </div>
    </div>
  )
}

// ── Reusable form field sub-component ──
function Field({ label, name, value, onChange, error, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-xs text-charcoal/50 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-3 rounded-xl border-2 font-body text-sm focus:outline-none transition-colors ${
          error ? 'border-ember bg-ember/5' : 'border-warm focus:border-gold'
        }`}
      />
      {error && <span className="font-mono text-xs text-ember">{error}</span>}
    </div>
  )
}
