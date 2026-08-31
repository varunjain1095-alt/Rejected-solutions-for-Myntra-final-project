import { getBrands, getCategoriesFromProducts } from '../data/products';
import './FilterPanel.css';

const EMPTY = {
  availability: '',
  express: false,
  deliveryDate: '',
  ratingMin: 0,
  ratingBelow4: false,
  priceMin: 0,
  priceMax: 0,
  discount50: false,
  priceDrop: false,
  brands: [],
  categories: [],
  colors: [],
  size: '',
  readyToBuy: false,
  sortBy: '',
};

export { EMPTY as emptyFilters };

export default function FilterPanel({ open, filters, onChange, onClose, onClear }) {
  if (!open) return null;

  const brands = getBrands();
  const categories = getCategoriesFromProducts();

  const toggleBrand = (b) => {
    const brands = filters.brands.includes(b)
      ? filters.brands.filter((x) => x !== b)
      : [...filters.brands, b];
    onChange({ ...filters, brands });
  };

  const toggleCategory = (c) => {
    const categories = filters.categories.includes(c)
      ? filters.categories.filter((x) => x !== c)
      : [...filters.categories, c];
    onChange({ ...filters, categories });
  };

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="filter-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <h2>Filters & Sort</h2>
          <button type="button" onClick={onClose}>✕</button>
        </div>

        <div className="sheet-body">
          <section>
            <h3>Sort</h3>
            <select
              className="tour-sort-select"
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Highest Rated</option>
              <option value="delivery">Fastest Delivery</option>
            </select>
          </section>

          <section className="tour-ready-to-buy">
            <h3>Ready to buy</h3>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={filters.readyToBuy}
                onChange={(e) => onChange({ ...filters, readyToBuy: e.target.checked })}
              />
              In stock + Size M + EXPRESS+ + 4.5★+
            </label>
          </section>

          <section>
            <h3>Availability</h3>
            <div className="chip-row">
              {['', 'in', 'out'].map((v) => (
                <button
                  key={v || 'all'}
                  type="button"
                  className={`chip ${filters.availability === v ? 'active' : ''}`}
                  onClick={() => onChange({ ...filters, availability: v })}
                >
                  {v === '' ? 'All' : v === 'in' ? 'In stock' : 'Out of stock'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Delivery</h3>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={filters.express}
                onChange={(e) => onChange({ ...filters, express: e.target.checked })}
              />
              EXPRESS+ only
            </label>
            <div className="chip-row">
              {['Aug 27', 'Aug 28', 'Aug 29'].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`chip ${filters.deliveryDate === d ? 'active' : ''}`}
                  onClick={() =>
                    onChange({
                      ...filters,
                      deliveryDate: filters.deliveryDate === d ? '' : d,
                    })
                  }
                >
                  By {d}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Rating</h3>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${filters.ratingMin === 4 ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    ratingMin: filters.ratingMin === 4 ? 0 : 4,
                    ratingBelow4: false,
                  })
                }
              >
                4★+
              </button>
              <button
                type="button"
                className={`chip ${filters.ratingMin === 4.5 ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    ratingMin: filters.ratingMin === 4.5 ? 0 : 4.5,
                    ratingBelow4: false,
                  })
                }
              >
                4.5★+
              </button>
              <button
                type="button"
                className={`chip ${filters.ratingBelow4 ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    ratingBelow4: !filters.ratingBelow4,
                    ratingMin: 0,
                  })
                }
              >
                Below 4★
              </button>
            </div>
          </section>

          <section>
            <h3>Price</h3>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${filters.priceMax === 500 ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    priceMax: filters.priceMax === 500 ? 0 : 500,
                    priceMin: 0,
                  })
                }
              >
                Under ₹500
              </button>
              <button
                type="button"
                className={`chip ${filters.priceMin === 500 && filters.priceMax === 1000 ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    priceMin: filters.priceMin === 500 ? 0 : 500,
                    priceMax: filters.priceMax === 1000 ? 0 : 1000,
                  })
                }
              >
                ₹500-1000
              </button>
              <button
                type="button"
                className={`chip ${filters.priceMin === 1000 && !filters.priceMax ? 'active' : ''}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    priceMin: filters.priceMin === 1000 ? 0 : 1000,
                    priceMax: 0,
                  })
                }
              >
                ₹1000+
              </button>
            </div>
          </section>

          <section>
            <h3>Discount</h3>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={filters.discount50}
                onChange={(e) => onChange({ ...filters, discount50: e.target.checked })}
              />
              50%+ off
            </label>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={filters.priceDrop}
                onChange={(e) => onChange({ ...filters, priceDrop: e.target.checked })}
              />
              Price dropped only
            </label>
          </section>

          <section>
            <h3>Size</h3>
            <div className="chip-row">
              {['XS', 'S', 'M', 'L', 'XL', '8', '9', '10'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${filters.size === s ? 'active' : ''}`}
                  onClick={() =>
                    onChange({ ...filters, size: filters.size === s ? '' : s })
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Brand</h3>
            <div className="chip-row wrap">
              {brands.slice(0, 12).map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`chip ${filters.brands.includes(b) ? 'active' : ''}`}
                  onClick={() => toggleBrand(b)}
                >
                  {b.length > 14 ? `${b.slice(0, 12)}…` : b}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Category</h3>
            <div className="chip-row wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${filters.categories.includes(c) ? 'active' : ''}`}
                  onClick={() => toggleCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="sheet-footer">
          <button type="button" className="clear-btn" onClick={onClear}>Clear all</button>
          <button type="button" className="apply-btn tour-filter-apply" onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  );
}
