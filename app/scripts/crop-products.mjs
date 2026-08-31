/**
 * Crop product images from Myntra wishlist screenshots.
 * Run: node scripts/crop-products.mjs
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const screenshotsDir = path.join(root, 'public', 'screenshots');
const outDir = path.join(root, 'public', 'assets', 'products');

// Product crop definitions: id -> { file, region }
// Regions as fractions of image width/height after measuring typical layout
const CROPS = [
  { id: '1', file: 'IMG_9610.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.22 },
  { id: '2', file: 'IMG_9610.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.22 },
  { id: '3', file: 'IMG_9611.jpeg', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '4', file: 'IMG_9611.jpeg', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '5', file: 'IMG_9611.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '6', file: 'IMG_9611.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '7', file: 'IMG_9612.jpeg', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '8', file: 'IMG_9612.jpeg', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '9', file: 'IMG_9612.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '10', file: 'IMG_9612.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '11', file: 'IMG_9613.jpeg', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '12', file: 'IMG_9613.jpeg', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '13', file: 'IMG_9613.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '14', file: 'IMG_9613.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '15', file: 'IMG_9614.jpeg', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '16', file: 'IMG_9614.jpeg', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '17', file: 'IMG_9614.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '18', file: 'IMG_9614.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '19', file: 'IMG_9615.jpeg', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '20', file: 'IMG_9615.jpeg', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '21', file: 'IMG_9615.jpeg', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '22', file: 'IMG_9615.jpeg', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '23', file: 'IMG_9616.png', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '24', file: 'IMG_9616.png', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '25', file: 'IMG_9616.png', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '26', file: 'IMG_9616.png', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '27', file: 'IMG_9617.png', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '28', file: 'IMG_9617.png', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '29', file: 'IMG_9617.png', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '30', file: 'IMG_9617.png', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '31', file: 'IMG_9618.png', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '32', file: 'IMG_9618.png', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '33', file: 'IMG_9618.png', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '34', file: 'IMG_9618.png', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '35', file: 'IMG_9619.png', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '36', file: 'IMG_9619.png', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '37', file: 'IMG_9619.png', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '38', file: 'IMG_9619.png', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
  { id: '39', file: 'IMG_9620.png', left: 0.02, top: 0.08, width: 0.47, height: 0.42 },
  { id: '40', file: 'IMG_9620.png', left: 0.51, top: 0.08, width: 0.47, height: 0.42 },
  { id: '41', file: 'IMG_9620.png', left: 0.02, top: 0.52, width: 0.47, height: 0.42 },
  { id: '42', file: 'IMG_9620.png', left: 0.51, top: 0.52, width: 0.47, height: 0.42 },
];

fs.mkdirSync(outDir, { recursive: true });

for (const crop of CROPS) {
  const src = path.join(screenshotsDir, crop.file);
  if (!fs.existsSync(src)) {
    console.warn('Missing:', src);
    continue;
  }
  const meta = await sharp(src).metadata();
  const x = Math.round(meta.width * crop.left);
  const y = Math.round(meta.height * crop.top);
  const w = Math.round(meta.width * crop.width);
  const h = Math.round(meta.height * crop.height);

  // Product photo only: exclude rating badge, Add button, and text/action rows below.
  // Compact 9610 slots are mostly image; 4-up grid cards need a tighter vertical slice.
  const imageFraction = crop.height <= 0.25 ? 0.78 : 0.5;
  const imageH = Math.round(h * imageFraction);

  await sharp(src)
    .extract({ left: x, top: y, width: w, height: imageH })
    .resize(400, 500, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, `${crop.id}.jpg`));

  console.log('Cropped product', crop.id);
}

console.log('Done:', CROPS.length, 'images');
