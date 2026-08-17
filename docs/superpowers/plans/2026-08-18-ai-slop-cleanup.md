# AI Slop Visual Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce generic AI-style visual treatment across the remaining pages while preserving page purpose, navigation, forms, pricing clarity, and API readability.

**Architecture:** Start with shared page primitives so service and guide routes become consistent, then flatten repeated page-specific card and gradient treatments. Keep semantic icons where they communicate meaning, but remove oversized decorative icon tiles and unnecessary visual containers.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vite, Framer Motion.

## Global Constraints

- Keep all route content, links, forms, pricing data, and API examples functional.
- Prefer plain surfaces, borders, typography, and spacing over decorative gradients and shadows.
- Compact section spacing should generally use `py-14 lg:py-20`; retain roomier spacing only for hero and conversion sections.
- Preserve responsive behavior, keyboard focus, and reduced-motion behavior.

### Task 1: Shared page primitives

**Files:**
- Modify: `src/components/PageBanner.tsx`
- Modify: `src/components/ServicePageLayout.tsx`

- [ ] Remove decorative radial background layers from `PageBanner` while retaining the plain banner surface and readable content contrast.
- [ ] Reduce shared service-page section padding and replace large numbered gradient circles with compact text/line markers.
- [ ] Keep service-page CTA content and contact details intact.
- [ ] Run `npx tsc -b`.

### Task 2: Secondary marketing pages

**Files:**
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Pricing.tsx`
- Modify: `src/pages/Products.tsx`
- Modify: `src/pages/Contact.tsx`
- Modify: `src/pages/Resources.tsx`

- [ ] Reduce oversized page section padding.
- [ ] Flatten generic card fills and heavy shadows where content remains readable on the page surface.
- [ ] Replace oversized gradient icon tiles with restrained icon/text treatments, retaining icons when they improve scanning.
- [ ] Remove decorative gradient backgrounds from product and CTA blocks unless they establish a necessary contrast boundary.
- [ ] Run `npx tsc -b`.

### Task 3: Guides and API documentation

**Files:**
- Modify: `src/components/GuidePageLayout.tsx`
- Modify: `src/pages/ApiDocs.tsx`

- [ ] Compact guide sections and simplify step/action treatments without removing step meaning.
- [ ] Preserve dark code blocks, syntax contrast, table readability, and API navigation.
- [ ] Remove only decorative backgrounds and excessive card chrome from documentation content.
- [ ] Run `npx tsc -b`.

### Task 4: Full verification

**Files:**
- Generated: `dist/`

- [ ] Run `npm run build`.
- [ ] Confirm prerendering completes for all 22 sitemap routes.
- [ ] Confirm SEO validation reports 22/22 routes passing.
- [ ] Run `git diff --check`.
- [ ] Review the final diff for unrelated changes.
