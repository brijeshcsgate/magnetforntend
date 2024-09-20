import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
import { disableRightClick } from '@/utils/disableRightClick.js';

const toastConfig = {
  position: 'bottom-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  // theme: "colored",
  // transition: Zoom,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div onContextMenu={disableRightClick}>
          <App />
        </div>
        <Toaster richColors theme="light" />
        <ToastContainer {...toastConfig} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
