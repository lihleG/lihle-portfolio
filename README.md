# Lihle Guma — Portfolio

Immersive 3D portfolio for Lihle Guma, Full-Stack Developer (Johannesburg, South Africa).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · GSAP (ScrollTrigger) · Three.js + React Three Fiber · Lucide + React Icons

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see "Contact form"
npm run dev                  # http://localhost:3000
npm run typecheck            # tsc --noEmit
npm run build && npm start   # production
```

`npm run build` first prints a **checklist** of anything still to fill in (empty links, missing CV, etc.).

## What to edit (nothing else needs touching)

| I want to change…                                   | Edit                       |
| --------------------------------------------------- | -------------------------- |
| Email, LinkedIn, GitHub, CV path, nav, intro copy   | `src/config/site.ts`       |
| Project text, tech stack, features, challenges, repo + live URLs | `src/data/projects.ts` |
| Employment history (company, role, dates, responsibilities, achievements) | `src/data/experience.ts` |
| Skills (names, icons, categories)                   | `src/data/skills.ts`       |
| CV                                                  | drop `public/cv/Lihle-Guma-CV.pdf` |
| Project screenshots                                 | drop files in `public/projects/` (`stayeasy.png`, `nexus-gadgets.png`, `finflow.png`) |

### Honest by design
- **No fake links.** Any empty URL renders a clearly disabled "coming soon" control. Fill it in and it becomes a real link.
- **Nothing invented.** Tech stack, challenges, and employment are empty until you add them; the pages show a tidy "being documented" note instead of made-up content. Only features you described (Nexus Gadgets, FinFlow) are filled in.
- The one-line `problem` for each project is a neutral paraphrase of your description — rewrite it in your own words.
- Skills show no ratings, percentages or years.

## Contact form

Validated on the client **and** the server (`src/lib/validation.ts`). Delivery uses [Resend](https://resend.com):
set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see `.env.example`). Without them the form tells the visitor it
isn't switched on yet and points them to your email address — it never pretends a message was sent.
Includes a honeypot field and a simple per-IP rate limit.

## Structure

```
src/
  app/                 routes: /, /projects/[slug], /api/contact, sitemap, robots, OG image, icon
  components/
    layout/            Navbar, Preloader, CustomCursor, ScrollProgress, Footer
    sections/          Hero, About, ProcessFlow, Skills, Projects, Experience, Contact
    projects/          ProjectCard, ProjectPreview, ProjectDetail, ProjectLinks
    contact/           ContactForm
    three/             HeroScene (R3F) + loader, error boundary, CSS fallback — isolated & lazy-loaded
    ui/                MagneticButton, AnimatedHeading, Reveal, SpotlightCard, …
  config/ data/ hooks/ lib/
```

## Performance, accessibility, motion

- The whole three.js bundle is loaded with `next/dynamic` (`ssr: false`), pauses rendering when off-screen or the tab is hidden, lowers DPR/particle count on small screens, and falls back to a CSS visual if WebGL is unavailable or errors.
- `prefers-reduced-motion`: preloader skipped, 3D idles, reveals/parallax/magnetic/cursor effects disabled.
- Skip link, landmarks, `aria-current` nav state, focus-visible rings, labelled form fields with `aria-invalid` / live-region status, keyboard-closable mobile menu.
- Custom cursor is desktop-only (fine pointer) and keeps the native cursor visible.
- Images go through `next/image`; SEO via metadata API, Open Graph image, JSON-LD, sitemap and robots.
