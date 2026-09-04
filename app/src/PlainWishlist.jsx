import { products, TOTAL_ITEMS } from './data/products';
import WishlistHeader from './components/WishlistHeader';
import AddressBar from './components/AddressBar';
import CategoryFilters from './components/CategoryFilters';
import ProductCard from './components/ProductCard';
import MobilePhone from './components/MobilePhone';
import './PlainWishlist.css';

export default function PlainWishlist() {
  return (
    <div className="plain-wishlist-app">
      <MobilePhone>
        <WishlistHeader totalCount={TOTAL_ITEMS} />

        <AddressBar />
        <div className="quick-pills">
          <button type="button" className="pill">Collections</button>
          <button type="button" className="pill">Out of Stock</button>
        </div>
        <CategoryFilters active="" onChange={() => {}} />

        <main className="wishlist-main">
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} isFirstCard={index === 0} />
            ))}
          </div>
        </main>
      </MobilePhone>
    </div>
  );
}
