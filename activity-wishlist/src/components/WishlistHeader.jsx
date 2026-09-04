import './WishlistHeader.css';

export default function WishlistHeader({
  totalCount,
  onFilterClick,
  onCompareToggle,
  compareMode,
  filterActive,
}) {
  return (
    <header className="wishlist-header tour-wishlist-header">
      <button type="button" className="back-btn" aria-label="Back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="title-block">
        <h1>Wishlist</h1>
        <p className="tour-item-count">{totalCount} items</p>
      </div>
      <div className="header-actions">
        {onCompareToggle && (
          <button
            type="button"
            className={`icon-btn tour-compare-btn ${compareMode ? 'active' : ''}`}
            onClick={onCompareToggle}
            title="Compare"
          >
            ⇄
          </button>
        )}
        {onFilterClick && (
          <button
            type="button"
            className={`icon-btn tour-filter-btn ${filterActive ? 'active' : ''}`}
            onClick={onFilterClick}
            title="Filters"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
            {filterActive && <span className="badge-dot" />}
          </button>
        )}
        <button type="button" className="icon-btn bag-btn" aria-label="Bag">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span className="bag-badge">1</span>
        </button>
      </div>
    </header>
  );
}
