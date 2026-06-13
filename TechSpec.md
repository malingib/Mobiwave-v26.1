# MobiWave Website Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, form submit | Custom gradients, glow effects |
| Card | Service cards, feature cards | Glassmorphism, 3D transforms |
| Input | Contact form fields | Floating labels, focus animations |
| Select | Form dropdowns | Custom styling |
| Badge | Hero badge | Gradient background |
| Separator | Visual dividers | Gradient colors |

### Third-Party Registry Components
None required - custom implementations preferred for unique animations.

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| ParticleBackground | Hero particle system | components/ParticleBackground.tsx |
| AnimatedText | Text reveal animations | components/AnimatedText.tsx |
| GlassCard | Glassmorphism card wrapper | components/GlassCard.tsx |
| FloatingIcon | Orbiting icon animation | components/FloatingIcon.tsx |
| ScrollProgress | Progress indicator | components/ScrollProgress.tsx |
| LogoCarousel | Infinite scroll logos | components/LogoCarousel.tsx |
| MagneticButton | Magnetic hover effect | components/MagneticButton.tsx |
| TiltCard | 3D tilt on hover | components/TiltCard.tsx |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero particle system | Canvas API | Custom canvas with requestAnimationFrame | High |
| Text clip reveal | GSAP | SplitText + clip-path animation | Medium |
| Scroll-triggered entrances | GSAP ScrollTrigger | Intersection Observer + gsap.to() | Medium |
| Horizontal scroll (Services) | GSAP ScrollTrigger | Pin + horizontal translate | High |
| 3D card tilt | CSS + React | Perspective + rotateX/Y on mousemove | Medium |
| Magnetic button | React + CSS | Mouse position tracking + transform | Medium |
| Floating animations | CSS | @keyframes with translateY | Low |
| Logo carousel | CSS | Infinite translateX animation | Low |
| SVG path draw | GSAP | stroke-dashoffset animation | Medium |
| Glassmorphism | CSS | backdrop-filter + rgba backgrounds | Low |
| Parallax layers | GSAP ScrollTrigger | scrub + translateY at different rates | Medium |
| Stagger reveals | GSAP | stagger property with timeline | Medium |
| Gradient shimmer | CSS | background-position animation | Low |
| Pulse glow | CSS | box-shadow + scale keyframes | Low |

## Animation Library Choices

### Primary: GSAP + ScrollTrigger
- Complex scroll-linked animations
- Timeline sequencing
- Horizontal scroll pinning
- Performance-optimized transforms

### Secondary: CSS Animations
- Simple hover effects
- Continuous ambient animations
- Infinite loops (carousels)
- Reduced motion support

### Canvas API
- Hero particle system
- Performance-critical visual effects

## Project File Structure

```
app/
├── public/
│   ├── images/
│   │   ├── about-illustration.jpg
│   │   ├── logo.png
│   │   └── client-logos/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── ParticleBackground.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── GlassCard.tsx
│   │   ├── FloatingIcon.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── LogoCarousel.tsx
│   │   ├── MagneticButton.tsx
│   │   └── TiltCard.tsx
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Clients.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── animations.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Dependencies

### Core
- react
- react-dom
- typescript
- vite

### Animation
- gsap
- @gsap/react

### UI
- tailwindcss
- @radix-ui/react-* (shadcn dependencies)
- lucide-react
- class-variance-authority
- clsx
- tailwind-merge

### Fonts
- @fontsource/poppins
- @fontsource/inter

## Installation Commands

```bash
# Initialize project
bash scripts/init-webapp.sh "MobiWave Innovations"

# Install animation libraries
npm install gsap @gsap/react

# Install fonts
npm install @fontsource/poppins @fontsource/inter

# All shadcn components are pre-installed by init script
```

## CSS Custom Properties

```css
:root {
  /* Colors */
  --primary-blue: #0e6fbd;
  --primary-dark: #0a3a5c;
  --primary-light: #e7f3fa;
  --accent-teal: #2ecc71;
  --accent-cyan: #00d4ff;
  
  /* Easing */
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Durations */
  --duration-fast: 200ms;
  --duration-normal: 500ms;
  --duration-slow: 800ms;
  --duration-dramatic: 1200ms;
}
```

## Responsive Breakpoints

| Breakpoint | Width | Animation Level |
|------------|-------|-----------------|
| Mobile | < 768px | Essential only |
| Tablet | 768px - 1024px | Reduced complexity |
| Desktop | > 1024px | Full experience |

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Animation frame rate: 60fps
- Lighthouse Performance: > 90

## Accessibility Requirements

- prefers-reduced-motion support
- Keyboard navigation
- Focus indicators
- ARIA labels
- Color contrast WCAG 2.1 AA
