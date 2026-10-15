/* ============================================================
   contact-form.js — validates the contact form, then hands the
   message to the visitor's mail client via a mailto: link.
   There is no backend; swap this for Formspree/EmailJS if real
   submissions are ever needed.
   ============================================================ */
(function () {
  "use strict";

  var FALLBACK_EMAIL = "arifaldi.putra@binus.ac.id";
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form) return;

  /* `form.name` resolves to the form's own name attribute, so fields are
     always read through form.elements instead. */
  function field(id) {
    return form.elements.namedItem(id);
  }

  /* single source of truth: the mailto link in the contact section */
  function recipient() {
    var link = document.querySelector('a[href^="mailto:"]');
    if (!link) return FALLBACK_EMAIL;
    return link.getAttribute("href").replace("mailto:", "").split("?")[0];
  }

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status" + (state ? " " + state : "");
  }

  function validate(values) {
    var checks = [
      [field("name"), values.name !== ""],
      [field("email"), EMAIL_PATTERN.test(values.email)],
      [field("message"), values.message !== ""]
    ];

    return checks.reduce(function (invalid, pair) {
      var input = pair[0];
      var isValid = pair[1];
      input.classList.toggle("has-error", !isValid);
      if (!isValid) invalid.push(input);
      return invalid;
    }, []);
  }

  function buildMailto(values) {
    var subject = "Portfolio contact from " + values.name;
    var body =
      values.message + "\n\n—\nName: " + values.name + "\nEmail: " + values.email;

    return (
      "mailto:" +
      recipient() +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var values = {
      name: field("name").value.trim(),
      email: field("email").value.trim(),
      message: field("message").value.trim()
    };

    var invalid = validate(values);

    if (invalid.length) {
      setStatus(
        "Please fill in your name, a valid email and a message first.",
        "is-error"
      );
      invalid[0].focus();
      return;
    }

    window.location.href = buildMailto(values);

    setStatus(
      "Opening your email app… if nothing happens, email me directly at " +
        recipient() +
        ".",
      "is-ok"
    );
  });

  /* clear the error outline as soon as the visitor starts fixing a field */
  ["name", "email", "message"].forEach(function (id) {
    field(id).addEventListener("input", function () {
      this.classList.remove("has-error");
    });
  });
})();
