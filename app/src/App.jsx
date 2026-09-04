import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WishlistDemo from './WishlistDemo';
import PlainWishlist from './PlainWishlist';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activity" element={<PlainWishlist />} />
        <Route path="*" element={<WishlistDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
