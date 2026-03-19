import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from '@/context/AuthContext.tsx';

OverlayScrollbars(document.body, {
  scrollbars: {
    autoHide: 'scroll',
    autoHideDelay: 600,
    theme: 'os-theme-dark',
  },
});

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HashRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(12, 18, 32, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '0',
                color: '#dde6ff',
                borderRadius: '14px',
                fontSize: '13px',
              },
            }}
          />
        </AuthProvider>
      </HashRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
