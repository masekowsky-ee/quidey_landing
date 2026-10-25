// The live parts of the page. Without JS it still reads and works: the bar stays dark, every
// section shows at once, the pieces of the app stand still and the email line opens sign-up.

// the app's colour themes (dark mode values): [accent, text on the accent]
const ACCENTS = {
    sunset: ['#fb923c', '#2a1305'],
    green: ['#4ade80', '#052e16'],
    ocean: ['#38bdf8', '#082f49'],
    rose: ['#fb7185', '#2b0a12'],
    gold: ['#facc15', '#2a2100'],
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// the bar takes the colours of the chapter under it
function followTone(page) {
    const bar = page.querySelector('[data-bar]');
    if (!bar || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) if (entry.isIntersecting) bar.dataset.tone = entry.target.dataset.tone;
    }, { rootMargin: '0px 0px -94% 0px' });
    page.querySelectorAll('[data-tone]').forEach(section => observer.observe(section));
}

// parts of a section come in one after another as it scrolls into view: heading, text, picture
function reveal(page) {
    if (reducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const parts = [...page.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('shown');
            observer.unobserve(entry.target);
        }
    }, { rootMargin: '0px 0px -12% 0px' });
    // only what is below the screen waits; what is already in view stays as it is
    for (const part of parts) {
        if (part.getBoundingClientRect().top < window.innerHeight) continue;
        part.classList.add('waiting');
        observer.observe(part);
    }
}

// the pieces of the app count down a 25-minute session, looping
function countdowns(page) {
    for (const ui of page.querySelectorAll('[data-countdown]')) {
        let seconds = Number(ui.dataset.countdown);
        const text = ui.querySelector('[data-clock]');
        const ring = ui.querySelector('[data-ring]');
        const length = ring ? Number(ring.getAttribute('stroke-dasharray')) : 0;
        setInterval(() => {
            seconds = seconds <= 0 ? 25 * 60 : seconds - 1;
            if (ui.dataset.kind === 'focus') {
                text.textContent = clock(25 * 60 - seconds);
                ring.setAttribute('stroke-dashoffset', String(length * seconds / (25 * 60)));
            } else {
                text.textContent = clock(25 * 60 - seconds + 31 * 60);
            }
        }, 1000);
    }
}

// the week starts today (the page was drawn on the day it was built)
function weekFromToday(page) {
    const grid = page.querySelector('[data-week]');
    if (!grid) return;
    const names = JSON.parse(grid.dataset.week);
    const today = new Date();
    grid.querySelectorAll('li').forEach((li, i) => {
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        li.querySelector('[data-day-name]').textContent = names[day.getDay()];
        li.querySelector('[data-day-num]').textContent = String(day.getDate());
    });
}

// the streak ends today: the last seven days, names from Monday
function streakToToday(page) {
    const row = page.querySelector('[data-streak]');
    if (!row) return;
    const names = JSON.parse(row.dataset.streak);
    const today = new Date();
    row.querySelectorAll('li').forEach((li, i) => {
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6 + i);
        li.querySelector('[data-day-name]').textContent = names[(day.getDay() + 6) % 7];
    });
}

// the colour picked in the last feature recolours every piece of the app on the page
function accentPicker(page) {
    const swatches = [...page.querySelectorAll('[data-accent]')];
    for (const swatch of swatches) {
        swatch.addEventListener('click', () => {
            const [accent, ink] = ACCENTS[swatch.dataset.accent];
            page.style.setProperty('--ui-accent', accent);
            page.style.setProperty('--ui-accent-ink', ink);
            for (const other of swatches) {
                const on = other === swatch;
                other.classList.toggle('swatchOn', on);
                other.setAttribute('aria-pressed', String(on));
            }
        });
    }
}

// the email line: on to sign-up in the app, the address in the #hash (it never reaches a server)
function emailLine(page) {
    const form = page.querySelector('[data-signup]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('[data-email]').value.trim();
        window.location.href = form.action + (email ? `#email=${encodeURIComponent(email)}` : '');
    });
}

export function startLanding() {
    const page = document.querySelector('[data-page]');
    if (!page) return;
    followTone(page);
    reveal(page);
    countdowns(page);
    weekFromToday(page);
    streakToToday(page);
    accentPicker(page);
    emailLine(page);
}
