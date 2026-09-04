import { products, TOTAL_ITEMS } from '@app/data/products';
import WishlistHeader from '@app/components/WishlistHeader';
import AddressBar from '@app/components/AddressBar';
import CategoryFilters from '@app/components/CategoryFilters';
import ProductCard from '@app/components/ProductCard';
import MobilePhone from '@app/components/MobilePhone';
import './Wishlist.css';

export default function Wishlist() {
  return (
    <div className="activity-wishlist">
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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </MobilePhone>
    </div>
  );
}
