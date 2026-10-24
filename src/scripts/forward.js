// The app's routes as they were on quidey.com (the app's App.jsx). An old link to one of them
// opens the same place in the app; the query string (?token= of a verification mail, ?cal=,
// ?tab=) and the hash go along.
const APP_PATHS = [
    '/calendar', '/stats', '/history', '/profile', '/settings', '/social', '/inbox', '/feedback',
    '/together', '/family', '/admin', '/fun', '/beta', '/verify-email', '/u',
];

export const isAppPath = (pathname) =>
    APP_PATHS.some(path => pathname === path || pathname === `${path}/` || pathname.startsWith(`${path}/`));

export function forwardOldAppAddress() {
    const page = document.querySelector('[data-app]');
    const { pathname, search, hash } = window.location;
    if (!page || !isAppPath(pathname)) return;
    document.querySelectorAll('[data-forward-hide]').forEach(el => { el.hidden = true; });
    document.querySelectorAll('[data-forward-show]').forEach(el => { el.hidden = false; });
    window.location.replace(page.dataset.app + pathname.replace(/\/$/, '') + search + hash);
}
