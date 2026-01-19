import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import { ToastContainer } from 'react-toastify';
import { RouterProvider } from "react-router/dom";
import { router } from './rotutes/router';
import AuthProvider from './provider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} >
          
         </RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)
