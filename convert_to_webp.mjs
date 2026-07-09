import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');
const srcDir = path.join(process.cwd(), 'src');

async function processImages(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await processImages(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
            const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            try {
                await sharp(fullPath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                await fs.unlink(fullPath);
                console.log(`Converted and deleted: ${entry.name}`);
            } catch (err) {
                console.error(`Failed to convert ${fullPath}:`, err);
            }
        }
    }
}

async function updateCodeReferences(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await updateCodeReferences(fullPath);
        } else if (/\.(tsx|ts|jsx|js|css)$/i.test(entry.name)) {
            let content = await fs.readFile(fullPath, 'utf-8');
            let updated = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');
            // Fix import.meta.glob
            updated = updated.replace(/\{webp,webp,webp,webp\}/g, '{webp}');
            if (content !== updated) {
                await fs.writeFile(fullPath, updated, 'utf-8');
                console.log(`Updated references in: ${entry.name}`);
            }
        }
    }
}

async function main() {
    console.log('Starting image conversion...');
    await processImages(assetsDir);
    console.log('Starting code reference updates...');
    await updateCodeReferences(srcDir);
    console.log('Done!');
}

main().catch(console.error);
