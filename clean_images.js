import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dataFile = 'd:/Kyan/kyan/src/lib/productsData.ts';

async function getImageHash(filePath) {
  try {
    const { data } = await sharp(filePath)
      .resize(8, 8, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });
      
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    let hash = 0n;
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= avg) {
        hash |= (1n << BigInt(i));
      }
    }
    return hash;
  } catch (e) {
    return null;
  }
}

function hammingDistance(h1, h2) {
  let diff = h1 ^ h2;
  let count = 0;
  while (diff > 0n) {
    count += Number(diff & 1n);
    diff >>= 1n;
  }
  return count;
}

async function main() {
  const content = fs.readFileSync(dataFile, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  
  for (let line of lines) {
    if (line.includes('{ id:') && line.includes('images:')) {
      const imagesMatch = line.match(/images:\s*\[(.*?)\]/);
      if (imagesMatch) {
        const currentImages = imagesMatch[1].split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s.length > 0);
        
        // prioritize .jpg over .webp
        currentImages.sort((a, b) => {
          const isA = a.match(/\.(jpg|jpeg)$/i);
          const isB = b.match(/\.(jpg|jpeg)$/i);
          if (isA && !isB) return -1;
          if (!isA && isB) return 1;
          return 0;
        });
        
        const uniqueImages = [];
        const hashes = [];
        
        for (const imgPath of currentImages) {
          const absPath = path.join('d:/Kyan/kyan', imgPath);
          if (!fs.existsSync(absPath)) continue;
          
          const hash = await getImageHash(absPath);
          if (hash === null) {
            uniqueImages.push(imgPath);
            continue;
          }
          
          let isDuplicate = false;
          for (const h of hashes) {
            if (hammingDistance(hash, h) <= 4) {
              isDuplicate = true;
              break;
            }
          }
          
          if (!isDuplicate) {
            hashes.push(hash);
            uniqueImages.push(imgPath);
          }
        }
        
        const slabs = [];
        const apps = [];
        
        for (const imgPath of uniqueImages) {
           const absPath = path.join('d:/Kyan/kyan', imgPath);
           const metadata = await sharp(absPath).metadata();
           
           const basename = path.basename(imgPath, '.webp');
           const isWebp = imgPath.endsWith('.webp');
           const endsWithDigit = /\d$/.test(basename);
           // Statuario Whitee is an application
           const isWhitee = basename.toLowerCase() === 'statuario whitee';
           
           if (isWebp && (endsWithDigit || isWhitee)) {
              apps.push(imgPath);
           } else {
              slabs.push({ path: imgPath, width: metadata.width, height: metadata.height });
           }
        }
        
        slabs.sort((a, b) => {
           const aMulti = a.width > a.height;
           const bMulti = b.width > b.height;
           if (aMulti !== bMulti) return aMulti ? 1 : -1;
           return a.path.localeCompare(b.path);
        });
        
        const finalSlabs = slabs.map(s => s.path);
        
        // Remove existing applications: [...] if it exists from previous runs
        let cleanedLine = line.replace(/,\s*applications:\s*\[.*?\]/, '');
        
        let newLine = cleanedLine.replace(/images:\s*\[.*?\]/, `images: ${JSON.stringify(finalSlabs)}, applications: ${JSON.stringify(apps)}`);
        newLines.push(newLine);
      } else {
        newLines.push(line);
      }
    } else {
      if (line.includes('images: string[];') && !content.includes('applications: string[];')) {
        newLines.push(line);
        newLines.push('  applications: string[];');
      } else {
        newLines.push(line);
      }
    }
  }
  
  fs.writeFileSync(dataFile, newLines.join('\n'));
  console.log("Cleaned images successfully.");
}

main().catch(console.error);
