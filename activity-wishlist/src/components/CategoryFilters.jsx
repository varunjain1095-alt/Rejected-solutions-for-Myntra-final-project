import { CATEGORIES } from '../data/products';
import './CategoryFilters.css';

const THUMBS = {
  Sandals: 'IMG_9617.png',
  Tshirts: 'IMG_9610.jpeg',
  Sarees: 'IMG_9616.png',
  Pendant: 'IMG_9619.png',
  'Hair Masks': 'IMG_9616.png',
  'Co-ord': 'IMG_9612.jpeg',
};

export default function CategoryFilters({ active, onChange }) {
  return (
    <div className="category-scroll">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-item ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(active === cat ? '' : cat)}
        >
          <div
            className="category-thumb"
            style={{
              backgroundImage: `url(/screenshots/${THUMBS[cat] || 'IMG_9610.jpeg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <span>{cat}</span>
        </button>
      ))}
    </div>
  );
}
