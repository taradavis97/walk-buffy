# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the SvelteKit dev server (Vite)
- `npm run build` — production build (uses `@sveltejs/adapter-vercel`)
- `npm run preview` — preview the production build locally
- `npm run check` — run `svelte-kit sync` then `svelte-check` against `tsconfig.json` (type-check `.svelte` + `.ts`)
- `npm run lint` — `prettier --check .` then `eslint .`
- `npm run format` — `prettier --write .`

There is no test runner configured.

## Architecture

Single-page SvelteKit app where you drag "Buffy" (a dog) around a stage to choose a walk duration, then save the walk to a shared log backed by Turso (libsql).

### Stack specifics

- **Svelte 5 with runes forced on** project-wide via `svelte.config.js` (`compilerOptions.runes` returns `true` for non-`node_modules` files). Use `$state`, `$derived`, `$props`, `$bindable`, `$effect` — not the legacy reactive syntax.
- **Tailwind v4** via `@tailwindcss/vite` (not a PostCSS config). The stylesheet entry is `src/routes/layout.css` (referenced from `.prettierrc` for class sorting).
- **Adapter**: `@sveltejs/adapter-vercel`. Server code runs on Vercel Functions.

### Data flow (the only page)

`src/routes/+page.server.ts` is the single source of truth for persistence:

- `load` runs `ensureSchema()` then selects all rows from `walks` ordered by `saved_at DESC`.
- The default form action validates `duration` and `walkerName`, then inserts a row with a `crypto.randomUUID()` id and `new Date().toISOString()` timestamp.

`src/lib/server/turso.ts` creates a libsql client from `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` (`$env/static/private`) and memoises a `CREATE TABLE IF NOT EXISTS walks` call in a module-level promise so the schema is ensured at most once per server instance. Local env values live in `.env.development.local` (gitignored).

`src/routes/+page.svelte` binds `duration` from `<WalkPlanner>` into a hidden form input and posts to the same route via `use:enhance`.

### The duration logic (WalkPlanner.svelte)

This is what users most often want to tweak. `WalkPlanner.svelte` measures pointer distance from Buffy to the walker and maps it to seconds using a piecewise curve with three plateaus:

- `T_MIN`, `T_PLAT_LO`, `T_PLAT_HI`, `T_MAX` — the duration anchors in seconds.
- `dLo = distMax * 0.4`, `dHi = distMax * 0.8` — the distance thresholds.
- `distanceToSeconds` uses `smoothstep` at the ends and linear interpolation in the middle.
- The final value is rounded to whole minutes (`Math.round(seconds / 60) * 60`).

When the user asks to change the duration range or how distance maps to minutes, edit these constants/curve — not the drag handling.

### Components

- `Buffy.svelte` — draggable target, uses pointer capture + keyboard (arrow keys, shift for larger steps) and exposes ARIA slider semantics. Image swaps between `/buffy-happy.png` and `/buffy-sad.png` based on the `dragging` state. Coordinates are bound via `$bindable()`.
- `Walker.svelte`, `Lead.svelte` — render the walker and the leash/line from walker to Buffy.
- `WalkLog.svelte` + `WalkLogRow.svelte` — read-only table of saved walks.
- `Timer.svelte` — display-only; formats minutes via `formatDuration`.
- `Input.svelte` — the `walkerName` text input (note the `name="walkerName"` attribute must match the server action's `formData.get('walkerName')`).
- `format.ts` — `formatDuration(seconds)` returns `MM:SS` (the input is seconds despite the parameter name); `formatSavedAt(iso)` returns a localised "5 November"-style date.

Static images live in `static/` and are referenced by absolute paths like `/buffy-happy.png`.

## Project context

This is a personal/learning project (owner: Tara). `TaraTasks.md` at the repo root is a list of exercises Tara is working through — it's intended for Tara, not for Claude to execute. Don't modify it unless asked.

## Svelte MCP server

You have access to the Svelte MCP server (`mcp__svelte__*`) for authoritative Svelte 5 / SvelteKit documentation.

- **`list-sections`** — call FIRST when a task involves Svelte/SvelteKit to discover relevant docs.
- **`get-documentation`** — after `list-sections`, fetch every section whose `use_cases` is relevant to the task.
- **`svelte-autofixer`** — MUST be run on any Svelte code you write before showing it to the user; keep iterating until it returns no issues.
- **`playground-link`** — only after user confirmation, and never for code that was written to files in this repo.
