<div align="center">

# avoid-ai-writing

Audit and rewrite prose to remove AI-writing patterns while preserving facts, intent,
voice, and genre conventions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

`avoid-ai-writing` is a portable Agent Skill for editing prose. It catches publishing
artifacts, boilerplate, unsupported claims, inflated language, repetitive rhetorical shapes,
and context-inappropriate structure. Version 4 adds an optional document-level audit for
problems that word replacement cannot fix.

This is a writing-quality tool, not an authorship detector or a way to prove that text is
human.

This v4 distribution is maintained by [David Cogan](https://github.com/davidcogan) and is
derived from [Conor Bronsdon's original project](https://github.com/conorbronsdon/avoid-ai-writing)
under the MIT License.

## Modes

- **Rewrite** (default): identifies in-scope issues, returns a revised version, summarizes
  changes, and runs a corrective second pass.
- **Detect**: reports issues and judgment calls without rewriting.
- **Edit**: makes minimal, targeted changes to a named file and verifies the result.

Existing invocations remain valid:

```text
Remove AI-isms from this post.
Audit this draft for AI tells.
Make this sound less like AI.
Edit post.md in place.
Scan this, but do not rewrite it.
```

Version 4 also supports:

```text
Run a deep structural audit before rewriting.
--depth surface|structural
```

Global restructuring requires explicit approval. A normal rewrite may improve wording and
local clarity, but it does not silently reorder sections, change chronology, alter a thesis,
or add/remove evidence.

## What version 4 changes

### Preservation comes first

The skill now verifies facts, numbers, dates, links, quotations, citations, technical
identifiers, negation, modality, uncertainty, and scope. It does not invent a source,
example, number, causal explanation, or personal experience to make prose sound human.

### Structural audit

For sustained arguments and narratives, the optional structural pass builds a content-only
outline and checks:

- repeated explanation of the same implication;
- causal stories cleaner than the evidence supports;
- empty hedging versus material uncertainty;
- later evidence that should recontextualize an earlier claim;
- conclusions that resolve more than the evidence permits;
- stacked bodily, sensory, and environmental cues;
- missing external anchors;
- whether the writing models a real reader need;
- repeated argument templates across a batch.

The full method and its limits are in
[`references/STRUCTURAL-AUDIT.md`](./references/STRUCTURAL-AUDIT.md).

### Genre protections

The skill preserves the useful conventions of docs, research, email, slides, social posts,
technical writing, fiction, and narrative nonfiction. Linearity, headings, lists,
repetition, fragments, explicit summaries, and hedging are not defects when the format
needs them.

### Calibrated surface rules

The catalog retains **47 surface pattern categories** and the deterministic 43-type
detector. Vocabulary tiers, punctuation counts, list lengths, and similar cutoffs are now
described as review heuristics rather than universal scientific boundaries.

See:

- [`references/PATTERN-CATALOG.md`](./references/PATTERN-CATALOG.md)
- [`references/PROFILES.md`](./references/PROFILES.md)
- [`detector/CATEGORIES.md`](./detector/CATEGORIES.md)

## Quick example

**Input**

> Certainly! Acme Analytics, a vibrant startup nestled in the heart of Boulder's thriving
> tech ecosystem, has secured $40M in Series B funding - marking a watershed moment for
> the observability landscape. The platform serves as a unified hub, featuring real-time
> dashboards, boasting sub-second queries, and presenting a seamless integration layer.
> Moreover, experts believe Acme is poised to disrupt the market. In conclusion, the
> future looks bright!

**Output**

> Acme Analytics raised a $40M Series B. The Boulder company makes a platform with
> real-time dashboards, query times under one second, and an integration layer.

The rewrite removes chatbot residue, promotional description, significance inflation,
inflated verbs, vague attribution, and a generic conclusion. It does not invent the round's
investors, customer count, benchmarks, or use of funds.

## Installation

### Claude Code, Codex, Hermes, and compatible Agent Skill hosts

For a single-file installation, download the generated standalone distribution and save it
as `SKILL.md`:

```bash
mkdir -p ~/.claude/skills/avoid-ai-writing
curl -L \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/HEAD/dist/avoid-ai-writing-standalone.md \
  -o ~/.claude/skills/avoid-ai-writing/SKILL.md
```

Use the equivalent skills directory for your host. The standalone distribution contains the
main instructions plus all reference modules.

Do not clone the full source repository into a recursively scanned skills directory. The
source includes a generated Claude plugin copy of the skill, so recursive discovery can
show the same skill twice.

### Claude Code or Cowork plugin

```text
/plugin marketplace add davidcogan/avoid-ai-writing
/plugin install avoid-ai-writing@davidcogan-skills
/reload-plugins
```

The plugin bundle contains `SKILL.md` and the reference modules.

### Cursor rule

```bash
mkdir -p .cursor/rules
curl -L \
  https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/HEAD/cursor-rules/avoid-ai-writing.mdc \
  -o .cursor/rules/avoid-ai-writing.mdc
```

The Cursor rule is a generated, flattened distribution. It activates for Markdown and other
prose-heavy text formats.

## Public compatibility contract

Version 4 preserves:

- the `avoid-ai-writing` skill name;
- `rewrite`, `detect`, and `edit` modes;
- existing trigger phrases and flags;
- the original six contexts and five voices;
- the four rewrite output headings;
- the two detect output headings;
- the two edit output headings;
- protected treatment of quotations, code, attributed material, and examples.

The machine-readable contract lives in
[`contracts/public-contract.json`](./contracts/public-contract.json).

## Repository layout

```text
SKILL.md                                  Core router and public contract
references/PATTERN-CATALOG.md             Surface catalog and severities
references/PROFILES.md                    Context and voice profiles
references/STRUCTURAL-AUDIT.md            Permissioned document-level audit
detector/                                 Deterministic surface detector
contracts/                                Public and category contracts
tests/                                    Package and genre-gate fixtures
dist/avoid-ai-writing-runtime.md           Fast surface runtime + structural reference link
dist/avoid-ai-writing-standalone.md        Generated single-file skill
cursor-rules/avoid-ai-writing.mdc          Generated flattened Cursor rule
plugins/avoid-ai-writing/                  Generated Claude plugin bundle
```

## Run the detector

The zero-dependency detector runs in Node 18+ and browsers:

```bash
npm test
```

```js
const AIDetector = require("./detector/patterns.js");
const result = AIDetector.analyzeText("Your text here...");
console.log(result.score, result.label, result.issues);
```

The detector covers regex and stylometric surface signals. Document-level structural checks
remain LLM judgment because a regex cannot assess evidence, causality, reader needs, or
genre fitness.

## Build and validate distributions

```bash
npm run build
npm test
npm run test:deploy
```

`npm run build`:

1. generates the optimized user-level runtime;
2. generates the standalone skill;
3. generates the flattened Cursor rule;
4. synchronizes the modular Claude plugin bundle.

The tests verify detector behavior, category mapping, the public contract, reference links,
plugin parity, generated distributions, metadata versions, genre-gate coverage, and the
absence of damaged replacement characters.

The runtime skill has no dependencies. Repository development requires Node 18+, Bash,
and Python 3 for packaging and deployment checks.

## Performance

The optimized user-level runtime embeds the surface catalog and profiles in one
`SKILL.md`, so default rewrites do not require reference-file reads. The structural module
stays separate and loads only after an explicit structural request.

Against the current v3.8 installation:

- default surface payload: 42,197 vs. 58,508 bytes (27.9% smaller);
- explicit structural total: 53,131 bytes (9.2% smaller);
- detector microbenchmark: no measurable regression across seven 1,000-scan rounds.

Run the benchmark against a v3.8 checkout:

```bash
AVOID_AI_BASELINE_ROOT=/path/to/avoid-ai-writing-v3.8 npm run benchmark:performance
```

Model and provider latency still varies independently of the local skill payload.

## Research boundary

The structural module was informed by:

- Russell et al., ["StoryScope: Investigating idiosyncrasies in AI
  fiction"](https://arxiv.org/abs/2604.03136), arXiv:2604.03136v4, 2026,
  preprint under review.

StoryScope studies long English fiction in a constructed parallel corpus. Its findings
motivate optional craft questions. They do not validate authorship judgments, prescriptive
rewrites for other genres, short-text detection, or unseen-model detection.

Additional pattern research is credited in the changelog and category documentation.

## Credits

Original project by [Conor Bronsdon](https://github.com/conorbronsdon).

## License

MIT
