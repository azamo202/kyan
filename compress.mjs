import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
  'src/assets/اسطح',
  'src/assets/كونترات',
  'src/assets/مغاسل',
  'src/assets/قبل وبعد'
];

async function processImages() {
  let totalSaved = 0;
  let compressedCount = 0;
  
  for (const dir of targetDirs) {
    const fullPath = path.join(__dirname, dir);
    // Create new folder for compressed images
    const compressedDir = dir + '_compressed';
    const compressedPath = path.join(__dirname, compressedDir);
    
    await fs.mkdir(compressedPath, { recursive: true });

    let files = [];
    try {
      files = await fs.readdir(fullPath);
    } catch (e) {
      continue;
    }

    const webpFiles = files.filter(f => f.endsWith('.webp') && !f.endsWith('.tmp.webp'));

    for (const file of webpFiles) {
      const filePath = path.join(fullPath, file);
      const destPath = path.join(compressedPath, file);
      
      const stat = await fs.stat(filePath);
      const originalSize = stat.size;

      try {
        const buffer = await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toBuffer();

        const newSize = buffer.length;

        // Write to new destination
        await fs.writeFile(destPath, buffer);
        
        if (newSize < originalSize) {
          const saved = originalSize - newSize;
          totalSaved += saved;
        }
        compressedCount++;
        console.log(`Compressed ${file}: ${(originalSize / 1024).toFixed(2)}KB -> ${(newSize / 1024).toFixed(2)}KB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
  
  console.log(`\nCompressed ${compressedCount} images into new folders. Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

processImages().catch(console.error);
