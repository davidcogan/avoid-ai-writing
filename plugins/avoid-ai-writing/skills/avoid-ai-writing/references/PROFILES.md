# Context and voice profiles

Context controls which editorial rules fit the format. Voice controls how the prose should
sound. Apply them in this order:

1. preservation and factual-integrity constraints;
2. explicit user instructions and a supplied author sample;
3. context profile;
4. voice profile;
5. generic catalog defaults.

Do not resolve conflicts by automatically choosing the strictest rule. Preserve an
intentional, functional choice and report a judgment call when the evidence is mixed.

## Context profiles

### `linkedin`

Short social writing. Fragments, spacing, one rhetorical hook, limited emoji, direct address,
and compact lists may be functional. Audit unsupported claims, canned mini-arcs, generic
future predictions, hashtag blocks, moralizing closers, and promotional boilerplate.

### `blog`

Default long-form prose. Run the full surface catalog. Run the structural audit when the
user explicitly requests it or selects `--depth structural`. Under default surface depth,
offer a separate structural pass when local edits appear insufficient. Preserve deliberate
voice and genre conventions.

### `technical-blog`

Technical explanation with code, architecture, APIs, or operational detail. Preserve exact
terms, code identifiers, diagrams, lists, headings, and calibrated uncertainty. Terms such as
`robust`, `comprehensive`, `seamless`, `ecosystem`, `leverage`, `facilitate`, `underpin`,
and `streamline` may have legitimate technical meanings. Preserve them when nearby details
define the property or scope; do not delete them solely because they appear in the catalog.
Still review generic uses of
`delve`, `tapestry`, `beacon`, `embark`, `testament to`, `game-changer`, and `harness`.

### `investor-email`

High-trust, high-specificity communication. Front-load the point and ask. Audit promotional
inflation, unsupported forecasts, vague market claims, hidden assumptions, and generic
conclusions. Preserve warranted risk language, financial ranges, and model-dependent
uncertainty.

### `docs`

Documentation, READMEs, runbooks, guides, and references. Clarity and retrieval beat
literary voice. Preserve stable terminology, modular sections, repeated terms, headings,
tables, bullets, imperatives, examples, prerequisites, and explicit summaries. Audit
unsupported promises, missing failure modes, vague instructions, and publishing artifacts.
Preserve a qualitative technical description such as `robust` or `comprehensive` when the
same passage substantiates it with concrete behavior or complete scope. Remove it only when
it remains an unsupported promise after reading those details.
Skip structural novelty, paragraph-reshuffle, and rhythm optimization.

### `casual`

Slack messages, internal notes, and quick replies. Catch P0 failures, dense boilerplate, and
obvious chatbot residue. Preserve warmth, shorthand, fragments, repetition, and the
writer's punctuation.

### `email`

General internal or external email. Preserve salutations, genuine pleasantries, direct asks,
polite hedges, scan-friendly bullets, and signoffs. Remove dense boilerplate, repeated
throat-clearing, unsupported claims, and model-interface signoffs. Keep the message short.
When tightening an ask, preserve the source's natural request form (`Do you have...`,
`Would you...`) instead of replacing it with a more transactional construction.
Caller-supplied house rules for punctuation, vocabulary, formatting, and signoffs override
the generic email defaults.

### `slides`

Headlines, body copy, and speaker-facing presentation text. Preserve fragments, parallel
bullets, bold hierarchy, title conventions, source lines, and tight space budgets. Audit
hype, vendor-as-hero claims, unsupported numbers, repetitive punchlines, and generic
so-what statements. Do not turn slide copy into paragraphs.

### `research`

Academic, scientific, policy, and analytical writing. Preserve epistemic hedging, scope,
passive voice where appropriate, IMRaD structure, citations, statistical language,
limitations, and exact terminology. Audit causal overreach, unsupported specificity, citation
misalignment, redundant interpretation, and claims that outrun the evidence. Never add
personal opinion or artificial "balance."

### `fiction`

Creative fiction and sustained narrative. Surface patterns are craft judgments, not defects
by default. Read and run the structural audit only when the user requests it or selects
`--depth structural`. Report StoryScope-informed observations as genre-specific hypotheses.
Do not alter point of view, chronology, plot, character agency, theme, or ending without
consent.

### `narrative-nonfiction`

Memoir, history, profiles, case studies, and narrative journalism. Use the structural audit
advisorially only when the user requests it or selects `--depth structural`. Preserve factual
chronology, sourcing, quotations, and the distinction between documented events and
interpretation. Do not manufacture suspense, dialogue, ambiguity, or recontextualization.

## Tolerance matrix

`strict` means fix a clear instance unless the writer intentionally chose it. `review` means
use context and clusters. `relaxed` means flag only when it causes a clear reader problem.
`skip` means the category is normally irrelevant.

| Rule family | linkedin | blog | technical-blog | investor-email | docs | casual | email | slides | research |
|---|---|---|---|---|---|---|---|---|---|
| Em-dash density | review | strict | review | strict | relaxed | skip | strict | review | review |
| Decorative bold/emoji | relaxed | strict | review | strict | relaxed | skip | strict | relaxed | strict |
| Lists and headings | relaxed | review | relaxed | review | skip | skip | relaxed | skip | relaxed |
| Empty hedge stacks | strict | strict | review | strict | review | relaxed | strict | strict | review |
| Warranted uncertainty | preserve | preserve | preserve | preserve | preserve | preserve | preserve | preserve | preserve |
| Vocabulary catalog | strict | strict | partial | strict | review | P0/P1 | strict | review | review |
| Promotional language | review | strict | strict | strict | strict | relaxed | strict | strict | strict |
| Significance inflation | strict | strict | strict | strict | review | relaxed | strict | strict | strict |
| Copula avoidance | review | strict | review | strict | relaxed | skip | review | review | review |
| Rhythm uniformity | skip | review | review | review | skip | skip | skip | skip | relaxed |
| Rhetorical hooks | relaxed | review | review | strict | review | skip | strict | review | strict |
| Generic conclusions | review | strict | strict | strict | relaxed | skip | strict | strict | strict |
| Hashtag blocks | strict | review | review | strict | skip | skip | skip | skip | skip |
| Bare noun bullets | review | review | relaxed | review | relaxed | skip | review | skip | relaxed |
| Global structural audit | skip | conditional | conditional | skip | skip | skip | skip | skip | conditional |

The matrix is a starting point, not a scoring formula.

## Auto-detection cues

Use explicit user context when supplied. Otherwise:

| Signal | Profile |
|---|---|
| hashtags, mentions, and short public post | `linkedin` |
| code blocks, API names, architecture, operational detail | `technical-blog` or `docs` |
| salutation, signoff, mail-style update, or recipient-specific ask | `email` |
| fundraising, market, or investor language in email | `investor-email` |
| short title/body fragments or slide source lines | `slides` |
| methods, results, citations, confidence intervals | `research` |
| characters, scenes, narration, dialogue, sustained plot | `fiction` |
| documented people/events shaped as a narrative | `narrative-nonfiction` |
| quick internal message | `casual` |
| no strong signal | `blog` |

If detection is uncertain, state the selected profile and why. Do not infer a writer's
language background or identity from prose.

## Voice profiles

Voice is optional. If the writer does not name one, preserve the source register.

### `casual`

Use contractions and ordinary vocabulary when they already fit. Fragments are allowed.
Preserve warmth and personal shorthand. Do not force anecdotes, slang, or first person.

### `professional`

Lead with the claim or action. Prefer active voice when it improves clarity. Use concrete
support when supplied. Make the ask explicit. Preserve formal terminology and warranted
qualification.

### `technical`

Prefer plain syntax and stable terms. Use imperative mood for instructions. Define jargon on
first use when the audience needs it. Preserve tables and lists that match the information.

### `warm`

Address the reader directly when appropriate. Preserve genuine pleasantries. Prefer specific
acknowledgment over performative empathy. Do not insert emotional language that the writer
did not express.

### `blunt`

Lead with the conclusion. Cut windups and padding. Prefer short declaratives, with longer
sentences where the reasoning needs them. Preserve legal, scientific, and operational
qualification.

## Author-sample calibration

When the writer supplies a sample:

- match its register, recurring words, contraction style, paragraph openings, punctuation,
  and sentence movement;
- preserve its deliberate repetition and terminology;
- do not "upgrade" vocabulary;
- do not copy facts, personal details, or topic-specific language from the sample into an
  unrelated piece;
- let the sample override generic rhythm and punctuation preferences unless doing so would
  create a factual, legal, or accessibility problem.
