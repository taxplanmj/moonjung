# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

문정세무회계컨설팅 — marketing site for a tax/accounting firm specializing in e-commerce
sellers (쿠팡/네이버/자사몰/해외직구/틱톡샵). Next.js 15 (App Router), static export,
deployed to Cloudflare Pages.

## Commands

```bash
npm run dev         # dev server
npm run build        # static export build -> out/
npm run typecheck    # tsc --noEmit — run after every change, before calling anything done
npm run lint          # next lint
npx wrangler pages deploy out   # deploy to Cloudflare Pages
```

There is no test suite. `npm run typecheck` is the correctness gate — always run it after
edits. There is no dev server auto-restart issue to worry about since Next handles that;
if a dev server is already running on port 3000, a second `npm run dev` will start on 3001
instead of erroring.

## Architecture

**Static export, no server runtime.** `next.config.ts` sets `output: 'export'`. There are
no API routes and no server components that fetch at request time — everything is either
static content baked at build time or fetched client-side from an external endpoint (see
Backend section below). Any feature that needs a database or server logic must be built as
a separate Cloudflare Pages Function / external service, not a Next.js API route.

**Landing page = section composition.** `app/(marketing)/page.tsx` is a flat list of
section components in scroll order (Hero, PlatformTabs, CFORoadmap, ContentSection,
StatsSection, TeamSection, PricingSection, FAQSection, Footer). Each section is a
self-contained `components/sections/*.tsx` file with its own local data array, color map,
and copy — there is no shared "content model" across sections. When adding a new section,
follow this same shape: one file, own data at the top, default-exported component,
registered in `page.tsx`.

**Data/content lives next to or above the component it feeds, not inline in JSX.**
`lib/faq-data.ts`, `lib/content-data.ts` hold typed arrays consumed by their section. When a
section's data is meant to eventually come from a backend, keep the same pattern: define the
shape in `lib/*.ts`, consume it from the component, and leave a comment pointing at the
relevant doc in `docs/` (see `docs/content-aggregation-plan.md` for the ContentSection
video/blog aggregation plan — read it before touching that section's data layer).

**Scroll animation convention — always follow this, do not ask about it again:**
Every section's entrance animation must use framer-motion's `whileInView` with
`viewport={{ once: true, margin: '-100px' }}`, never a plain `animate`/`initial` pair that
fires on mount. The one exception is `Hero.tsx`, which uses `animate="visible"` on mount
because it's the first thing visible with no scrolling required. If a section is visible
above the fold in some viewport, that's still not a reason to use mount-fire animation —
`whileInView` handles that correctly too (it fires as soon as the element is in view,
including on initial load if already in the viewport). Any new section must replicate the
`containerVariants`/`itemVariants` stagger pattern used throughout (see `CFORoadmap.tsx` or
`TeamSection.tsx` for the canonical shape) rather than inventing a new animation approach.

**Section background alternates on purpose.** Scroll order alternates between a plain/light
background and a "featured" dark-navy background (Hero → light → dark → light → dark →
light → dark → light → dark/Footer). When adding or reordering a section, check
`components/sections/*.tsx` background colors and preserve the alternation — it's a
deliberate rhythm, not incidental. Dark sections each get their own decorative motif (not a
shared texture) — see `CFORoadmap.tsx` (crosshatch), `StatsSection.tsx` (stock-chart SVG),
`PricingSection.tsx` (ledger-line texture) for the pattern: dark navy gradient + a motif
tied to that section's content + a colored glow.

**Korean word-breaking is handled globally.** `styles/globals.css` sets
`word-break: keep-all` on `body`. Do not add per-element `style={{ wordBreak: 'keep-all' }}`
— it's redundant. When adding headline text with an inline `<br />` for a manual line break,
remember `<br className="hidden sm:block" />` only fires at the `sm` breakpoint; if you omit
a space/word-boundary before it, the text can visually run together at mobile widths where
the `<br>` is hidden and it just wraps naturally instead.

**Internal navigation uses `next/link`, not `<a>`.** A few older sections used raw `<a
href="/...">` for internal links; when touching a section, fix this to `<Link>` if you see
it. External links (other domains) correctly stay as `<a target="_blank"
rel="noopener noreferrer">`.

**Count-up number animation is a shared hook.** `lib/useCountUp.ts` exports
`useCountUp(target, duration?, from?)` — animates a number into view (replays every time the
element re-enters the viewport, not just once) and supports counting either up (default
`from: 0`) or down (e.g. showing a "normal price" falling to a discounted one, see
`PricingSection.tsx`). Reuse this hook rather than writing a new counter; it's already used
in `StatsSection.tsx` and `PricingSection.tsx`.

**Icons for e-commerce platforms are custom-drawn, not real logos.**
`components/icons/PlatformLogos.tsx` has stylized shapes evoking Coupang/TikTok/Naver, not
literal trademark reproductions — this was a deliberate call accepting minor trademark risk.
Don't add new "official-logo-style" icons for other brands (social platforms, payment
providers, etc.) without flagging the same tradeoff; prefer neutral icons or plain text
badges for anything not already in that file.

**Marketing copy avoids unsubstantiated superlatives.** Phrases like "업계 최고", "1위",
"최고다" are avoided in favor of softer phrasing ("업계 최저 수준", "정확히 압니다") because
Korean 표시광고법 restricts comparative/superlative ad claims without objective backing.
Keep this in mind when writing new headlines or CTAs — it's a recurring editorial pass, not
a one-off note.

**Non-web-asset reference files go in `/reference`, not `/public`.** `/reference` is
gitignored and exists for source photos, drafts, and other material the user wants easy
filesystem access to without it being deployed or committed. `/public` is only for files
actually referenced by site code (they become publicly served URLs on deploy).

## Backend (planned, not yet built)

The site is currently 100% static with no persistence. Two features are designed but not
implemented — read the plan before building either:
- Consultation form lead capture: currently posts to `NEXT_PUBLIC_LEAD_WEBHOOK` client-side
  with a localStorage fallback; a Cloudflare Pages Function + Neon Postgres + Kakao
  AlimTalk notification backend was designed in conversation but not yet built.
- `ContentSection.tsx` video/blog aggregation from multiple channels — full design in
  `docs/content-aggregation-plan.md`, including the upsert-not-append DB pattern and which
  channels have workable public APIs.
