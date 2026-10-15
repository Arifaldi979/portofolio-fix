# Portfolio — Arifaldi Eka Putra

Personal portfolio website for **Arifaldi Eka Putra**, Information Systems student at BINUS University.
Built from the original design mockup as a zero-build static site (plain HTML, CSS, vanilla JS) so it can
be hosted on GitHub Pages without any toolchain.

## Structure

```
.
├── index.html             # markup only — nav, hero, about, experience, projects, contact
├── assets
│   ├── css
│   │   ├── base.css        # design tokens, reset, global typography, a11y helpers
│   │   ├── layout.css      # container, sections, navbar, footer
│   │   ├── components.css  # reusable primitives: buttons, cards, pills, badges, form fields
│   │   ├── sections.css    # composition of each section (hero, about, experience, …)
│   │   └── responsive.css  # every media query, loaded last
│   ├── js
│   │   ├── navbar.js       # scroll shadow, mobile menu, active-link highlighting
│   │   ├── reveal.js       # fade-in on scroll (IntersectionObserver)
│   │   └── contact-form.js # validation + mailto handoff
│   └── img
│       ├── profile.jpg                  # hero portrait
│       ├── volunteer-canva.jpg          # Volunteer Educator Canva
│       ├── volunteer-socialization.jpg  # Project Member and Socializations
│       ├── project-titu.jpg             # TITU app mockup
│       ├── project-parking.jpg          # Parking Booking Binus app mockup
│       └── favicon.svg
└── README.md
```

**Why it is split this way**

- **CSS** — one file per responsibility instead of one long stylesheet. They are linked in cascade
  order (tokens → scaffolding → primitives → sections → overrides), so `responsive.css` always wins.
  Change a colour once in `base.css` and it updates everywhere.
- **JS** — one file per behaviour, each a self-contained IIFE loaded with `defer`. Plain scripts
  (not ES modules) on purpose, so the page still works when opened straight from the filesystem.
- **HTML** — intentionally one file. Splitting it would need either a build step or JS templating,
  which would cost SEO and break the page without JavaScript. Sections are marked with comment
  banners (`<!-- ===== PROJECTS ===== -->`) so they are easy to find.

All photos were extracted from the design file and optimised (resized + progressive JPEG).

## Running locally

No dependencies — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch `main` / root `/`.
The site will be live at `https://arifaldi979.github.io/portofolio-fix/`.

## Links used on the page

| Where | Target |
| --- | --- |
| GitHub (hero + contact) | https://github.com/Arifaldi979 |
| LinkedIn (hero + contact) | https://www.linkedin.com/in/arifaldiputra/ |
| TITU → Live Demo | Figma interactive prototype |
| Parking Booking Binus → Live Demo | Figma interactive prototype |
| Email | arifaldi.putra@binus.ac.id |

The contact form has no backend: it validates the inputs and opens the visitor's mail client with the
message pre-filled (`mailto:`). Swap in Formspree/EmailJS later if you want real submissions.

## Design notes

- Colors: primary `#003dca`, alternating `#ffffff` / `#f8f9ff` sections, text `#0f162a`, muted `#465469`.
  All of them live as CSS custom properties in `assets/css/base.css`.
- Fonts: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (labels and tags).
- Both project covers are exported from the same region of the design mockup (578 × 246 pt) and the
  card media area uses that exact `aspect-ratio`, so the artwork is never cropped at any screen width.
