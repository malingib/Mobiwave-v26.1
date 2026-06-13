# Looka Redesign Skill Orchestrator

Use this sequence for any full redesign task of this project.

## Phase 0: Context
1. `graphify`
- Build a quick code graph and map section ownership before editing.

## Phase 1: Design + Architecture
2. `frontend-design`
- Lock visual direction, typography, color tokens, and section rhythm.
3. `build-web-apps:frontend-app-builder`
- Build/refactor sections in production-ready layout patterns.

## Phase 2: Component System
4. `build-web-apps:shadcn`
- Prefer existing shadcn primitives and composition.
- Use semantic tokens and `cn()` for conditionals.
- Avoid `space-x-*` and `space-y-*`; use `gap-*`.

## Phase 3: AI Surface (Only if AI content exists)
5. `vercel:ai-elements`
- Install only needed parts from AI Elements registry.
- Use `MessageResponse` for AI-generated markdown text.
- Skip this phase for purely marketing pages with no AI output.

## Phase 4: Quality + Verification
6. `vercel:react-best-practices`
- Run a TSX quality pass after edits.
7. `vercel:agent-browser-verify`
- Visual check on desktop and mobile.
8. `vercel:verification`
- End-to-end flow check for critical CTA paths.

## Phase 5: Performance
9. `cloudflare:web-perf`
- Capture a cold-load trace and report Core Web Vitals.
- If Chrome DevTools MCP is missing, add:

```json
"chrome-devtools": {
  "type": "local",
  "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
}
```

## Deliverables
- Updated sections + shared tokens
- Build passes
- Performance summary (CWV + top fixes)
- Final change log with file references
