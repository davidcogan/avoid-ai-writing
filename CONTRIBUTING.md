# Contributing

Thanks for helping improve this Cursor skill. It teaches an agent (and an optional deterministic
engine) to spot and fix AI-writing tells. Contributions are welcome — a few things
keep the project coherent.

## How the repo fits together

| Path | What it holds |
|------|---------------|
| `SKILL.md` | Public contract, safety gates, modes, workflow, and output format. |
| `references/PATTERN-CATALOG.md` | Human-readable surface catalog and severity guide. |
| `references/PROFILES.md` | Context and voice profiles. |
| `references/STRUCTURAL-AUDIT.md` | Permissioned document-level checks. |
| `detector/patterns.js` | The deterministic engine — the executable subset of the rules. |
| `detector/CATEGORIES.md` | The map between catalog rules and detector `type`s. Keep it current. |
| `contracts/` | Public interface and surface-category inventories. |
| `tests/` | Package, compatibility, and genre-gate fixtures. |
| `dist/avoid-ai-writing-runtime.md` | Recommended generated Cursor runtime. |
| `dist/avoid-ai-writing-standalone.md` | Optional generated one-file Cursor runtime. |

## Adding or changing a rule

First decide which kind of rule it is:

- **Regex-detectable** (a phrase, a character, a structural shape) → add it to
  `references/PATTERN-CATALOG.md`, add the detection to `detector/patterns.js`
  with a new `type`, and add a row to `detector/CATEGORIES.md`. Cover it with a fixture in
  `detector/patterns.test.js` (both a true positive and a case that must *not*
  fire).
- **Judgment-only** (needs reading for meaning — tone, structure, name-dropping)
  → add it to the appropriate reference and list it under "Skill-only" in
  `detector/CATEGORIES.md`. There is no detector type for these.

If you are unsure which it is, open an issue first and we will sort it out.

## Precision over recall

This skill is deliberately biased toward false negatives: a rule that wrongly
flags ordinary human writing is worse than one that misses a tell, because false
positives erode trust in every other rule. Before proposing a rule, ask who would
get flagged by mistake, and add carve-outs for the legitimate cases. A signal
that fires on most normal prose is not worth adding.

## Cite your sources

If your rule rests on a factual claim about how AI or humans write — "ChatGPT
emits curly quotes by default," "most writers rarely do X" — link a source for
it. These claims get checked, and some turn out wrong or more nuanced than they
first seem (smart quotes, for instance, are a typing-time default on macOS and in
Word, not a publication-step artifact). A claim with a citation can be verified;
an asserted one can't. Put the links in the PR description or inline in the rule.

## Run the tests

```bash
npm run build
npm test
```

The build command refreshes both Cursor distributions. The test command runs
detector fixtures, category mapping, public-contract checks, genre-gate coverage,
and generated-file checks. Repository development requires Node 18+, Bash, and Python 3.

## Write clean prose

This repo polices writing quality, so the prose you add has to clear the same
bar. Run your additions through the skill itself. Keep rule bullets terse and
lead with the directive — match the length and tone of the bullets already in
`SKILL.md`. Drop intensifiers like "strong" or "powerful"; let the rule stand on
its own.

## Changelog and versioning

Add an entry to `CHANGELOG.md` under a dated, versioned heading
(`## [X.Y.Z] - YYYY-MM-DD`), matching the existing entries. Update the version
in `SKILL.md`, `contracts/public-contract.json`, `contracts/surface-categories.json`,
and `package.json`, then regenerate distributions.
