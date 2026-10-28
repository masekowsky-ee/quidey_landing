// The landing page in the visitor's language: German on a German device, English on every other.
// Runs in <head> before the page is drawn (a file, the CSP allows no inline scripts), only on the
// two language versions (/ and /en/), not on Hilfe and Updates (German only).
//
// - A language picked by hand on this site (the switch in the bar or footer) wins: it is kept in
//   localStorage 'quidey-lang' and nothing is switched any more. That is all the page ever stores.
// - Search engines are never sent elsewhere: each version is found and shown as it is
//   (hreflang tells them which is which).
(function () {
    var KEY = 'quidey-lang';
    var page = document.documentElement.lang === 'en' ? 'en' : 'de';
    try {
        if (/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i.test(navigator.userAgent)) return;
        var picked = localStorage.getItem(KEY);
        if (picked !== 'de' && picked !== 'en') {
            var tag = String((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
            var want = tag.indexOf('de') === 0 ? 'de' : 'en';
            if (want !== page) {
                window.location.replace((want === 'de' ? '/' : '/en/') + window.location.search + window.location.hash);
                return;
            }
        }
    } catch (e) {
        // storage blocked: the page stays as it was opened
    }
    // a click on the language switch is a choice: remembered, and followed from now on
    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[data-lang-pick]');
        if (!link) return;
        try { localStorage.setItem(KEY, link.getAttribute('data-lang-pick')); } catch (e) { /* only this visit */ }
    });
})();
