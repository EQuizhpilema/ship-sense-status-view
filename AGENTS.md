# AGENTS.md

- MDB/FACTS12 cards render inside a shadow root (`src/components/MdbScope.tsx`): the theme sheets are linked there and their `:root` custom properties are re-declared on `:host` from the generated `src/lib/mdb-theme-tokens.ts` (regenerate with `node scripts/gen-mdb-tokens.mjs`). Loading the sheets in the document instead resets the Tailwind screens, and a shadow tree has no document root for `:root` to match.
