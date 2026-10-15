# Portfolio — Arifaldi Eka Putra

Personal portfolio website for **Arifaldi Eka Putra**, Information Systems student at BINUS University.
Built from the original design mockup as a zero-build static site (plain HTML, CSS, vanilla JS) so it can
be hosted on GitHub Pages without any toolchain.

## Structure

```
.
├── index.html                      # single-page site (nav, hero, about, experience, projects, contact)
├── assets
│   ├── css/styles.css              # design tokens + all styling (responsive)
│   ├── js/main.js                  # mobile nav, active link, scroll reveal, contact form
│   └── img
│       ├── profile.jpg             # hero portrait
│       ├── volunteer-canva.jpg     # Volunteer Educator Canva
│       ├── volunteer-socialization.jpg  # Project Member and Socializations
│       ├── project-titu.jpg        # TITU app mockup
│       └── favicon.svg
└── README.md
```

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
- Fonts: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (labels and tags).
- The *Parking Booking Binus* card uses a CSS-drawn cover because the design file had no screenshot for it.
  To use a real image, drop it in `assets/img/project-parking.jpg` and replace the
  `.project-media-art` block in `index.html` with an `<img>` tag like the TITU card.
