# Detector engine

`patterns.js` is the executable expression of this skill's pattern rules — a
zero-dependency, build-step-free detection engine that scores text for
AI-writing tells. It runs identically in Node (`>=18`) and in the browser.

The score measures the configured surface-pattern load. It is not an
authorship probability and must not be used as the sole basis for academic,
employment, publication, or attribution decisions. The legacy
`document_classification` field remains for API compatibility.

The skill's `SKILL.md` is the human-readable catalog of rules; this engine is
the deterministic, testable implementation of the regex-detectable subset, plus
stylometric and AI-tool-fingerprint detectors that don't make sense as prose.
See [`CATEGORIES.md`](./CATEGORIES.md) for the rule ↔ category mapping that keeps
the two in sync.

## Run it

```bash
npm test          # runs detector/patterns.test.js (no deps to install)
# or directly:
node detector/patterns.test.js
```

```js
const AIDetector = require("./detector/patterns.js");
const result = AIDetector.analyzeText("Your text here…");
console.log(result.score, result.label, result.issues.length);
```

In the browser, load `patterns.js` as a plain script — it self-registers as a
global `AIDetector` (the `module.exports` block is guarded and only runs under
CommonJS).

## `analyzeText(text, options?)` → result

| Field | Type | Meaning |
|---|---|---|
| `score` | `0–100` | Configured surface-pattern load |
| `pattern_load` | string | `LOW` / `MIXED` / `HIGH` / `UNSCORED` |
| `pattern_load_weights` | `{low, mixed, high}` | Heuristic load weights; not authorship probabilities |
| `authorship_assessment` | `null` | Deliberately unavailable |
| `classification_basis` | string | Always `heuristic_surface_pattern_load` |
| `classification_warning` | string | Explicit non-authorship warning |
| `issues[]` | `{type, text, severity, …}` | one entry per detected pattern; `type` keys map to [`CATEGORIES.md`](./CATEGORIES.md) |
| `stats` | object | `wordCount`, per-tier counts, `contextMode`, `denseAIVocab`, normalization flags, etc. |
| `highlight_sentence_for_patterns` | region[] | sentence spans carrying configured pattern hits |
| `confidence_category` | `low` / `medium` / `high` | |
| `document_classification` | string | **Deprecated v2 alias.** Legacy `HUMAN_ONLY` / `MIXED` / `AI_ONLY` labels |
| `class_probabilities` | `{human, mixed, ai}` | **Deprecated v2 alias.** Uncalibrated soft weights |
| `highlight_sentence_for_ai` | region[] | **Deprecated v2 alias** for pattern regions |

The deprecated v2 fields remain to avoid breaking existing integrations. Their names are
historical and must not be presented as authorship probabilities or verdicts. New
integrations should use `pattern_load`, `pattern_load_weights`, and
`highlight_sentence_for_patterns`.

`options.contextMode` accepts `general` (default), `technical`, `marketing`, or
`personal`. Technical mode suppresses flags that are legitimate in code-adjacent prose
(for example, Title Case headers). Invalid modes fall back to `general` and set
`stats.contextModeFallback`. The detector's four coarse modes are separate from the
skill's richer editorial profiles.

## Design notes

- **FN-biased.** False positives damage trust more than false negatives, so
  `MIXED` is wide and `AI_ONLY` requires multiple corroborating signals.
- **Scoring is non-linear.** Repeated hits of the same phrase are deduplicated;
  category weights live in the `ISSUE_WEIGHTS` table.
- **Length gates.** Under ~10 words → `Too short` (unscorable); over 10k words →
  `Text too long`.
