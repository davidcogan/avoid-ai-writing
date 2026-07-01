<div align="center">

# avoid-ai-writing

A Cursor Agent Skill for removing AI-writing patterns without damaging facts, voice, or
genre conventions.

[![License: MIT](https://img.shields.io/github/license/davidcogan/avoid-ai-writing)](LICENSE)

</div>

---

## What this is

`avoid-ai-writing` is a **Cursor skill**. Cursor discovers it by its frontmatter name and
loads it when you invoke `avoid-ai-writing` directly or ask for work such as:

```text
Remove AI-isms from this post.
Audit this draft for AI tells.
Make this sound less like AI.
Edit post.md in place.
Scan this, but do not rewrite it.
```

It supports three modes:

- **Rewrite** (default): audit, rewrite, summarize changes, and run a corrective pass.
- **Detect**: report clear issues and judgment calls without rewriting.
- **Edit**: make minimal changes to a named file and verify the result.

An optional structural pass is available only when requested:

```text
Run a deep structural audit before rewriting.
--depth structural
```

The skill treats AI-associated patterns as editing signals, never proof of authorship.

## Install in Cursor

### User-level installation (recommended)

Use this when you want the skill available in every Cursor project:

```bash
mkdir -p ~/.cursor/skills/avoid-ai-writing/references

curl --fail --show-error --location \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/HEAD/dist/avoid-ai-writing-runtime.md \
  -o ~/.cursor/skills/avoid-ai-writing/SKILL.md

curl --fail --show-error --location \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/HEAD/references/STRUCTURAL-AUDIT.md \
  -o ~/.cursor/skills/avoid-ai-writing/references/STRUCTURAL-AUDIT.md
```

Restart Cursor or open a fresh chat, then test:

```text
Which version of avoid-ai-writing is loaded? Then run it in detect mode on:
"Certainly! The future looks bright!"
```

Expected: version `4.0.1`, followed by `Issues found` and `Assessment` sections that flag
the chatbot opener and generic conclusion.

### Project-level installation

Use this when a repository should pin and share the skill with its contributors. Run these
commands from the repository root. The URLs use the `v4.0.1` tag rather than mutable
`HEAD`:

```bash
mkdir -p .cursor/skills/avoid-ai-writing/references

curl --fail --show-error --location \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/v4.0.1/dist/avoid-ai-writing-runtime.md \
  -o .cursor/skills/avoid-ai-writing/SKILL.md

curl --fail --show-error --location \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/v4.0.1/references/STRUCTURAL-AUDIT.md \
  -o .cursor/skills/avoid-ai-writing/references/STRUCTURAL-AUDIT.md
```

Commit `.cursor/skills/avoid-ai-writing/` so every contributor gets the same version.

Choose one scope for the same installation. A user-level skill is best for personal,
cross-project use; a project-level skill is best when a team wants the repository to own the
version. Installing both can make discovery and version debugging harder.

### Do not install this as a Cursor rule

This repository does not ship an `.mdc` rule. A rule would attach the full editing policy
ambiently based on file globs, increasing context use and making invocation less explicit.
The skill is the supported integration.

Do not clone the full source repository into `~/.cursor/skills` or
`.cursor/skills`. Install only the generated runtime files above. The source checkout
contains tests, fixtures, scripts, and generated artifacts that Cursor does not need at
runtime.

## What `dist/` means

The files in `dist/` are **generated Cursor installation artifacts**. Maintainers edit the
canonical source files:

- `SKILL.md`
- `references/PATTERN-CATALOG.md`
- `references/PROFILES.md`
- `references/STRUCTURAL-AUDIT.md`

Then `npm run build` assembles the installable files.

### `dist/avoid-ai-writing-runtime.md` — recommended

This is the optimized user/project-level `SKILL.md`.

It embeds:

- the skill router and public behavior contract;
- the surface pattern catalog;
- context and voice profiles.

It leaves the structural audit as a separate reference because structural analysis is
opt-in. This keeps normal rewrites fast:

- v3.8 skill payload: 58,508 bytes;
- v4 optimized runtime: 41,956 bytes;
- 28.3% smaller on the default path.

Install this file as `SKILL.md`, plus
`references/STRUCTURAL-AUDIT.md`, using the commands above.

### `dist/avoid-ai-writing-standalone.md` — optional one-file install

This file embeds everything, including the structural audit. It can be saved directly as
`SKILL.md` with no references directory:

```bash
mkdir -p ~/.cursor/skills/avoid-ai-writing

curl --fail --show-error --location \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/HEAD/dist/avoid-ai-writing-standalone.md \
  -o ~/.cursor/skills/avoid-ai-writing/SKILL.md
```

The standalone file is simpler to copy but loads the structural instructions on every use.
For a project-level one-file install, save it as
`.cursor/skills/avoid-ai-writing/SKILL.md` and pin the download URL to a release tag.
For normal internal Cursor use, prefer the optimized runtime.

Generated files should not be edited directly. Change the canonical sources and rebuild.

## What version 4 changes

### Preservation comes first

The skill preserves:

- facts, numbers, dates, names, links, and quotations;
- citations and claim-to-source relationships;
- code and technical identifiers;
- negation, modality, uncertainty, units, and scope;
- attributed or protected material.

It does not invent evidence, examples, metrics, causal explanations, or personal
experiences to make prose sound human.

### Structural audit

When explicitly requested, the structural pass checks:

- repeated explanation of an implication the evidence already carries;
- causal stories cleaner than the evidence supports;
- empty hedging versus material uncertainty;
- evidence that should recontextualize an earlier claim;
- conclusions that resolve more than the evidence permits;
- stacked bodily, sensory, and environmental cues;
- missing external anchors;
- generic rather than audience-specific reader framing;
- repeated argument templates across a batch.

Global changes to section order, chronology, thesis, evidence, point of view, plot, or ending
require explicit approval.

### Genre protection

The skill preserves functional conventions in:

- technical documentation;
- research and analytical writing;
- email;
- slides;
- social posts;
- fiction and narrative nonfiction;
- second-language prose;
- a supplied author voice.

Linearity, repetition, headings, lists, fragments, explicit summaries, and calibrated
hedging are not defects when the format needs them.

### Surface catalog

The generated runtime includes **47 surface pattern categories** plus the semantic
structural checks. Vocabulary tiers, punctuation counts, list lengths, and similar
thresholds are review heuristics rather than authorship evidence.

## Quick example

**Input**

> Certainly! Acme Analytics, a vibrant startup nestled in the heart of Boulder, raised a
> $40M Series B in June 2026. The platform serves as a comprehensive hub, featuring
> real-time dashboards and boasting query latency under one second. Moreover, this pivotal
> round underscores Acme's game-changing potential. Experts believe it is poised to
> revolutionize observability. In conclusion, the future looks bright!

**Output**

> Acme Analytics, a startup in Boulder, raised a $40M Series B in June 2026. Its platform
> includes real-time dashboards and has query latency under one second.

The rewrite removes interface language, promotional framing, inflated verbs, unsupported
predictions, and the generic conclusion. It does not add investors, customers, benchmarks,
market size, or use-of-funds claims.

## Updating

Rerun the same installation commands, then restart Cursor or open a fresh chat. The public
skill name remains `avoid-ai-writing`, so existing instructions and workflows continue to
invoke the updated version.

## Repository layout

```text
SKILL.md                                  Canonical router and public contract
references/PATTERN-CATALOG.md             Canonical surface catalog
references/PROFILES.md                    Canonical context and voice profiles
references/STRUCTURAL-AUDIT.md            Canonical opt-in structural audit
dist/avoid-ai-writing-runtime.md           Recommended generated Cursor runtime
dist/avoid-ai-writing-standalone.md        Optional generated one-file runtime
contracts/                                Public and category contracts
detector/                                 Optional deterministic surface scanner
evaluation/                               Public fixtures and aggregate results
tests/                                    Package and genre-gate tests
scripts/                                  Build, benchmark, deploy, and rollback tools
```

## Optional deterministic detector

The Cursor skill does not require the detector.

`detector/patterns.js` is available for CI, websites, or scripts that need deterministic
surface-pattern checks:

```js
const AIDetector = require("./detector/patterns.js");
const result = AIDetector.analyzeText("Your text here...");
console.log(result.pattern_load, result.issues);
```

The detector reports configured pattern load, not authorship probability.

## Build and test

Repository development requires Node 18+, Bash, and Python 3. The installed Cursor skill
has no runtime dependencies.

```bash
npm run build
npm test
npm run test:deploy
```

`npm run build` regenerates both files in `dist/`.

The tests cover:

- detector behavior and category mapping;
- the public skill contract;
- reference links;
- generated distribution freshness;
- genre protection and structural-depth gates;
- version synchronization;
- deployment, interruption recovery, and exact rollback.

## Performance

Against v3.8:

- default runtime payload: 28.3% smaller;
- explicit structural total: 9.6% smaller;
- detector microbenchmark: no measurable regression.

To refresh the benchmark against a v3.8 checkout:

```bash
AVOID_AI_BASELINE_ROOT=/path/to/avoid-ai-writing-v3.8 npm run benchmark:performance
```

Model/provider load, document length, and requested output length still affect end-to-end
latency.

## Research boundary

The structural audit was informed by:

- Russell et al., ["StoryScope: Investigating idiosyncrasies in AI
  fiction"](https://arxiv.org/abs/2604.03136), arXiv:2604.03136v4, 2026,
  preprint under review.

StoryScope studies long English fiction in a constructed parallel corpus. Its findings
motivate optional craft questions; they do not validate authorship judgments, universal
writing rules, short-text detection, or unseen-model detection.

## Credits

Maintained by [David Cogan](https://github.com/davidcogan). Derived from
[Conor Bronsdon's original project](https://github.com/conorbronsdon/avoid-ai-writing)
under the MIT License.

## License

MIT
