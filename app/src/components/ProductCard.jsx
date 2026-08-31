import { formatPrice } from '../utils/helpers';
import './ProductCard.css';

export default function ProductCard({
  product,
  showInfoTiles = false,
  priority,
  onPriorityChange,
  compareMode,
  compareSelected,
  onCompareToggle,
  highlight,
  isFirstCard = false,
}) {
  const imageSrc = `/assets/products/${product.id}.jpg`;

  return (
    <article
      className={`product-card ${highlight ? 'highlight' : ''} ${isFirstCard ? 'tour-first-card' : ''}`}
      data-product-id={product.id}
    >
      {compareMode && (
        <label className={`compare-check ${isFirstCard ? 'tour-compare-check' : ''}`}>
          <input
            type="checkbox"
            checked={compareSelected}
            onChange={() => onCompareToggle(product.id)}
          />
          Compare
        </label>
      )}

      <div className="product-image-wrap">
        <img
          src={imageSrc}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {!product.inStock && <div className="oos-banner">OUT OF STOCK</div>}
        {product.priceDrop && (
          <div className="price-drop-banner">PRICE DROP BY ₹{product.priceDrop}</div>
        )}
        {product.rating && (
          <span className="rating-badge">{product.rating} ★</span>
        )}
        <button type="button" className="add-btn">
          <span className="add-icon">🛍</span>
          {product.inStock ? 'Add' : 'Similar'}
        </button>
      </div>

      <div className="product-info">
        <strong className="brand">{product.brand}</strong>
        <p className="title">{product.title}</p>
        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          {product.discount && <span className="discount">{product.discount}% OFF</span>}
          {product.mrp && <span className="mrp">{formatPrice(product.mrp)}</span>}
        </div>
        {product.deliveryDate && (
          <p className="delivery">
            Delivery on <strong>{product.deliveryDate}</strong>
            {product.express && <span className="express"> M EXPRESS+</span>}
          </p>
        )}

        {showInfoTiles && (
          <>
            <p className={`info-tile ${isFirstCard ? 'tour-info-tiles' : ''}`}>
              Sizes: {product.sizes.join(', ')} available
            </p>
            <p className="info-tile">{product.returnPolicy}</p>
            {product.stockLevel && (
              <p className="info-tile urgent">Only {product.stockLevel} left</p>
            )}
          </>
        )}

        {onPriorityChange && (
          <div className={`priority-pills ${isFirstCard ? 'tour-priority-pills' : ''}`}>
            {['soon', 'maybe', 'later'].map((level) => (
              <button
                key={level}
                type="button"
                className={`priority-pill ${priority === level ? 'active' : ''}`}
                onClick={() => onPriorityChange(product.id, priority === level ? null : level)}
              >
                {level === 'soon' ? 'Soon' : level === 'maybe' ? 'Maybe' : 'Later'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="action-bar">
        <button type="button" aria-label="Delete" className="action-icon">🗑</button>
        <button type="button" aria-label="Collection" className="action-icon">📁+</button>
        <button type="button" aria-label="Share" className="action-icon">↗</button>
      </div>
    </article>
  );
}
