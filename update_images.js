import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dataFile = 'd:/Kyan/kyan/src/lib/productsData.ts';
const assetsDir = 'd:/Kyan/kyan/src/assets';

async function main() {
  const content = fs.readFileSync(dataFile, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  
  for (let line of lines) {
    if (line.includes('{ id:') && line.includes('images:')) {
      const nameEnMatch = line.match(/nameEn:\s*"([^"]+)"/);
      if (nameEnMatch) {
        const nameEn = nameEnMatch[1];
        const productFolder = path.join(assetsDir, nameEn);
        const applicationsMatch = line.match(/applications:\s*(\[.*?\])/);
        const applications = applicationsMatch ? JSON.parse(applicationsMatch[1].replace(/'/g, '"')) : [];
        if (fs.existsSync(productFolder)) {
          const files = fs.readdirSync(productFolder).filter(f => {
            if (f.endsWith('.tmp.webp') || !f.match(/\.(jpg|jpeg|png|webp)$/i)) return false;
            const p = `/src/assets/${nameEn}/${f}`;
            return !applications.includes(p);
          });
          
          const imagesInfo = [];
          for (let f of files) {
            const p = path.join(productFolder, f);
            try {
              const metadata = await sharp(p).metadata();
              imagesInfo.push({
                file: f,
                path: `/src/assets/${nameEn}/${f}`,
                width: metadata.width,
                height: metadata.height
              });
            } catch (err) {
              console.error(`Error reading ${p}: ${err.message}`);
              imagesInfo.push({
                file: f,
                path: `/src/assets/${nameEn}/${f}`,
                width: 0,
                height: 0
              });
            }
          }
          
          imagesInfo.sort((a, b) => {
            const aMulti = a.width > a.height;
            const bMulti = b.width > b.height;
            if (aMulti !== bMulti) {
              return aMulti ? 1 : -1;
            }
            return a.file.localeCompare(b.file);
          });
          
          const newImagesArrayStr = JSON.stringify(imagesInfo.map(i => i.path));
          const newLine = line.replace(/images:\s*\[.*?\]/, `images: ${newImagesArrayStr}`);
          newLines.push(newLine);
        } else {
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  fs.writeFileSync(dataFile, newLines.join('\n'));
  console.log("Updated productsData.ts successfully.");
}

main().catch(console.error);
