# BrickVriksh Engineers — Website

A responsive multi-page marketing website for **BrickVriksh Engineers**, a
full-house and turnkey construction company based in Donali Chowk,
Dehradun, founded by Prashant Jamloki.

The site is built from the brand's marketing brief (see
[`MARKETING_COPY.md`](./MARKETING_COPY.md) in this folder) — positioning
BrickVriksh as the one trusted partner for design, structural consultancy,
construction and interiors, instead of homeowners juggling multiple
contractors.

## Pages

- **`index.html`** — Home: hero ("One team. One vision. One home."), the
  contractor-juggling pain point, a services teaser, why-us summary,
  founder teaser and a projects teaser
- **`services.html`** — Full detail on each service: full-house
  construction, turnkey construction, structural design & consultancy,
  architectural design, interior design
- **`about.html`** — Founder story (Prashant Jamloki), full why-us value
  props, and the four-step process from consultation to handover
- **`projects.html`** — Full gallery placeholder for the 20+ completed
  projects
- **`contact.html`** — Lead form (with a service picker), contact details
  and a WhatsApp CTA

Every page shares the same header/footer and highlights the current page
in the nav.

## Tech

Plain HTML, CSS and vanilla JavaScript — no build step, no framework.

## Running locally

Open `index.html` directly in a browser, or serve the folder so relative
links between pages work as expected:

```bash
npx serve .
```

## Structure

```
BrickVriksh-Engineers-Landing-Page/
├── index.html
├── services.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── MARKETING_COPY.md
└── README.md
```

## Notes

- The contact form (`contact.html`) currently only shows a confirmation
  message on submit (`js/script.js`) — wire it up to a real backend or
  form service (e.g. Formspree) before deploying.
- The WhatsApp button links to `#` — replace with a `https://wa.me/<number>`
  link once a business number is available.
- Project photos are placeholders — replace `.project-thumb` blocks in
  `index.html` and `projects.html` with real before/after images once
  available.
