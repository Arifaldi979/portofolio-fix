/* ============================================================
   Arifaldi Eka Putra — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var EMAIL = "arifaldi.putra@binus.ac.id";

  /* ---------- navbar shadow on scroll ---------- */
  var navbar = document.getElementById("navbar");

  function onScroll() {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- active nav link while scrolling ---------- */
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a")
  );
  var sections = navAnchors
    .map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);

  function setActive() {
    var pos = window.scrollY + window.innerHeight * 0.3;
    var current = null;

    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });

    navAnchors.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- scroll reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- contact form -> opens the default mail client ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  // `form.name` resolves to the form's name attribute, so always go
  // through form.elements to reach the actual fields.
  function field(id) {
    return form.elements.namedItem(id);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = field("name").value.trim();
      var email = field("email").value.trim();
      var message = field("message").value.trim();
      var invalid = [];

      [
        [field("name"), name !== ""],
        [field("email"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)],
        [field("message"), message !== ""]
      ].forEach(function (pair) {
        var ok = pair[1];
        pair[0].classList.toggle("has-error", !ok);
        if (!ok) invalid.push(pair[0]);
      });

      if (invalid.length) {
        status.textContent =
          "Please fill in your name, a valid email and a message first.";
        status.className = "form-status is-error";
        invalid[0].focus();
        return;
      }

      var subject = "Portfolio contact from " + name;
      var body =
        message + "\n\n—\nName: " + name + "\nEmail: " + email;

      window.location.href =
        "mailto:" +
        EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      status.textContent =
        "Opening your email app… if nothing happens, email me directly at " +
        EMAIL +
        ".";
      status.className = "form-status is-ok";
    });

    ["name", "email", "message"].forEach(function (id) {
      field(id).addEventListener("input", function () {
        this.classList.remove("has-error");
      });
    });
  }
})();
