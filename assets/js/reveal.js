/* ============================================================
   reveal.js — fades elements in as they scroll into view
   Adds .is-visible to every .reveal element (see components.css).
   Falls back to showing everything when IntersectionObserver
   is unavailable, so content is never stuck invisible.
   ============================================================ */
(function () {
  "use strict";

  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  function showAll() {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  Array.prototype.forEach.call(items, function (el) {
    observer.observe(el);
  });
})();
