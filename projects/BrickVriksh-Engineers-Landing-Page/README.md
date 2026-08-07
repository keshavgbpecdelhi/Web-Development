# BrickVriksh Engineers — Landing Page

A responsive marketing landing page for **BrickVriksh Engineers**, a full-house and
turnkey construction company based in Donali Chowk, Dehradun, founded by
Prashant Jamloki.

The page is built from the brand's marketing brief (see
[`MARKETING_COPY.md`](./MARKETING_COPY.md) in this folder) — positioning
BrickVriksh as the one trusted partner for design, structural consultancy,
construction and interiors, instead of homeowners juggling multiple
contractors.

## Sections

- **Hero** — core message: "One team. One vision. One home."
- **Problem** — speaks to the pain point of coordinating multiple contractors
- **Services** — full-house construction, turnkey construction, structural
  design & consultancy, architectural design, interior design
- **Why Us** — end-to-end expertise, local trust, accountability, turnkey solution
- **Process** — the four-step journey from consultation to handover
- **Founder** — trust-building section featuring Prashant Jamloki
- **Projects** — placeholder gallery for the 20+ completed projects
- **Contact** — lead form + WhatsApp CTA

## Tech

Plain HTML, CSS and vanilla JavaScript — no build step required.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Structure

```
BrickVriksh-Engineers-Landing-Page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Notes

- The contact form currently only shows a confirmation message on submit
  (`js/script.js`) — wire it up to a real backend or form service (e.g. Formspree)
  before deploying.
- Project photos are placeholders — replace `.project-thumb` blocks in
  `index.html` with real before/after images once available.
