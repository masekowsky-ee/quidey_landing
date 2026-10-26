// Draws the small icons from public/icons/icon-512.png: public/icons/icon-192.png (the favicon
// Google shows beside the result; it wants a square that is a multiple of 48 px) and
// public/favicon.ico (16/32/48, for crawlers and browsers that ask for /favicon.ico by itself).
// The rounded corners are filled with the icon's ground, as search results cut it to a circle.
// Run it after the icon changes:
//   node scripts/favicons.mjs
// Uses sharp, which Astro brings along for its images.
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const source = join(root, 'public/icons/icon-512.png');
const ground = '#0e0d0c';

const png = size => sharp(source).flatten({ background: ground }).resize(size, size).png().toBuffer();

writeFileSync(join(root, 'public/icons/icon-192.png'), await png(192));

// an .ico is a small directory of PNGs: 6 bytes header, 16 bytes per entry, then the images
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(images[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += images[i].length;
});
writeFileSync(join(root, 'public/favicon.ico'), Buffer.concat([header, ...images]));

console.log('public/icons/icon-192.png, public/favicon.ico');
