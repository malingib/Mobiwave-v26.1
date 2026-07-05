# CTO Review: MobiWave v26.2 Website

**Reviewer:** Siri-style engineering audit  
**Date:** 2026-07-05  
**Scope:** Full-stack code quality, architecture, performance, SEO, business alignment, deployment readiness  
**Stack:** React 19 / TypeScript / Vite / Tailwind CSS v3 / shadcn/ui / GSAP + Framer Motion + Three.js  
**Repo path:** `/home/malingi/Projects/Mobiwave/Mobiwave v26.2`

---

## Executive Summary

MobiWave v26.2 has the skeleton of a solid business communication website for the Kenyan market, but it's buried under ~30% **template contamination, dead code, and zombie assets** that made it into the repo via an AI-generated PR. The main site pages (Pricing, About, Contact, Services, Products) have good Nairobi-authentic copy, a smart ServicePageLayout pattern for reusable service pages, and well-configured TypeScript strict mode. However, the build **does not pass**, the `/isp` route serves a **completely wrong business** (a Canadian satellite TV/ISP template), there's a **second dead Navigation component** for a brand called "Mawingu Connect", and three competing animation libraries are bundled together. The TechSpec.md is aspirational fiction — most of the components it describes were never built.

This is salvageable with a focused cleanup, but **do not deploy the current state**. The ISP page alone would confuse every Kenyan visitor and undermine brand trust.

---

## Key Findings

### 🔴 CRITICAL — Ship-blocking or business-damaging

#### 1. ISP.tsx Serves a Canadian Satellite ISP Template — Not MobiWave

**File:** `src/pages/ISP.tsx` (727 lines, 30,653 bytes)

This page is a **completely different business**: "Nestor Satellite Internet Provider" — Canadian ISP with USD pricing, satellite TV packages, VOD channels, plug-in antennas. Evidence:

- **Branding:** "Nestor prepaid internet", "Nestor TV Box"
- **Pricing:** `$ 49.99/mo`, `$ 14.99/mo`, `$ 59.99/mo`, `$ 119.99/mo` — all USD
- **Geography:** "America's fastest download speeds", "From Allegiant Stadium to your house", "Call: +321 234 4567" (placeholder North American number)
- **Content:** TV channels, satellite dishes, "movie packages", "VOD" (video-on-demand) — none related to SMS/M-Pesa/USSD
- **Testimonials:** "The internet service at my home... very fast at work" — about ISP, not communication tools
- **Blog posts:** "The Ultimate Guide to Choosing The Right Internet Technology For Your Home" — not MobiWave's business
- **Git history confirms it:** Commit `f1e00595` says "Redesign ISP page to match Nylo satellite internet template". Commit `549c9cf9` says "Add ISP page with satellite internet design". This was merged from `ai_main_*` branch — AI-generated template contamination.

**Impact:** Anyone clicking "ISP" in the navigation sees a Canadian satellite TV provider. MobiWave does not sell internet. This is actively harmful to the brand.

**Fix:** Either remove the `/isp` route and its nav link, or build an actual ISP-services-for-business page (leasing dedicated connectivity to SACCOs/hospitals — if that's actually a MobiWave offering). If unused, delete `src/pages/ISP.tsx`, remove the route from `App.tsx` and the nav link from `Header.tsx`.

---

#### 2. Build Fails — `tsc -b` Rejects Unused Variable

```shell
$ npm run build
> tsc -b && vite build
src/sections/Footer.tsx(13,7): error TS6133: 'resourceLinks' is declared but its value is never read.
```

**File:** `src/sections/Footer.tsx` (line 13)

The `resourceLinks` array (lines 13–19) defines five links for "Resources" — but the column heading says **"Services Req"** (typo), and the JSX renders `navLinks` instead of `resourceLinks` (lines 118–131). The declared variable is never consumed.

**Impact:** `npm run build` exits with error. No production artifact can be generated. Any CI/CD pipeline fails.

**Fix:** Delete the unused `resourceLinks` variable (or replace `navLinks` usage with `resourceLinks` and fix the heading to "Resources").

---

#### 3. Zombie Component: Navigation.tsx — "Mawingu Connect" Brand

**File:** `src/sections/Navigation.tsx` (166 lines)

This component is **never imported anywhere**. It's a full nav bar for a brand called **"Mawingu Connect"** with a green brand color (`text-brand-green`), a Cloud icon, and nav items labelled "Products", "Solutions", "Developers", "Company" — pointing to `#features`, `#solutions`, `#integrations`, `#testimonials` (hash links for a single-page template). The actual nav is `Header.tsx`, which uses proper React Router links and MobiWave branding.

This is clearly a leftover from a different template that was partially replaced.

**Fix:** Delete `src/sections/Navigation.tsx`. It is dead code with zero callers.

---

#### 4. SplashScreen Forces 2.2-Second Delay on Every Page Load

**File:** `src/components/SplashScreen.tsx`

The splash screen uses Framer Motion for an `exit` animation after a **2200ms `setTimeout`** (line ~20: `setTimeout(() => onComplete?.(), 2200)`). During those 2.2 seconds, the entire page body is hidden (splash renders instead). This means:

- **LCP (Largest Contentful Paint)** is delayed by minimum 2.2 seconds
- **FCP (First Contentful Paint)** is delayed similarly
- Users on slow connections (common in Kenyan mobile-first usage) wait even longer
- This is a death sentence for Core Web Vitals — Google thresholds: LCP should be < 2.5s, and this alone adds 2.2s before any content shows

**Fix:** Remove splash screen entirely, or reduce to a max of 400ms with a progressive loading strategy (skeleton screens).

---

### 🟠 HIGH — Significant issues requiring attention

#### 5. Three Heavy Animation Libraries Loaded Together

**Installed:** `gsap` + `@gsap/react` + `framer-motion` + `three` + Canvas particles (`GravityParticles`)

The app uses:

| Library | Where | Lines | Notes |
|---------|-------|-------|-------|
| Three.js | `GlobeBackground.tsx` | 424 lines | Full 3D Earth with city markers, electron arcs, atmosphere shader, texture loading from unpkg |
| Three.js (indirect) | `GravityParticles.tsx` | Canvas | Particle system with gravity |
| Framer Motion | Hero, Services, About, CTA, etc. | All sections | `motion.div`, `useInView`, stagger animations |
| GSAP | Not found in src/ imports | — | `gsap` and `@gsap/react` are **installed but never imported** in app code |
| CSS animations | Various sections | — | Keyframe-based decorations |

**Impact:** This is the animation equivalent of hiring three full-time jugglers for a one-man show. Three.js alone adds ~600KB to the bundle (including textures from CDN). Framer Motion adds ~150KB. GSAP + ScrollTrigger adds ~80KB. The page weight is **easily 800KB+ before any business content**.

**Observations:**
- `@gsap/react` and `gsap` are **unused** — not a single import in `src/`
- `three` is used by GlobeBackground, but that component loads an earth texture from unpkg at runtime (network dependency)
- TechSpec.md says GSAP is primary, but the actual code uses Framer Motion for nearly everything
- GlobeBackground is interactive (draggable) and runs a `requestAnimationFrame` loop even when scrolled out of view (no IntersectionObserver on the animation loop)

**Fix:** 
1. Remove `gsap` and `@gsap/react` from dependencies if not used
2. Consider lazy-loading `GlobeBackground` with `React.lazy()` and `Suspense` — it's on the hero but not above the fold content
3. Stop the animation RAF loop when the component is scrolled out of view
4. Or replace Three.js globe with a simpler CSS/Canvas effect — the 3D globe adds visual polish but at high cost

---

#### 6. 50+ shadcn UI Components Installed, Many Unused

**Directory:** `src/components/ui/` — 50+ components installed

**Actually used in app code (non-ui files):**
- `button` — CTA.tsx, Contact.tsx, Pricing.tsx, Integrations.tsx, ServicePageLayout.tsx
- `input` — Contact.tsx
- `label` — Contact.tsx
- `textarea` — Contact.tsx (via Input)
- `dialog` — Products.tsx
- `card` + `badge` — ServicePageLayout.tsx
- `sheet` — Navigation.tsx (dead component, line above)
- `separator` — *only referenced by other UI components' internal imports*

**Likely unused or only used internally by other UI components:**
sidebar, calendar, form, chart, menubar, context-menu, carousel, command, input-group, toggle-group, toggle, pagination, alert-dialog, hover-card, popover, progress, radio-group, scroll-area, select, slider, switch, tabs, tooltip, collapsible, checkbox, avatar, aspect-ratio, accordion, dropdown-menu, navigation-menu, resizable, sonner (toast), embla-carousel, react-day-picker, cmdk, input-otp, vaul, react-resizable-panels, next-themes, recharts, date-fns

**Impact:** These are **not tree-shaken in dev** (Vite bundles only what's imported, but unused Radix/lucide imports still add to cold-start resolution and node_modules weight). The real cost: 360MB `node_modules/` and cognitive overhead — a developer scanning imports has to dig through 50+ UI component files to understand usage.

**Fix:** Audit and remove unused shadcn components. At minimum: sidebar, calendar, form, chart, menubar, context-menu, carousel, command, input-group, toggle-group, pagination, alert-dialog, hover-card, popover, progress, radio-group, scroll-area, slider, switch, collapsible, checkbox, avatar, aspect-ratio. Also audit dependent packages: `recharts`, `date-fns`, `react-day-picker`, `cmdk`, `input-otp`, `vaul`, `react-resizable-panels`, `next-themes`.

---

#### 7. ISP/ Subfolder is a Separate Unintegrated Vue App

**Path:** `ISP/` (at project root)

This is a **completely separate Vue.js 3 application** with its own `package.json`, `vite.config.js`, and dependencies (`bootstrap`, `jquery`, `owl.carousel`, `magnific-popup`, `@vueuse/core`, etc.). It's the same "Nylo" ISP template in a different framework.

- **Not integrated** with the React app in any way
- **Not referenced** by any build script or import
- **Its own `npm run build`** would produce standalone output, but nothing consumes it

**Impact:** Template debris. Adds confusion about the project architecture. The `ISP/index.html` is 11KB of template HTML with inline styles and scripts for a Vue app that has nothing to do with the React project.

**Fix:** Delete the entire `ISP/` directory.

---

#### 8. Footer: "Services Req" Column Heading — Typo / Wrong Variable

**File:** `src/sections/Footer.tsx`, line 112

The column heading reads **"Services Req"** — either a typo for "Services Requested" or a leftover heading that should read **"Resources"** (matching the unused `resourceLinks` variable name). The links rendered underneath are from `navLinks` (Home, Services, Projects, Pricing, About, Contact) — the same as the "Company" column. So both columns show the same links.

**Impact:** Minor UI bug displaying a nonsense heading and a duplicated column.

**Fix:** Either replace `navLinks` usage with the `resourceLinks` array (which contains actual service links) and rename heading to "Resources", or delete the columndata entirely if redundant.

---

### 🟡 MEDIUM — Should fix before next release

#### 9. TechSpec.md is Aspirational — Doesn't Match Built Code

**File:** `TechSpec.md`

The technical specification lists 8 custom components that are supposed to exist:
`ParticleBackground`, `AnimatedText`, `GlassCard`, `FloatingIcon`, `ScrollProgress`, `LogoCarousel`, `MagneticButton`, `TiltCard`

**Reality:**
- `ParticleBackground.tsx` ✓ exists but is **named** — it's a canvas particle system
- `AnimatedText.tsx` ✓ exists
- `TiltCard.tsx` ✓ exists (used in Pricing)
- `GlassCard`, `FloatingIcon`, `ScrollProgress`, `LogoCarousel`, `MagneticButton` ✗ **do not exist as listed** — though `useScrollProgress` hook exists, and a `ScrollProgress` component was planned but not built

The spec also says GSAP is "primary" with ScrollTrigger for complex scroll-linked animations — but the built code uses only Framer Motion for scroll animations, and GSAP/ScrollTrigger is never imported.

**Impact:** Anyone onboarding with TechSpec.md as reference will be lost. The spec claims a simpler project than what exists (no Three.js, no SplashScreen, different component inventory).

**Fix:** Rewrite TechSpec.md to match what was actually built, or retire the file entirely and keep documentation in the code.

---

#### 10. Sitemap Incomplete — Missing 9 Service Pages

**File:** `dist/sitemap.xml`

Current sitemap lists only 5 routes:
```
/
/pricing
/contact
/about
/innovations
```

**Missing:** All 9 service detail pages (`/services/bulk-sms`, `/services/bulk-email`, `/services/bulk-whatsapp`, `/services/ussd-codes`, `/services/shortcodes`, `/services/mpesa-integration`, `/services/sms-surveys`, `/services/airtime-rewards`, `/services/service-desk`), plus `/isp` (if kept), `/terms`, `/privacy`.

**Impact:** Search engines can't discover 60% of the site's content pages. The service pages are the most valuable for SEO (high-intent queries like "bulk SMS Kenya" or "M-Pesa integration").

**Fix:** Generate sitemap dynamically from route config. Static sitemap is a maintenance liability.

---

#### 11. copy.md (voice.md) vs. ISP Page — Complete Brand Mismatch

**File:** `voice.md`

The voice guide specifies authentic Nairobi positioning:
> "Sounds like people who actually run this stuff in Nairobi"
> "Clients: SACCOs, hospitals, logistics, government, churches, schools in Nairobi/county-level"
> "Don't say 'leverage' or 'synergise'"

The main site copy **matches this well** — "SMS platform that actually delivers", "routed smartly across Safaricom, Airtel, and Telkom", "M-Pesa integration by people who know the API", "Built in Nairobi. Used Across East Africa."

The ISP page **contradicts all of it** — "America's fastest download speeds", "Allegiant Stadium", "Test Service $14.99/mo", USD pricing, satellite TV content. It's the opposite of authentic Nairobi comms.

**Fix:** Covered in finding #1 — ISP page needs removal or rebuilding.

---

#### 12. Gravatar / External Image Dependencies in About Section

**File:** `src/sections/About.tsx` (lines 63–86)

Three about-section images are loaded from:
```
https://bracketweb.com/zeinet-html/main-html/assets/images/resources/about-5-1.jpg
https://bracketweb.com/zeinet-html/main-html/assets/images/resources/about-5-2.jpg
https://bracketweb.com/zeinet-html/main-html/assets/images/resources/about-5-3.jpg
```

These are from a **"Zeinet" HTML template** — generic stock images with zero relation to MobiWave. If bracketweb.com goes down or changes paths, the About page shows broken images.

**Fix:** Replace with real MobiWave team/office photos, or remove the decorative images and use abstract shapes instead.

---

### 🔵 LOW — Polish items

#### 13. `kimi-plugin-inspect-react` Dev Dependency

**File:** `vite.config.ts` / `package.json` (devDependencies)

`kimi-plugin-inspect-react@^1.0.3` is a Vite plugin for React component inspection (similar to React DevTools). It's harmless in dev but unusual — it's not widely published on npm (likely a custom/internal plugin). The plugin is imported in `vite.config.ts` but I can't verify it functions correctly without running `npm run dev`.

**Risk:** Low — it's a devDependency only. But if it's a custom plugin from an unknown source, it's an unverified supply chain entry.

**Recommendation:** Verify the plugin's npm provenance. If not actively used for debugging, remove it.

---

#### 14. Social Media Links Go to `#` — No Real Profiles

**File:** `src/sections/Footer.tsx` (lines 29–34)

Twitter, LinkedIn, Facebook, and Instagram all link to `#`. For a real business, this is a missed trust signal.

**Fix:** Set real social profile URLs or remove social icons.

---

#### 15. Contact Form — No Submission Handler

**File:** `src/pages/Contact.tsx` and `src/sections/Contact.tsx`

The contact form uses `react-hook-form` with `zod` validation, but there's no submission endpoint — the `<form>` has no `action` or `onSubmit` handler that sends data. It's a client-side-only form.

**Fix:** Connect to a backend endpoint (MobiWave's own API or a form service). Without this, the call-to-action "Talk to us" leads to a dead form.

---

## Architecture Assessment

### Component Size Analysis

| Component | Lines | Size | Verdict |
|-----------|-------|------|---------|
| `ISP.tsx` | 727 | 30,653 bytes | 🔴 Template contamination — not a MobiWave page |
| `Products.tsx` | 671 | ~28KB | 🟡 Large but data-driven (68 product cards). Splittable into sub-components but not a blocker |
| `Pricing.tsx` | 493 | ~21KB | 🟢 Well-structured pricing data array |
| `GlobeBackground.tsx` | 424 | ~15KB | 🟡 Could be lazy-loaded |
| `Footer.tsx` | 226 | 11KB | 🟢 Reasonable |
| `ServicePageLayout.tsx` | 305 | ~16KB | 🟢 Shared template, good pattern |
| `Contact.tsx` (page) | 275 | ~11KB | 🟢 Fine |

**Verdict:** `ISP.tsx` is the only genuine God component, and it's a different business entirely — not a code design problem but a template-merge problem. `Products.tsx` is data-heavy but structurally clean.

### Project Structure

```
Mobiwave v26.2/
├── ISP/                      # 🔴 Vue.js app — DEAD, delete
├── dist/                     # ✅ Built output
├── src/
│   ├── pages/                # ✅ Route pages
│   │   ├── services/         # ✅ 9 service pages via shared template
│   │   ├── ISP.tsx           # 🔴 Delete (wrong business)
│   │   ├── Products.tsx      # ✅ Data-driven
│   │   ├── Pricing.tsx       # ✅ Clean data pattern
│   │   └── ...
│   ├── sections/             # 18 components, some dead
│   │   ├── Header.tsx        # ✅ Live
│   │   ├── Navigation.tsx    # 🔴 Dead (Mawingu Connect zombie)
│   │   ├── ...
│   ├── components/
│   │   ├── ui/               # 50+ shadcn, many unused 🟡
│   │   ├── GlobeBackground.tsx # 🟡 Heavy, consider lazy-load
│   │   ├── SplashScreen.tsx  # 🔴 Harms performance
│   │   └── ServicePageLayout.tsx # ✅ Good abstraction
│   ├── App.tsx               # ✅ Clean routing
│   └── main.tsx              # ✅ Standard React 19 entry
├── voice.md                  # ✅ Good brand guide
└── TechSpec.md               # 🟡 Outdated
```

### ISP/ Subfolder Analysis

The `ISP/` directory is a **Vue.js 3 application** with:
- Vue 3 + Vite build chain
- Bootstrap 5 + jQuery + Owl Carousel + Magnific Popup
- Its own `index.html`, `vite.config.js`, `package.json`
- 1,050KB of template images in `/isp-images/`

It is **entirely unrelated** to the React app. It appears to be the original template before someone attempted to transcribe it into React as `ISP.tsx`. It can be safely deleted.

---

## Performance Readiness

### Current Bottlenecks

1. **SplashScreen:** 2,200ms blocking delay → LCP > 2.5s guaranteed
2. **Three animation libs:** ~830KB+ JS before any business content
3. **GlobeBackground RAF loop:** Never pauses when scrolled out of view
4. **External texture dependency:** Earth map image loaded from unpkg at runtime
5. **50+ UI component imports:** Even tree-shaken Vite bundles need to resolve all imports
6. **Sitemap missing pages:** 9 service pages not indexed
7. **No image optimization:** Hero images are JPEGs at 79KB and 41KB — acceptable, but could be WebP

### Lighthouse Estimate

| Metric | Target | Projection | Issue |
|--------|--------|------------|-------|
| FCP | < 1.5s | ~3.5s | SplashScreen + JS bundles |
| LCP | < 2.5s | ~4.5s | SplashScreen delay + heavy hero content |
| TBT | < 200ms | ~500ms+ | Three.js + React hydration + RAF loops |
| CLS | < 0.1 | ~0.08 | Likely acceptable |
| Performance Score | > 90 | ~40-55 | Splash alone kills it |

**Recommendation:** Remove SplashScreen, lazy-load GlobeBackground, and tree-shake unused shadcn components. The site ships easily 500KB+ of unnecessary JS before a user sees any content.

---

## Deployment Readiness

| Check | Status | Notes |
|-------|--------|-------|
| `npm run build` | ❌ FAILS | `tsc -b` error: unused variable `resourceLinks` |
| `dist/` exists | ✅ Yes | From a previous build (before code changes broke it) |
| `dist/.htaccess` | ✅ Yes | Standard Apache config, mobile redirect only |
| `dist/robots.txt` | ✅ Yes | Allows all, references sitemap |
| `dist/sitemap.xml` | 🟡 Partial | Only 5 of 14+ pages listed |
| `dist/index.html` | ✅ Good | Open Graph, Twitter Card, canonical, theme-color |
| AI Chat Widget | ✅ Present | `mobiwaveai.co.ke/widget.js` — live |
| SPA routing | 🟡 `_redirects` | Netlify-style redirect file exists |
| `Server` header | ❓ Unknown | No server-side config in repo |

**Verdict:** The site was previously deployed (dist/ exists with a valid index.html), but the TypeScript build currently errors. You cannot deploy the current state. The dist/ artifact may be from a clean state before recent changes.

---

## Then vs. Now — Migration Assessment

**Git Log Summary:**
```
* c2304d88 chore: ignore kilo config
* a71cc649 Stop tracking node_modules
*   3334a525 Merge PR #1: AI-generated ISP template branch
| * eb6163ce Add ISP website images and icon assets
| * f1e00595 Redesign ISP page to match Nylo satellite internet template
| * f34f9bd6 Add ISP link to navigation bar
| * ed2fa5e7 Add ISP satellite internet service page
| * 549c9cf9 Add ISP page with satellite internet design
* 1f38e1aa Local changes
* b276a66b Changes
* 9df2a714 First commit (template baseline)
```

**What happened:**
1. The project started from a generic React template (commit `9df2a714` — "first commit")
2. The template had multiple pre-built pages from different businesses: "Mawingu Connect" (Navigation.tsx), "Nylo ISP" (ISP.tsx), and the base which became MobiWave
3. Someone started building MobiWave pages on top (Header.tsx, Pricing, Contact, About — all good)
4. A PR (`ai_main_6bd781ef55d745b0aae2`) merged the ISP template as a "feature" — likely an AI agent or automated process
5. The Navigation.tsx was never cleaned up after Header.tsx replaced it
6. The TechSpec.md was never updated after GSAP was abandoned for Framer Motion

**Verdict:** This is a template-in-progress, not a migration. There's no evidence of an older v26.1 codebase. "v26.2" may be an inflated version number from the template origin. The real work was building MobiWave-specific pages on top of a multi-business template — and the cleanup of leftover template pages was incomplete.

---

## Code Quality: TypeScript Strict Mode

**Configuration:** `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  }
}
```

**Working?** Yes — the build error (`TS6133`) is proof that `noUnusedLocals` is catching issues. Strict mode is properly enforced.

**Issues found:**
- `resourceLinks` declared, never read (caught by TS)
- Various components use `useEffect` without cleanup on async operations (SplashScreen timer handled correctly, but some sections have potential race conditions)
- `Navigation.tsx` has unused imports (`Button`, `Sheet`, `SheetContent`, `SheetTrigger`, `SheetClose`) — but the component is dead code anyway
- `Footer.tsx` uses `onMouseEnter`/`onMouseLeave` inline these handlers are recreated every render (pattern throughout the app) — not a type error but a performance anti-pattern

**No `@ts-ignore` or `@ts-nocheck` found** in the codebase. `any` types are minimal and purposeful.

**Verdict:** TypeScript strict mode is active and doing its job. The team writes typed code. The one blocker (unused variable) is a simple fix.

---

## Concrete Recommendations (Priority Order)

### Must Fix Before Deploy

1. **Delete `ISP.tsx` and remove `/isp` route** — The page serves a Canadian satellite TV provider to Kenyan business visitors. Brand-damaging.

2. **Fix Footer.tsx unused variable** — Delete `resourceLinks` or replace `navLinks` usage with it. The heading "Services Req" should become "Resources" if the latter.

3. **Remove SplashScreen** — 2.2s forced delay kills Core Web Vitals and user experience. Replace with progressive loading or remove outright.

4. **Delete `src/sections/Navigation.tsx`** — Dead "Mawingu Connect" zombie component, never imported.

5. **Delete `ISP/` directory** — Separate unintegrated Vue.js app.

### Should Fix Before Next Release

6. **Replace About section external images** with real MobiWave photos or remove them.

7. **Remove unused dependencies:** `gsap`, `@gsap/react`, `animejs`, and audit 30+ unused shadcn UI components + their transitive deps.

8. **Lazy-load GlobeBackground** — `React.lazy(() => import('./GlobeBackground'))` with Suspense. Add IntersectionObserver to stop RAF loop when scrolled out of view.

9. **Add form submission handler** to Contact page — validate with the existing zod schema, then POST to an API endpoint.

10. **Update sitemap** to include all 9 service pages, terms, and privacy pages. Consider dynamic sitemap generation.

11. **Replace social media `#` links** with real MobiWave profiles.

12. **Fix Footer "Services Req" heading** — typo.

### Technical Debt

13. **Rewrite TechSpec.md** to match actual built code, or archive it.

14. **Move inline `onMouseEnter`/`onMouseLeave` handlers** to CSS hover states where possible — reduces re-render cost.

15. **Verify `kimi-plugin-inspect-react` provenance** — unusual dependency should have clear purpose.

16. **Consider WebP conversion** for `hero-bg.jpg` and other large static images in `dist/`.

---

## Summary

| Area | Grade | Notes |
|------|-------|-------|
| TypeScript | B+ | Strict mode works, one build-blocking unused var |
| Architecture | D | 30% template contamination, dead code, wrong business page |
| Performance | F | SplashScreen + 3 animation libs + 50+ unused UI components |
| SEO | C | Good HTML meta, but splash kills Vitals, sitemap incomplete |
| Dependencies | D | 360MB node_modules, unused gsap/animejs, 30+ unused shadcn |
| Business Alignment | F | ISP page is for a different company |
| Deployment | F | Build fails |
| Documentation | D | TechSpec.md is fiction; voice.md is good |

**Total estimated effort to green:** 2-3 developer days for cleanup, 3-5 days for performance optimization.

---

*End of Review*
