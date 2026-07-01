# Repository guidance

## Product

This repository contains the `avoid-ai-writing` Cursor Agent Skill, its deterministic
surface detector, generated Cursor installation artifacts, and compatibility tests.

The public skill name, modes, flags, legacy profiles, and output headings are a compatibility
contract. See `contracts/public-contract.json`.

## Canonical sources

- `SKILL.md`: concise router, safety contract, modes, workflow, and outputs.
- `references/PATTERN-CATALOG.md`: surface patterns and severity.
- `references/PROFILES.md`: context and voice behavior.
- `references/STRUCTURAL-AUDIT.md`: permissioned document-level audit.
- `detector/patterns.js`: optional deterministic surface detector.
- `contracts/`: machine-readable public and category inventories.

Generated files:

- `dist/avoid-ai-writing-runtime.md`;
- `dist/avoid-ai-writing-standalone.md`.

Do not edit generated files directly.

## Change workflow

1. Edit canonical sources.
2. Update metadata and `CHANGELOG.md` when behavior changes.
3. Run `npm run build`.
4. Run `npm test`.
5. Inspect generated diffs for lost instructions or damaged formatting.

## Constraints

- Keep `SKILL.md` under 500 lines.
- Keep reference links directly reachable from `SKILL.md`.
- Preserve the self-reference escape hatch and protected-material behavior.
- Do not turn a correlation into an authorship verdict or universal writing rule.
- Do not add facts, sources, examples, or personal experiences during a rewrite.
- Global structural changes require explicit user consent.
- Regex-detectable additions need detector fixtures and category mapping.
- Semantic additions belong in the pattern or structural references and in
  `detector/CATEGORIES.md` as judgment-only checks.
- Add a true-positive and a must-not-fire case for detector changes.
- Add genre-gate fixtures for profile or structural-policy changes.

## Commands

```bash
npm run build
npm test
npm run test:deploy
```

Node 18+, Bash, and Python 3 are required for repository development. The installed Cursor
skill itself has no runtime dependencies.
