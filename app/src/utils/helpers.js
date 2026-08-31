export const CROP_STYLES = {
  'grid-1': { backgroundSize: '200% 280%', backgroundPosition: '5% 55%' },
  'grid-2': { backgroundSize: '200% 280%', backgroundPosition: '95% 55%' },
  tl: { backgroundSize: '200% 220%', backgroundPosition: '5% 18%' },
  tr: { backgroundSize: '200% 220%', backgroundPosition: '95% 18%' },
  bl: { backgroundSize: '200% 220%', backgroundPosition: '5% 82%' },
  br: { backgroundSize: '200% 220%', backgroundPosition: '95% 82%' },
};

export function formatPrice(n) {
  return `₹${n}`;
}

export function sortProducts(list, sortBy) {
  const arr = [...list];
  switch (sortBy) {
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'discount':
      return arr.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'rating':
      return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'delivery':
      return arr.sort((a, b) => (b.express ? 1 : 0) - (a.express ? 1 : 0));
    default:
      return arr;
  }
}

export function applyFilters(products, filters) {
  let result = [...products];

  if (filters.availability === 'in') result = result.filter((p) => p.inStock);
  if (filters.availability === 'out') result = result.filter((p) => !p.inStock);

  if (filters.express) result = result.filter((p) => p.express);
  if (filters.deliveryDate) result = result.filter((p) => p.deliveryDate === filters.deliveryDate);
  if (filters.priceDrop) result = result.filter((p) => p.priceDrop);

  if (filters.ratingMin === 4) result = result.filter((p) => p.rating && p.rating >= 4);
  if (filters.ratingMin === 4.5) result = result.filter((p) => p.rating && p.rating >= 4.5);
  if (filters.ratingBelow4) result = result.filter((p) => p.rating && p.rating < 4);

  if (filters.priceMax) result = result.filter((p) => p.price <= filters.priceMax);
  if (filters.priceMin) result = result.filter((p) => p.price >= filters.priceMin);
  if (filters.discount50) result = result.filter((p) => (p.discount || 0) >= 50);

  if (filters.brands?.length) result = result.filter((p) => filters.brands.includes(p.brand));
  if (filters.categories?.length) result = result.filter((p) => filters.categories.includes(p.category));
  if (filters.colors?.length) result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
  if (filters.size) result = result.filter((p) => p.sizes.includes(filters.size));

  if (filters.readyToBuy) {
    result = result.filter(
      (p) => p.inStock && p.sizes.includes('M') && p.express && p.rating && p.rating >= 4.5
    );
  }

  return result;
}

export function groupByPriority(products, priorityState) {
  const groups = { soon: [], maybe: [], later: [], undecided: [] };
  products.forEach((p) => {
    const key = priorityState[p.id] || 'undecided';
    groups[key].push(p);
  });
  return groups;
}

export const PRIORITY_LABELS = {
  soon: 'Buy soon',
  maybe: 'Maybe',
  later: 'Later',
  undecided: 'Undecided',
};

export const COMPARE_ROWS = [
  { key: 'brand', label: 'Brand' },
  { key: 'price', label: 'Price', format: (p) => formatPrice(p.price) },
  { key: 'rating', label: 'Rating', format: (p) => (p.rating ? `${p.rating} ★` : '-') },
  { key: 'sizes', label: 'Sizes', format: (p) => p.sizes.join(', ') },
  { key: 'delivery', label: 'Delivery', format: (p) => p.deliveryDate || (p.express ? 'EXPRESS+' : '-') },
  { key: 'discount', label: 'Discount', format: (p) => (p.discount ? `${p.discount}% OFF` : '-') },
  { key: 'category', label: 'Category' },
];

export function getRowBest(products, row) {
  if (row.key === 'price') return products.reduce((a, b) => (a.price < b.price ? a : b)).id;
  if (row.key === 'discount') return products.reduce((a, b) => ((a.discount || 0) > (b.discount || 0) ? a : b)).id;
  if (row.key === 'rating') return products.reduce((a, b) => ((a.rating || 0) > (b.rating || 0) ? a : b)).id;
  return null;
}
