import { createSlice } from '@reduxjs/toolkit'

// ─── Initial State ───
const initialState = {
  items: [], // Array of cart items { id, title, price, thumbnail, quantity }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or increment quantity if already present
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove a product from cart entirely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Increment quantity of a cart item
    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.quantity += 1
    },

    // Decrement quantity but minimum 1
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },

    // Clear entire cart (used after order placed)
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

// ─── Selectors ───
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default cartSlice.reducer
