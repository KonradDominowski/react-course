import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import RootLayout from './pages/Root'
import ProductDetails from './pages/ProductDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/', element: <Products /> },
      { path: '/products/:productID', element: <ProductDetails /> }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={ router } />
  )
}

export default App;
