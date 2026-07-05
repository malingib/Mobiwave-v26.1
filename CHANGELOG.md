# Changelog — Mobiwave v26.2 Cleanup

## 2026-07-05 — Phase 1 & 2 Cleanup

### 🔴 Phase 1 — Critical (All Complete)

- **Deleted ISP.tsx** — Removed 727-line "Nestor Satellite Internet Provider" page that served Canadian ISP content (USD pricing, American phone numbers, satellite TV) instead of MobiWave Kenyan comms business. Removed `/isp` route from App.tsx and ISP link from Header.tsx navigation.
- **Fixed Footer unused variable** — `resourceLinks` was declared but never read (TS6133). Fixed by properly wiring it into the JSX with heading "Resources". Heading typo "Services Req" → "Resources".
- **Removed SplashScreen delay** — Replaced 2,200ms blocking SplashScreen with a simple 400ms fade. Splash state and related imports removed from App.tsx.
- **Deleted Navigation.tsx** — Removed dead "Mawingu Connect" brand component (166 lines, never imported).
- **Deleted ISP/ subdirectory** — Removed separate unintegrated Vue.js 3 app with Bootstrap/jQuery. Template debris.

### 🟠 Phase 2 — Should Fix (Complete)

- **Fixed About section external images** — Replaced 3 `<img>` tags loading from `bracketweb.com/zeinet-html/...` (external HTML template) with abstract gradient circles using brand colors.
- **Updated sitemap.xml** — Added all 9 service detail pages + /terms + /privacy to sitemap (was missing 60%+ of pages).
- **Fixed social media links** — Updated Footer social icons from placeholder `#` to real MobiWave social URLs (Twitter/X, LinkedIn, Facebook, Instagram).
- **Archived TechSpec.md** — Renamed to TechSpec.old.md. Original spec was aspirational and didn't match built code (claimed GSAP as primary, listed components that don't exist).
- **GlobeBackground** — Removed unused `isVisibleRef` that was breaking the build.
- **Build now passes cleanly** — `npm run build` exits 0 with no TypeScript errors.

### Remaining (Deferred)

- Lazy-load GlobeBackground with React.lazy + Suspense (requires component restructuring)
- Add production Contact form POST handler (current implementation is client-side only)
- Remove unused shadcn UI components (30+ installed, ~10 used)
- WebP conversion for hero images
- Dynamic sitemap generation from route config
