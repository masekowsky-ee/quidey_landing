// The word in the headline: a focus session, fast-forwarded. The timer runs from 25:00 to 0,
// its progress ring is the ring of the Q, and when the time is up the check draws in as the Q's
// tail: the Quidey logo. Then it starts again. (Was a Remotion composition in the app; the same
// frames, now drawn into one SVG.)
// frameState() is used twice: at build time for the still picture (no JS, or paused) and in
// the browser for every frame.
export const LOOP_FPS = 30;
export const LOOP_FRAMES = 240;
export const STILL_FRAME = 200;

const RUN_END = 150;      // the timer reaches 0
const CHECK_END = 172;    // the check is drawn
const FADE_START = 222;   // fades back to the start

export const RING_LENGTH = 2 * Math.PI * 12;
// length of the check path M27 32 l9 12 L54 24 (15 + ~26.9), rounded up
export const CHECK_LENGTH = 42;

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const progressBetween = (frame, from, to) => clamp01((frame - from) / (to - from));
const inOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const outCubic = (t) => 1 - (1 - t) ** 3;

// a damped spring from 0 to 1 (damping 9, stiffness 180, mass 1), t in seconds
function spring(t) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(180);
    const zeta = 9 / (2 * w0);
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
}

export function frameState(frame) {
    const ring = inOutQuad(progressBetween(frame, 6, RUN_END));
    const check = outCubic(progressBetween(frame, RUN_END, CHECK_END));
    const finished = frame >= RUN_END;
    const pop = finished ? spring((frame - RUN_END) / LOOP_FPS) : 0;
    const seconds = Math.round((1 - ring) * 25 * 60);
    return {
        ring,
        check,
        finished,
        scale: finished ? 0.94 + pop * 0.06 : 0.94,
        opacity: 1 - progressBetween(frame, FADE_START, LOOP_FRAMES),
        time: `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`,
    };
}

// the logo box sits at (18, 13), 84 wide, in the 300 × 110 picture: it pops around its middle
export const popTransform = (scale) => `translate(60 55) scale(${scale.toFixed(4)}) translate(-60 -55)`;

// In the browser: plays the loop in the [data-focus-loop] picture, the button stops and starts it
// (an endless animation must be stoppable, WCAG 2.2.2). Starts stopped when the system asks for
// less motion.
export function startFocusLoop(root = document) {
    const svg = root.querySelector('[data-focus-loop]');
    const button = root.querySelector('[data-loop-toggle]');
    if (!svg || !button) return;
    const parts = {
        content: svg.querySelector('[data-part="content"]'),
        pop: svg.querySelector('[data-part="pop"]'),
        track: svg.querySelector('[data-part="track"]'),
        ring: svg.querySelector('[data-part="ring"]'),
        check: svg.querySelector('[data-part="check"]'),
        text: svg.querySelector('[data-part="text"]'),
    };
    const doneLabel = svg.dataset.done;

    const draw = (frame) => {
        const s = frameState(frame);
        parts.content.setAttribute('opacity', s.opacity.toFixed(3));
        parts.pop.setAttribute('transform', popTransform(s.scale));
        parts.track.setAttribute('opacity', (1 - s.check).toFixed(3));
        parts.ring.setAttribute('stroke-dashoffset', (RING_LENGTH * (1 - s.ring)).toFixed(3));
        parts.ring.setAttribute('stroke-linecap', s.ring < 1 ? 'round' : 'butt');
        parts.check.setAttribute('stroke-dashoffset', (CHECK_LENGTH * (1 - s.check)).toFixed(3));
        parts.check.setAttribute('opacity', s.check > 0 ? '1' : '0');
        parts.text.textContent = s.finished ? doneLabel : s.time;
        parts.text.classList.toggle('loopDone', s.finished);
    };

    let raf = 0;
    let startedAt = 0;
    let lastFrame = -1;
    const tick = (now) => {
        if (!startedAt) startedAt = now;
        const frame = Math.floor(((now - startedAt) / 1000) * LOOP_FPS) % LOOP_FRAMES;
        if (frame !== lastFrame) draw(lastFrame = frame);
        raf = requestAnimationFrame(tick);
    };
    const play = () => { startedAt = 0; lastFrame = -1; raf = requestAnimationFrame(tick); setPlaying(true); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; draw(STILL_FRAME); setPlaying(false); };
    const setPlaying = (playing) => {
        button.setAttribute('aria-pressed', String(!playing));
        button.textContent = playing ? button.dataset.pause : button.dataset.play;
    };

    button.hidden = false;
    button.addEventListener('click', () => (raf ? stop() : play()));
    // no point drawing frames nobody sees
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && raf) { cancelAnimationFrame(raf); raf = -1; }
        else if (!document.hidden && raf === -1) play();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) stop();
    else play();
}
