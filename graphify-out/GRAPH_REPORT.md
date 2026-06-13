# Graph Report - Kimi_Agent_MobiWave Website Redesign  (2026-05-15)

## Corpus Check
- 96 files · ~476,206 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 273 nodes · 181 edges · 3 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `useCarousel()` - 2 edges
2. `CarouselNext()` - 2 edges
3. `useSidebar()` - 2 edges
4. `SidebarMenuButton()` - 2 edges
5. `isActive()` - 2 edges
6. `linkClass()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (2): SidebarMenuButton(), useSidebar()

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (2): CarouselNext(), useCarousel()

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (2): isActive(), linkClass()

## Knowledge Gaps
- **Thin community `Community 7`** (7 nodes): `sidebar.tsx`, `cn()`, `handleKeyDown()`, `SidebarMenu()`, `SidebarMenuButton()`, `SidebarMenuItem()`, `useSidebar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (5 nodes): `carousel.tsx`, `Carousel()`, `CarouselNext()`, `cn()`, `useCarousel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (3 nodes): `isActive()`, `linkClass()`, `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._