import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Wishlist from './Wishlist';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wishlist />
  </StrictMode>,
);
