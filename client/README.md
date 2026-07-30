# DocMorph AI — Frontend

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build progress (Step 1 of N)

Done:
- Project scaffold (Vite + React 19 + TS + Tailwind + shadcn-style primitives)
- Design system (tailwind.config.js): morph-gradient palette, Space Grotesk / Inter / JetBrains Mono type stack
- Dark mode (ThemeProvider + ThemeToggle, persisted to localStorage)
- Navbar (responsive, glass-on-scroll, mobile menu)
- Footer
- Button, Card primitives
- Landing page Hero (drag-and-drop zone wired to react-dropzone, animated morph visual)

Next up:
- Landing page: feature cards, stats, testimonials, FAQ accordion, and remaining footer wiring
- Then: Dashboard, Convert, Compress, OCR pages
- Then: PDF tools (Merge/Split/Rotate/Watermark/etc.), AI Tools
- Then: Pricing, About, Contact, Login, Register, Settings, Profile, 404
