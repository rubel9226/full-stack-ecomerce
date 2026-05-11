import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './Router/Router'
import AddToCartProvider from './Context/AddToCartContext';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Context/AuthProvider';
import AddToBuyProvider from './Context/AddBuyProduct';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <AddToCartProvider>
        <AddToBuyProvider>
          <RouterProvider router={router} ></RouterProvider>
          <ToastContainer className='z-999999' />
        </AddToBuyProvider>

      </AddToCartProvider>
    </AuthProvider>
  </StrictMode>,
)

