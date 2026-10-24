import { defineConfig } from 'astro/config';

// A static site: every page is plain HTML at build time, the few scripts are files of their own.
// The Content-Security-Policy in public/_headers allows no inline styles or scripts, so nothing
// is inlined into the pages.
export default defineConfig({
    site: 'https://quidey.com',
    trailingSlash: 'ignore',
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
