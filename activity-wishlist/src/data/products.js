// 42 products from Myntra wishlist screenshots (9610-9620)

const CATEGORIES = ['Sandals', 'Tshirts', 'Sarees', 'Pendant', 'Hair Masks', 'Co-ord', 'Beauty', 'Accessories', 'Home'];

function p(data) {
  return {
    inStock: true,
    express: false,
    deliveryDate: null,
    rating: null,
    discount: null,
    mrp: null,
    priceDrop: null,
    colors: ['Multi'],
    sizes: ['M', 'L'],
    returnPolicy: '7-day returns · Free exchange',
    ...data,
  };
}

export const products = [
  p({ id: '1', brand: 'Rain & Rainbow', title: 'Rain & Rainbow Women Pure Cotton Peplum Top', price: 813, mrp: 1995, discount: 59, rating: 4.4, deliveryDate: 'Aug 28', express: true, category: 'Tshirts', screenshot: 'IMG_9610.jpeg', crop: 'grid-1', colors: ['Red', 'Black'] }),
  p({ id: '2', brand: 'Rain & Rainbow', title: 'Rain & Rainbow Women Knitted Peplum Top', price: 994, mrp: 1995, discount: 50, rating: 4.4, deliveryDate: 'Aug 28', express: true, category: 'Tshirts', screenshot: 'IMG_9610.jpeg', crop: 'grid-2', colors: ['Brown', 'Black'] }),
  p({ id: '3', brand: 'DressBerry', title: 'DressBerry Women V-Nock Polo T-shirt', price: 999, rating: 4.2, category: 'Tshirts', screenshot: 'IMG_9611.jpeg', crop: 'tl', sizes: ['S', 'M', 'L'] }),
  p({ id: '4', brand: 'Tokyo Talkies', title: 'Tokyo Talkies Graphic Printed T-shirt', price: 186, mrp: 849, discount: 78, rating: 4.3, deliveryDate: 'Aug 27', express: true, category: 'Tshirts', screenshot: 'IMG_9611.jpeg', crop: 'tr', colors: ['Pink', 'White'] }),
  p({ id: '5', brand: 'DressBerry', title: 'DressBerry Women V-Neck Polo T-shirt Yellow', price: 170, inStock: false, category: 'Tshirts', screenshot: 'IMG_9611.jpeg', crop: 'bl', colors: ['Yellow'] }),
  p({ id: '6', brand: 'Tikhi Imli', title: 'Tikhi Imli Embroidered Tunic With Trousers', price: 1599, mrp: 4747, discount: 66, rating: 4.4, category: 'Co-ord', screenshot: 'IMG_9611.jpeg', crop: 'br' }),
  p({ id: '7', brand: 'Tikhi Imli', title: 'Tikhi Imli Embroidered V-Neck Tunic Set Pink', price: 1699, mrp: 4747, discount: 64, rating: 4.5, category: 'Co-ord', screenshot: 'IMG_9612.jpeg', crop: 'tl' }),
  p({ id: '8', brand: 'Tikhi Imli', title: 'Tikhi Imli Olive Tunic With White Pants', price: 1649, mrp: 4747, discount: 65, rating: 4.3, category: 'Co-ord', screenshot: 'IMG_9612.jpeg', crop: 'tr' }),
  p({ id: '9', brand: 'Annabelle', title: 'Annabelle by Pantaloons Black Midi Dress', price: 1699, inStock: false, category: 'Co-ord', screenshot: 'IMG_9612.jpeg', crop: 'bl' }),
  p({ id: '10', brand: 'Tradivibe', title: 'Tradivibe Women Woven Design Saree', price: 1299, mrp: 2999, discount: 57, rating: 2, category: 'Sarees', screenshot: 'IMG_9612.jpeg', crop: 'br' }),
  p({ id: '11', brand: 'gleam soul', title: 'gleam soul Professional Ultra-Soft Brush', price: 573, mrp: 999, discount: 43, category: 'Beauty', screenshot: 'IMG_9613.jpeg', crop: 'tl' }),
  p({ id: '12', brand: 'DailyObjects', title: 'DailyObjects MakeUp Ritual Phone Case', price: 1099, mrp: 2099, discount: 48, rating: 4.7, category: 'Accessories', screenshot: 'IMG_9613.jpeg', crop: 'tr' }),
  p({ id: '13', brand: 'Rubans', title: 'Rubans Women Brass Peacock Waist Belt', price: 1290, mrp: 3686, discount: 65, rating: 4.8, category: 'Accessories', screenshot: 'IMG_9613.jpeg', crop: 'bl' }),
  p({ id: '14', brand: 'Makeup Revolution London', title: 'Makeup Revolution London Pout Bomb Lip Gloss', price: 425, mrp: 850, discount: 50, rating: 4.4, category: 'Beauty', screenshot: 'IMG_9613.jpeg', crop: 'br' }),
  p({ id: '15', brand: 'THE TAN CLAN', title: 'THE TAN CLAN Women Accessory Gift Set', price: 2939, mrp: 6999, discount: 58, rating: 4.2, category: 'Accessories', screenshot: 'IMG_9614.jpeg', crop: 'tl' }),
  p({ id: '16', brand: 'Peora', title: 'Peora Gold Plated Studded Waist Chain', price: 627, mrp: 2495, discount: 75, rating: 4.2, priceDrop: 50, deliveryDate: 'Aug 27', express: true, category: 'Accessories', screenshot: 'IMG_9614.jpeg', crop: 'tr' }),
  p({ id: '17', brand: 'Praush', title: 'Praush Celestial Super Soft Makeup Sponge', price: 535, mrp: 550, discount: 3, rating: 4.8, category: 'Beauty', screenshot: 'IMG_9614.jpeg', crop: 'bl' }),
  p({ id: '18', brand: 'Renee', title: 'Renee Makeup Fix Weightless Setting Spray', price: 315, mrp: 399, discount: 21, rating: 4.3, priceDrop: 20, category: 'Beauty', screenshot: 'IMG_9614.jpeg', crop: 'br' }),
  p({ id: '19', brand: 'Jockey', title: 'Jockey Cotton Terry Ultrasoft Towel', price: 799, rating: 4.5, category: 'Home', screenshot: 'IMG_9615.jpeg', crop: 'tl', sizes: ['Free Size'] }),
  p({ id: '20', brand: 'Simple', title: 'Simple Kind To Skin Refreshing Facial Wash', price: 294, mrp: 420, discount: 30, rating: 4.6, deliveryDate: 'Aug 27', express: true, category: 'Beauty', screenshot: 'IMG_9615.jpeg', crop: 'tr' }),
  p({ id: '21', brand: 'Cetaphil', title: 'Cetaphil Gentle Skin Cleanser 250ml', price: 711, mrp: 799, discount: 11, rating: 4.6, category: 'Beauty', screenshot: 'IMG_9615.jpeg', crop: 'bl' }),
  p({ id: '22', brand: 'Mast & Harbour', title: 'Mast & Harbour Women Straight Fit Jeans', price: 972, mrp: 1899, discount: 49, category: 'Co-ord', screenshot: 'IMG_9615.jpeg', crop: 'br', sizes: ['S', 'M', 'L', 'XL'] }),
  p({ id: '23', brand: 'KALINI', title: 'KALINI Bandhani Pure Georgette Saree Green', price: 702, mrp: 1873, discount: 63, category: 'Sarees', screenshot: 'IMG_9616.png', crop: 'tl' }),
  p({ id: '24', brand: 'KALINI', title: 'KALINI Floral Print Keyhole Neck Top', price: 599, mrp: 1699, discount: 65, deliveryDate: 'Aug 29', category: 'Tshirts', screenshot: 'IMG_9616.png', crop: 'tr' }),
  p({ id: '25', brand: 'PTVIZE', title: 'PTVIZE Women Printed T-shirt With Denim Jacket', price: 899, rating: 4, category: 'Tshirts', screenshot: 'IMG_9616.png', crop: 'bl' }),
  p({ id: '26', brand: "L'Oreal Professionnel", title: "L'Oreal Professionnel Absolut Repair Hair Mask", price: 649, rating: 4.6, category: 'Hair Masks', screenshot: 'IMG_9616.png', crop: 'br', returnPolicy: 'Non-returnable' }),
  p({ id: '27', brand: 'KALINI', title: 'KALINI Floral Poly Georgette Saree Pink', price: 959, inStock: false, category: 'Sarees', screenshot: 'IMG_9617.png', crop: 'tl' }),
  p({ id: '28', brand: 'HRX by Hrithik Roshan', title: 'HRX by Hrithik Roshan Men Comfort Sandals', price: 585, mrp: 1998, discount: 71, rating: 3.1, category: 'Sandals', screenshot: 'IMG_9617.png', crop: 'tr', sizes: ['8', '9', '10'] }),
  p({ id: '29', brand: 'Kerzl', title: 'Kerzl Men Olive Comfort Sandals', price: 676, mrp: 2299, discount: 71, category: 'Sandals', screenshot: 'IMG_9617.png', crop: 'bl', sizes: ['7', '8', '9'] }),
  p({ id: '30', brand: 'Roadster', title: 'Roadster Men Comfort Sandals Black', price: 644, mrp: 1499, discount: 57, deliveryDate: 'Aug 29', category: 'Sandals', screenshot: 'IMG_9617.png', crop: 'br', sizes: ['8', '9'] }),
  p({ id: '31', brand: 'AJANTA SHOES', title: 'AJANTA SHOES Men Comfort Sandals Tan', price: 499, mrp: 1999, discount: 75, category: 'Sandals', screenshot: 'IMG_9618.png', crop: 'tl', sizes: ['8', '9', '10'] }),
  p({ id: '32', brand: 'Mast & Harbour', title: 'Mast & Harbour Men Comfort Sandals Tan', price: 680, mrp: 4999, discount: 86, rating: 4.2, category: 'Sandals', screenshot: 'IMG_9618.png', crop: 'tr' }),
  p({ id: '33', brand: 'Bata', title: 'Bata Men Textured Cross Strap Sandals', price: 674, mrp: 899, discount: 25, rating: 4.4, category: 'Sandals', screenshot: 'IMG_9618.png', crop: 'bl' }),
  p({ id: '34', brand: 'PALMONAS', title: 'PALMONAS Gold Plated Pearl Necklace', price: 1099, inStock: false, category: 'Pendant', screenshot: 'IMG_9618.png', crop: 'br' }),
  p({ id: '35', brand: 'PALMONAS', title: 'PALMONAS 18KT Gold-Plated Tree Of Life Pendant', price: 1244, mrp: 3583, discount: 65, rating: 4.5, priceDrop: 690, category: 'Pendant', screenshot: 'IMG_9619.png', crop: 'tl' }),
  p({ id: '36', brand: 'PALMONAS', title: 'PALMONAS 18K Gold-Plated Emerald Pendant', price: 1101, mrp: 3175, discount: 65, rating: 4.1, category: 'Pendant', screenshot: 'IMG_9619.png', crop: 'tr' }),
  p({ id: '37', brand: 'PALMONAS', title: 'PALMONAS 18K Gold-Plated Snake Chain Pendant', price: 1014, mrp: 2747, discount: 63, rating: 4.6, category: 'Pendant', screenshot: 'IMG_9619.png', crop: 'bl' }),
  p({ id: '38', brand: 'Khushal K', title: 'Khushal K Women White Yoke Design Suit', price: 1007, mrp: 4749, discount: 79, rating: 4.3, priceDrop: 322, category: 'Co-ord', screenshot: 'IMG_9619.png', crop: 'br' }),
  p({ id: '39', brand: 'Royal Export', title: 'Royal Export Floral Printed Three Piece Suit', price: 1040, mrp: 4999, discount: 79, rating: 3.8, deliveryDate: 'Aug 27', express: true, category: 'Co-ord', screenshot: 'IMG_9620.png', crop: 'tl' }),
  p({ id: '40', brand: 'Biotic', title: 'Biotic Set Of 5 Amla Reetha Shikakai Powders', price: 273, mrp: 500, discount: 45, category: 'Hair Masks', screenshot: 'IMG_9620.png', crop: 'tr', stockLevel: 2 }),
  p({ id: '41', brand: 'Biotic', title: 'Biotic Set Of 3 Amla Reetha Shikakai Powders', price: 168, mrp: 300, discount: 44, category: 'Hair Masks', screenshot: 'IMG_9620.png', crop: 'bl' }),
  p({ id: '42', brand: 'KALINI', title: 'KALINI Floral Beads and Stones Saree', price: 969, mrp: 2999, discount: 68, rating: 3.3, category: 'Sarees', screenshot: 'IMG_9620.png', crop: 'br' }),
];

export { CATEGORIES };
export const TOTAL_ITEMS = products.length;

export function getCatalogSummary() {
  return products
    .map((x) => `${x.id}|${x.brand}|${x.title.slice(0, 30)}|${x.price}|${x.category}|${x.rating ?? '-'}|${x.inStock}`)
    .join('\n');
}

export function getBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}

export function getCategoriesFromProducts() {
  return [...new Set(products.map((p) => p.category))].sort();
}
