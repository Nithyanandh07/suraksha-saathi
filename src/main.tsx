import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for offline factory floor connectivity
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('[SW] Service worker registered successfully:', reg.scope);
    }).catch((err) => {
      console.warn('[SW] Registration failed:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
