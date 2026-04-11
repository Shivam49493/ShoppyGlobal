# ShoppyGlobe 🛍️

A modern e-commerce React application built with Vite, Tailwind CSS, and Redux Toolkit.

## 🔗 GitHub Repository

> **[https://github.com/YOUR_USERNAME/shoppyglobe](https://github.com/YOUR_USERNAME/shoppyglobe)**
> *(Replace with your actual repository link)*

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/shoppyglobe.git
cd shoppyglobe

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Project Structure

```
shoppyglobe/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point + Redux Provider
    ├── App.jsx               # Router setup (createBrowserRouter) + lazy loading
    ├── index.css             # Tailwind directives + custom utilities
    ├── hooks/
    │   └── useProducts.js    # Custom hook for fetching products
    ├── store/
    │   ├── store.js          # Redux store config
    │   ├── cartSlice.js      # Cart actions, reducers, selectors
    │   └── searchSlice.js    # Search query state
    ├── components/
    │   ├── Header.jsx        # Nav + cart icon with badge
    │   ├── ProductItem.jsx   # Single product card
    │   ├── CartItem.jsx      # Single cart item with qty controls
    │   ├── LazyImage.jsx     # Lazy-loaded image with skeleton
    │   └── LoadingSpinner.jsx
    └── pages/
        ├── ProductList.jsx   # Home: product grid + search
        ├── ProductDetail.jsx # Single product detail
        ├── Cart.jsx          # Cart page
        ├── Checkout.jsx      # Checkout form + order placement
        └── NotFound.jsx      # 404 page
```

---

## ✅ Features Implemented

| Feature | Status |
|---|---|
| Vite + React setup | ✅ |
| Component structure (App, Header, ProductList, ProductItem, ProductDetail, Cart, CartItem, NotFound) | ✅ |
| Checkout with Place Order + redirect | ✅ |
| Props with PropTypes | ✅ |
| `useEffect` data fetching (ProductList + ProductDetail) | ✅ |
| Custom hook `useProducts` | ✅ |
| Error handling for API failures | ✅ |
| Redux Toolkit (cartSlice + searchSlice) | ✅ |
| Cart actions: add, remove, increment, decrement (min 1) | ✅ |
| Redux search filter in ProductList | ✅ |
| React Router with `createBrowserRouter` | ✅ |
| Dynamic route `/product/:id` | ✅ |
| 404 NotFound page with error details | ✅ |
| Unique keys in lists | ✅ |
| `React.lazy` + `Suspense` for all pages | ✅ |
| Lazy loading for images | ✅ |
| Tailwind CSS responsive styling | ✅ |

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit** — State management
- **React Router v6** — Client-side routing
- **PropTypes** — Prop validation

---

## 📦 Submission Note

`node_modules` has been removed. Run `npm install` before starting.
