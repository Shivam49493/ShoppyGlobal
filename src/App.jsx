import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'

// ─── Lazy-loaded pages for code splitting ───
const ProductList  = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart         = lazy(() => import('./pages/Cart'))
const Checkout     = lazy(() => import('./pages/Checkout'))
const NotFound     = lazy(() => import('./pages/NotFound'))

// ─── Root layout wrapping all routes ───
function RootLayout() {
  return (
    <div className="min-h-screen bg-cream font-body">
      <Header />
      {/* Suspense boundary for lazy-loaded route components */}
      <Suspense fallback={<LoadingSpinner />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </div>
  )
}

// ─── Router using createBrowserRouter (data router) ───
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
