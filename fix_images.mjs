import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function fixImages() {
    try {
        const woodenJpg = path.join(process.cwd(), 'src', 'assets', 'Wooden', 'Wooden.jpg');
        const woodenWebp = path.join(process.cwd(), 'src', 'assets', 'Wooden', 'Wooden.webp');
        
        console.log(`Processing Wooden.jpg...`);
        await sharp(woodenJpg, { limitInputPixels: false })
            .resize({ width: 2560, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(woodenWebp);
        await fs.unlink(woodenJpg);
        console.log('Successfully fixed Wooden.jpg!');
    } catch(err) {
        console.error('Failed Wooden.jpg', err);
    }

    try {
        const protoPng = path.join(process.cwd(), 'src', 'assets', 'Protofolio', 'top-kitchen-cabinet-color-trends-for-2026.png');
        const protoWebp = path.join(process.cwd(), 'src', 'assets', 'Protofolio', 'top-kitchen-cabinet-color-trends-for-2026.webp');
        
        console.log(`Processing top-kitchen-cabinet-color-trends-for-2026.png...`);
        await sharp(protoPng, { limitInputPixels: false })
            .resize({ width: 2560, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(protoWebp);
        await fs.unlink(protoPng);
        console.log('Successfully fixed top-kitchen.png!');
    } catch(err) {
        console.error('Failed top-kitchen.png', err);
    }
}

fixImages();
