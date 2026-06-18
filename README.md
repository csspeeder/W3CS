# W3CS

Personal website and engineering portfolio for **WECS** — *Wannabe Engineer Colin Seppi*.

## Current structure

```text
W3CS/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── .gitkeep
├── .gitignore
└── README.md
```

## Content

The site currently contains:

- a dark WECS landing page
- a gold crown / WECS hero section
- a particle background
- the slogan **STRIVE BEYOND AVERAGE**
- a first project card for the Hexapod prototype
- a small About section

## Local preview

Open `index.html` directly in a browser.

For cleaner testing, use a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment idea

This project is static, so it can be deployed with:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

For `w3cs.ch`, the clean route is GitHub repository + static host + custom domain DNS setup.
