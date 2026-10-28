// The filter above the help pages: hides the questions (and groups) that don't contain all the
// words typed. Only on this page, nothing is sent anywhere.
export function startHelpSearch() {
    const input = document.querySelector('[data-help-search]');
    if (!input) return;
    const items = [...document.querySelectorAll('[data-help-item]')];
    const groups = [...document.querySelectorAll('[data-help-group]')];
    const empty = document.querySelector('[data-help-empty]');
    input.addEventListener('input', () => {
        const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
        for (const item of items) item.hidden = !words.every(word => item.dataset.text.includes(word));
        for (const group of groups) group.hidden = !group.querySelector('[data-help-item]:not([hidden])');
        if (empty) empty.hidden = items.some(item => !item.hidden);
    });
}
