import { defineConfig } from 'astro/config';
import sharp from 'sharp';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Pictures in the Markdown posts (help, updates) point into public/ and come out of Markdown
// without a size. After the build, give every <img> without one its width and height (so the
// browser keeps the room free while it loads, no jumping text), and load all but a page's first
// picture only when it comes near the screen.
const imageSizes = {
    name: 'quidey-image-sizes',
    hooks: {
        'astro:build:done': async ({ dir, logger }) => {
            const root = fileURLToPath(dir);
            const publicDir = fileURLToPath(new URL('./public/', import.meta.url));
            const sizes = new Map();
            const sizeOf = async (src) => {
                if (!sizes.has(src)) sizes.set(src, sharp(join(publicDir, decodeURI(src))).metadata().catch(() => null));
                return sizes.get(src);
            };
            const files = (await readdir(root, { recursive: true })).filter(f => f.endsWith('.html'));
            let count = 0;
            for (const file of files) {
                const path = join(root, file);
                const html = await readFile(path, 'utf8');
                const tags = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
                if (!tags.some(tag => !/\bwidth=/.test(tag))) continue;
                let out = html;
                let seen = 0;
                for (const tag of tags) {
                    seen += 1;
                    if (/\bwidth=/.test(tag)) continue;
                    const src = tag.match(/\bsrc="(\/[^"/][^"]*)"/)?.[1];
                    const meta = src && await sizeOf(src);
                    if (!meta?.width) continue;
                    const extra = ` width="${meta.width}" height="${meta.height}" decoding="async"${seen > 1 && !/\bloading=/.test(tag) ? ' loading="lazy"' : ''}`;
                    out = out.replace(tag, tag.replace(/^<img\b/, `<img${extra}`));
                    count += 1;
                }
                await writeFile(path, out);
            }
            logger.info(`sizes added to ${count} pictures`);
        },
    },
};

// A static site: every page is plain HTML at build time, the few scripts are files of their own.
// The Content-Security-Policy in public/_headers allows no inline styles or scripts, so nothing
// is inlined into the pages.
export default defineConfig({
    site: 'https://quidey.com',
    trailingSlash: 'ignore',
    integrations: [imageSizes],
    build: {
        format: 'directory',
        inlineStylesheets: 'never',
    },
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
    },
});
