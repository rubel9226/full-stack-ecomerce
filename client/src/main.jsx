import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './Router/Router'
import AddToCartProvider from './Context/AddToCartContext';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Context/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <AddToCartProvider>
        <RouterProvider router={router} ></RouterProvider>
        <ToastContainer />
      </AddToCartProvider>

    </AuthProvider>
    
  </StrictMode>,
)

