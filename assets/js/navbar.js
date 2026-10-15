/* ============================================================
   navbar.js — sticky navbar behaviour
   · drop shadow once the page is scrolled
   · mobile menu toggle
   · highlights the link of the section currently in view
   ============================================================ */
(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  /* ---------- shadow on scroll ---------- */
  function updateShadow() {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  /* ---------- mobile menu ---------- */
  function setupMobileMenu() {
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close the menu after tapping one of the links
    links.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- active section highlighting ---------- */
  var anchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a")
  );

  var sections = anchors
    .map(function (anchor) {
      return document.querySelector(anchor.getAttribute("href"));
    })
    .filter(Boolean);

  function updateActiveLink() {
    var scrollMark = window.scrollY + window.innerHeight * 0.3;
    var currentId = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollMark) currentId = section.id;
    });

    anchors.forEach(function (anchor) {
      anchor.classList.toggle(
        "is-active",
        anchor.getAttribute("href") === "#" + currentId
      );
    });
  }

  /* ---------- init ---------- */
  setupMobileMenu();
  updateShadow();
  updateActiveLink();

  window.addEventListener(
    "scroll",
    function () {
      updateShadow();
      updateActiveLink();
    },
    { passive: true }
  );
})();
