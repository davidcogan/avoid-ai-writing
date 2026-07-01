---
name: avoid-ai-writing
description: Cursor Agent Skill that audits and rewrites content to remove AI writing patterns ("AI-isms") while preserving facts, intent, voice, and genre conventions. Use when asked to remove AI-isms, clean up AI writing, audit writing for AI tells, make text sound less like AI, or perform a deeper structural writing audit. Supports detect-only, rewrite, and edit-in-place modes; context and voice profiles; and an optional permissioned structural pass.
version: 4.0.1
license: MIT
metadata:
  author: Conor Bronsdon
  tags: writing editing voice quality
---

# Avoid AI Writing

Edit writing for clarity, specificity, credibility, and a natural voice. Treat AI-associated
patterns as editorial signals, never as proof of authorship.

## Safety and preservation contract

Apply these rules before any pattern rule:

1. **Explain reader harm, not presumed provenance.** Flag a pattern only when it weakens
   this genre, audience, format, or stated intent. If the only objection is "AI uses this,"
   leave it as a judgment call.
2. **Preserve meaning and evidence.** Do not add or invent facts, names, numbers, dates,
   quotations, citations, examples, causal explanations, or personal experiences.
3. **Preserve claim boundaries.** Keep negation, modality, uncertainty, scope, units,
   proper nouns, technical identifiers, and claim-to-citation links intact.
4. **Protect attributed material.** Do not rewrite quotations, code blocks, transcripts,
   cited examples, legal text, attributed text, or material explicitly assigned to someone
   else. Flag problems outside the protected span or report them without editing.
5. **Do not manufacture humanity.** Never add errors, slang, anecdotes, first person,
   irregularity, ambiguity, or structural complexity merely to imitate a human or evade a
   detector.
6. **Ask when evidence is missing.** If a safe fix needs a source or author decision that
   was not supplied, leave the passage unchanged and report `source or author input needed`.

Human writers, including second-language writers, can use every pattern in this catalog.
Commercial and open-source AI detectors have substantial, context-dependent error rates.
Use this skill as a writing-quality tool, not for academic-integrity, hiring, publication,
or attribution verdicts.

## Modes

The public modes and defaults remain:

- **`rewrite`** (default): identify in-scope issues, rewrite the text, summarize meaningful
  changes, and run a corrective second pass.
- **`detect`**: identify issues without rewriting. Separate clear editorial problems from
  judgment calls.
- **`edit`**: edit a named file in place with minimal, targeted changes. Preserve passages
  that already work, then re-read the file and verify the result. For a large file, confirm
  the section or scope before editing unless the user clearly requested the entire file.

Natural language is enough:

- "Remove AI-isms from this post."
- "Rewrite this in a blunt voice for LinkedIn."
- "Edit `post.md` in place."
- "Scan this, but do not rewrite it."
- "Run a deep structural audit before rewriting."

Power-user options:

```text
--mode rewrite|detect|edit
--voice casual|professional|technical|warm|blunt
--context linkedin|blog|technical-blog|investor-email|docs|casual|email|slides|research|fiction|narrative-nonfiction
--depth surface|structural
--file PATH
--iterate N
```

`--depth surface` is the compatibility default. `--depth structural` authorizes analysis
of document-level organization but not silent global restructuring.

`--iterate N` is capped at 2 for compatibility. The built-in corrective pass counts as the
second pass. Report `converged in 2 passes` only when no remaining **in-scope** issue is
found; do not imply that the text is proven human or undetectable.

Mode triggers:

- Use `detect` for "detect," "flag only," "audit only," "just flag," "scan," or equivalent.
- Use `edit` when the writer names a file and asks for in-place cleanup.
- Otherwise use `rewrite`.

## Required references

Read the linked files directly from this skill package:

1. **Always read [PATTERN-CATALOG.md](#pattern-catalog)** before auditing.
   It contains the complete surface-pattern catalog, vocabulary tables, severities, and
   carve-outs.
2. **Read [PROFILES.md](#context-and-voice-profiles)** when selecting or applying a context,
   voice, or author-sample profile.
3. **Read [STRUCTURAL-AUDIT.md](#structural-audit)** only when the user
   requests a deep or structural pass or selects `--depth structural`.

Do not infer rules from a file name alone. Read the applicable reference before acting.

## Audit workflow

### 1. Establish the editing contract

Identify:

- mode;
- context profile;
- voice profile or author sample;
- edit depth;
- protected spans;
- facts, claims, citations, formatting, and technical tokens that must survive unchanged.

If auto-detection is uncertain, state the profile used and why. An explicit user choice or
writing sample overrides generic style advice.

Keep profile and process metadata out of the final response unless it explains a material
decision, the user requested it, or the structural audit ran. Do not narrate an obvious skip.

### 2. Run the integrity pass

Fix or report credibility problems first:

- leaked chatbot or reasoning artifacts;
- unfilled publishing placeholders;
- unsupported attribution or speculative gap-filling;
- broken or leaked citation markup;
- factual overstatement;
- claims whose cited source is absent or does not support them.

Removing an attribution does not license asserting the underlying claim as fact.

### 3. Respect the depth boundary

Run the structural reference only when the user explicitly requests a deep/structural audit
or selects `--depth structural`.

Under the default `surface` depth, do not perform or report a structural audit. If local
edits appear insufficient for a sustained argument or narrative, finish the authorized
surface pass and briefly offer a structural audit as a separate next step.

Even when requested, the full structural pass is normally unnecessary for short copy,
ordinary email, slides, reference documentation, parameter lists, and modular content.
These formats often need linearity, repetition, fragments, headings, and lists.

### 4. Run the surface pass

Apply the pattern catalog using the selected profile. Prefer cluster and context evidence
over single-word judgments. Keep the clearest word when it is accurate, even when the
catalog lists it as commonly overused.

### 5. Choose patch or rewrite

- **Patch** when issues are local and the argument, narrative, evidence, and order work.
- **Rewrite wording** when local patterns are dense but the underlying structure works.
- **Propose structural revision** when document-level problems remain.

A request to rewrite authorizes wording-level and local clarity edits. Before reordering
sections, paragraphs, or scenes; changing chronology, point of view, thesis, emphasis,
ending, or resolution; or adding/removing claims, evidence, examples, or subplots, say:

> This would change the document's structure, not just its phrasing. Should I apply these changes?

`detect` mode may report structural issues without asking. `edit` mode must not make global
structural changes without explicit approval.

### 6. Verify

Compare the result with the source:

- facts, numbers, dates, names, links, units, quotations, citations, code, and identifiers;
- negation, uncertainty, scope, and causality;
- requested format and profile;
- protected spans;
- remaining in-scope issues.

Distinguish surface edits, local structural edits, and proposed but unperformed global
revisions. Report the verification result once; do not repeat a full preservation checklist
unless the user requests one or a high-risk fact changed.

## Severity

Use severity for editorial risk, not certainty of AI authorship:

- **P0 - credibility or publishing failure:** fabricated/unsupported claims, leaked tool
  artifacts, broken citations, unresolved placeholders, or material meaning corruption.
- **P1 - clear reader-facing problem:** repeated boilerplate, misleading significance,
  unsupported causal certainty, generic attribution, or dense pattern clusters.
- **P2 - contextual polish:** punctuation preferences, cadence, formatting, isolated
  vocabulary, and other judgment calls.

For quick passes, prioritize P0 and P1. A full audit includes P2 without forcing edits.

## Output format

Keep these headings and their order for compatibility.

### Rewrite mode

**1. Issues found**

List observed in-scope issues with quoted text. Group P0/P1/P2 when useful. State the
context, voice, or depth only when it materially affected the result. Separate clear
problems from judgment calls.

**2. Rewritten version**

Return the full rewritten content. Preserve the source's intent, facts, citations, technical
details, and functional structure. Do not apply unapproved global structural changes.

**3. What changed**

Summarize meaningful edits. Distinguish surface edits, local structural edits, protected
material left unchanged, and any global revisions awaiting consent. Keep this concise; do
not restate the issue list.

**4. Second-pass audit**

Re-read the rewritten version. Fix remaining in-scope issues that can be corrected without
breaking the preservation contract. Verify factual and structural preservation. If none
remain, say `No remaining in-scope issues found`. Add detail only for a failed or
high-risk verification. If this pass changes the rewrite, include the complete corrected
text in this section under `Final corrected version`; that version is authoritative.

### Detect mode

**1. Issues found**

List observed issues with quoted text, grouped by P0/P1/P2.

**2. Assessment**

Explain which flags are clear reader-facing problems, which are judgment calls, which are
intentional or genre-functional, and which need a source or author decision. Do not rewrite.

### Edit mode

**1. Edits made**

List each targeted change with its file location and `before -> after`. Do not reproduce the
whole file.

**2. Verification**

Confirm the file was re-read. Report preserved facts and protected spans, remaining
judgment calls, and any structural revision awaiting consent.

## Tone calibration

Aim for writing that is direct, specific, and appropriate to its purpose:

1. Prefer concrete claims over vague evaluation.
2. Vary rhythm only when it improves the voice; do not engineer burstiness.
3. Repeat the right term when precision matters.
4. Preserve warranted uncertainty and neutral reporting.
5. Let evidence carry emphasis.
6. If the original is strong, make few or no edits.

Replacement suggestions are defaults, not mandates. Context, evidence, and the writer's
own sample take precedence.

## Self-reference escape hatch

When writing about AI-writing patterns, quoted examples, code blocks, detector fixtures,
and explicitly marked illustrations are exempt. Audit the author's surrounding prose, not
the intentionally bad examples.


---

# Pattern catalog

Use this catalog for the surface pass. These are editing heuristics, not authorship tests.
Flag a pattern when it creates a reader-facing problem in the selected profile. Preserve an
accurate term or effective device when it is clearly the right choice.

## How to apply the catalog

- Prefer several corroborating signals over a single word or punctuation mark.
- Treat numeric cutoffs as review triggers, not scientific boundaries.
- Do not replace a precise term with a less accurate synonym.
- Do not strip uncertainty, legal qualification, technical vocabulary, or deliberate voice.
- Do not rewrite protected quotations, code, examples, or attributed material.
- Do not insert a fact, citation, number, or anecdote to make prose seem more human.

## Formatting

- **Em dashes (`—`) and double hyphens (`--`)**: In strict profiles, rewrite them with
  commas, periods, parentheses, or separate sentences. In relaxed profiles, flag only dense
  or repetitive use. Never treat CLI flags such as `--save-dev` as punctuation.
- **Bold overuse**: Remove decorative emphasis and repeated bold fragments. Keep bold where
  it supports scanning, accessibility, slide hierarchy, or documentation structure.
- **Emoji headers**: Remove from formal prose. Social writing may use one or two when they
  fit the writer's voice.
- **Excessive bullets**: Convert decorative lists to prose. Preserve genuine lists:
  procedures, options, parameters, checklists, ingredients, changelogs, and slide copy.
- **Curly punctuation**: Curly quotes and apostrophes are normal in publishing software.
  Treat them only as weak corroboration in a plain-text context that otherwise uses ASCII.
  Never flag a curly apostrophe alone. Preserve locale-correct punctuation.

## Sentence-level shapes

- **Negative parallelism**: Review "It's not X, it's Y" and "This isn't about X; it's
  about Y." Rewrite generic or repeated versions as direct claims. Keep a contrast that
  carries real information.
- **Hollow intensifiers**: Cut empty uses of `genuine`, `real`, `actual`, `true`, `truly`,
  `quite frankly`, `to be honest`, `let's be clear`, and `it's worth noting that`.
- **Vague endorsement**: Replace `worth reading`, `worth paying attention to`,
  `worth a look`, `worth exploring`, `worth checking out`, and `worth your time` with the
  specific reason, or cut them.
- **Empty hedging**: Reduce stacks such as `could potentially` or `may eventually`.
  Preserve modality that changes the claim's truth, uncertainty, or legal scope.
- **Missing dependency**: In an argument or procedure, add a bridge when the next paragraph
  depends on an unstated premise. Modular docs and independent list items need not form one
  continuous argument.
- **Compulsive triads**: Rewrite repeated groups of three when they feel padded or
  symmetrical. Do not change a genuine three-item set.

## Vocabulary tiers

The tiers set review priority. They do not prove origin, and the labels are not frequency
claims.

### Tier 1: review every instance

Replace unless the term is exact, conventional for the domain, quoted, or part of the
writer's established voice.

| Review | Prefer |
|---|---|
| delve / delve into | explore, examine, look at |
| landscape (metaphor) | field, industry, market, setting |
| tapestry | name the actual combination or complexity |
| realm | area, field, domain |
| paradigm | model, approach, framework |
| embark | start, begin |
| beacon | state the concrete role |
| testament to | shows, demonstrates |
| robust | strong, reliable, fault-tolerant, or the exact technical property |
| comprehensive | complete, thorough, or name what is included |
| cutting-edge | latest, advanced, or name the capability |
| leverage (verb) | use |
| pivotal | important, critical, or state the consequence |
| underscores | shows, highlights |
| meticulous / meticulously | careful, detailed, precise |
| seamless / seamlessly | smooth, easy, or describe the missing friction |
| game-changer / game-changing | state what changed and for whom |
| hit differently / hits different | describe the reaction or cut |
| utilize | use |
| watershed moment | turning point, shift, or state what changed |
| marking a pivotal moment | state what happened |
| the future looks bright | replace with a specific outlook or cut |
| only time will tell | replace with a testable uncertainty or cut |
| nestled | is in, sits in |
| vibrant | describe the activity |
| thriving | cite the growth or activity |
| despite challenges ... continues to thrive | name the challenge and response |
| showcasing | showing, demonstrating, or cut the clause |
| deep dive / dive into | examine, review, look at |
| unpack / unpacking | explain, break down |
| bustling | busy, active, or cite what is happening |
| intricate / intricacies | name the relevant complexity |
| complexities | name the problems or details |
| ever-evolving | describe how it is changing |
| enduring | lasting, long-running, or cite the duration |
| daunting | difficult, costly, or name the obstacle |
| holistic / holistically | name what is included |
| actionable | practical, concrete, or state the action |
| impactful | state the impact |
| learnings | lessons, findings |
| thought leader / thought leadership | describe the person's contribution |
| best practices | standard approach, proven method, or name the practice |
| at its core | state the claim directly |
| synergy / synergies | describe the combined effect |
| interplay | relationship, interaction |
| in order to | to |
| due to the fact that | because |
| serves as | is, acts as |
| features (inflated verb) | has, includes |
| boasts | has |
| presents (inflated) | is, shows, gives |
| commence | start, begin |
| ascertain | determine, find out |
| endeavor | effort, attempt |
| keen (empty intensifier) | interested, eager, or cut |
| symphony (metaphor) | describe the coordination |
| embrace (metaphor) | adopt, accept, use |

### Tier 2: review in clusters

One instance may be natural. Review a paragraph when several appear or when they replace
plain, accurate verbs.

| Review | Prefer |
|---|---|
| harness | use, take advantage of |
| navigate / navigating | handle, work through |
| foster | support, encourage, build |
| elevate | improve, raise |
| unleash | release, enable |
| streamline | simplify, speed up |
| empower | enable, allow |
| bolster | strengthen, support |
| spearhead | lead, run |
| resonate / resonates with | connect with, matter to |
| revolutionize | describe the change |
| facilitate / facilitates | enable, help, run |
| underpin | support, form the basis of |
| nuanced | name the nuance |
| crucial | important, necessary |
| multifaceted | name the facets |
| ecosystem (metaphor) | system, network, community, market |
| myriad | many, or give the number |
| plethora | many, or give the number |
| encompass | include, cover |
| catalyze | start, trigger, accelerate |
| reimagine | rethink, redesign |
| galvanize | motivate, rally |
| augment | add to, expand |
| cultivate | build, develop |
| illuminate | explain, show |
| elucidate | explain, clarify |
| juxtapose | compare, contrast |
| paradigm-shifting | state what shifted |
| transformative / transformation | state what changed |
| cornerstone | foundation, key part |
| paramount | most important |
| poised to | ready to, expected to, or state the evidence |
| burgeoning | growing, emerging, or cite growth |
| nascent | new, early-stage |
| quintessential | typical, defining |
| overarching | main, broad |
| underpinning / underpinnings | basis, support |

### Tier 3: review only at high density

These are ordinary words. Flag repeated vague evaluation, not isolated use.

| Word or phrase | Ask for |
|---|---|
| significant / significantly | a number, comparison, or specific consequence |
| innovative / innovation | what is actually new |
| effective / effectively | how it works or a metric |
| dynamic / dynamics | the named forces or changes |
| scalable / scalability | what scales, to what level, under which constraint |
| compelling | the reason it persuades |
| unprecedented | the precedent it exceeds |
| exceptional / exceptionally | the comparison that makes it exceptional |
| remarkable / remarkably | what is worth remarking on |
| sophisticated | the mechanism or capability |
| instrumental | the role it played |
| world-class / state-of-the-art / best-in-class | a benchmark or comparison |

### Boilerplate phrase clusters

Review repetition of the same phrase or several distinct phrases in one piece:

- `emerging sector`, `emerging space`, `emerging category`;
- `the integration of X with Y`;
- `the intersection of X and Y`;
- `community-driven`;
- `long-term sustainability`;
- `user engagement`;
- `decentralized compute`;
- `sustainable reward emissions`;
- `tokenized incentive structures`;
- `designed for long-term X`.

Replace the wrapper with the actual mechanism, action, time horizon, or user behavior.
Preserve a phrase when it is a recognized technical category and necessary for accuracy.

## Template and transition phrases

### Slot-fill templates

- `a [adjective] step toward [adjective] infrastructure`;
- `a [adjective] step forward for [noun]`;
- `Whether you're X or Y`;
- `I recently had the pleasure of [verb]-ing`.

State the capability, audience, or event directly.

### Mechanical transitions

Review:

- `Moreover`, `Furthermore`, `Additionally`;
- `In today's X`, `In an era where`;
- `It's worth noting that`, `Notably`;
- `Here's what's interesting`, `Here's what caught my eye`, `Here's what stood out`;
- `In conclusion`, `In summary`, `To summarize`;
- `When it comes to`, `At the end of the day`;
- repeated `That said` or `That being said`.

Use the logical relationship itself: addition, contrast, cause, consequence, or sequence.
Keep explicit signposting where accessibility, pedagogy, or a formal genre requires it.

## Content and rhetorical patterns

### Significance inflation

Cut history-making language from routine events: `marking a pivotal moment`, `watershed
moment`, `a broader shift`, `speaks to a larger trend`. State the event and consequence.

### Generic future narrative

Review predictions shaped as modal + `become` + `one of the most` + `trend`, `narrative`,
`chapter`, `movement`, or `force`. Replace with a falsifiable outcome, condition, and time
horizon, or cut it.

### Hedge-stacked prediction

Reduce `could potentially create`, `may eventually unlock`, and `might ultimately
transform` to the one level of uncertainty the evidence supports.

### Real/actual adjective inflation

Review `real utility`, `actual sustainability`, `genuine impact`, and `true product-market
fit` when no contrast is named. Keep honest contrasts such as `revenue from paying
customers, not grants`.

### Copula avoidance

Prefer `is` and `has` over inflated substitutes such as `serves as`, `features`, `boasts`,
`presents`, and `represents` unless the verb adds meaning.

### Synonym cycling

Repeat the clearest noun or verb instead of rotating through near-synonyms solely to avoid
repetition. Stable terminology is required in technical writing.

### Vague attribution

Flag `experts believe`, `studies show`, `research suggests`, and `industry leaders agree`
without a source. Ask for the source, narrow the claim, or remove the unsupported claim.
Do not keep the claim and merely delete the attribution.

### Filler and throat-clearing

Cut or rewrite:

- `It is important to note that`;
- `In terms of`;
- `The reality is that`;
- `In order to`;
- `Due to the fact that`.

### Generic conclusions

Cut `The future looks bright`, `Only time will tell`, `One thing is certain`, and `As we
move forward`. Close with a specific implication, next step, constraint, or nothing.

### Chatbot artifacts

Remove interface tics from publishable prose: `Certainly!`, `Absolutely!`, `Great
question!`, `I hope this helps`, `Feel free to reach out`, and `Let me know if you need
anything else`.

### False-collaborative "let's"

Review transition openers such as `Let's explore`, `Let's take a look`, `Let's break this
down`, and `Let's examine`. Start with the point unless the sentence is a real invitation.

### Notability name-dropping

Do not stack prestigious outlets or institutions as decoration. Use the one source that
supports the claim, with date and context. Preserve multiple sources when the breadth of
coverage is itself relevant.

### Superficial analysis

Cut strings such as `symbolizing ... reflecting ... showcasing ...` when they restate
importance without evidence. The same applies to `this represents a broader shift` and
`the decision symbolizes a commitment`. State the concrete consequence.

### Promotional language

Replace tourism-brochure and vendor language such as `nestled`, `breathtaking`, `vibrant
hub`, and `thriving ecosystem` with observable facts.

When removing `in the heart of [place]` or similar location copy, retain only the supplied
place (`in Boulder`). Do not turn the metaphor into an unsupported claim such as `central
Boulder`.

### Formulaic challenge

Rewrite `Despite challenges, X continues to thrive` and `While facing headwinds, the
organization remains resilient` with the named challenge and response.

### False range

Review sweeping pairs such as `from the Big Bang to dark matter` or `from ancient
civilizations to modern startups`. Name the actual scope.

### Novelty inflation

Do not claim someone coined, introduced, discovered, or named an established idea without
evidence. Review `the problem nobody talks about`, `the insight everyone is missing`, and
`what nobody tells you`.

### Infomercial hooks

Cut reveal fragments such as `The catch?`, `The kicker?`, `Here's the thing`, `The best
part?`, `Plot twist`, and `The result?` when they manufacture suspense around ordinary
information.

### Emotional flatline

Review claims such as `What surprised me most`, `I was fascinated to discover`, `What
struck me`, and `The most interesting part` when the surrounding prose does not earn the
emotion. Keep genuine reactions supported by specific context.

### False concession

Review `While X is impressive, Y remains a challenge` and `Although X has made strides,
Y is still an open question` when both halves are vague. Name the evidence and tradeoff.

### Rhetorical question opener

Review `What does this mean?`, `Why should you care?`, and `What's next?` when the
question stalls before a known answer. Keep a question that the text genuinely investigates
or that fits the writer's voice.

### Parenthetical hedge

Review asides such as `(and, increasingly, Z)`, `(or, more precisely, Y)`, and `(perhaps
more importantly, W)`. Promote material qualifications to the sentence; cut disposable ones.

### Reasoning artifacts

Remove `Let me think step by step`, `To approach this systematically`, `Here's my thought
process`, and numbered internal monologue from publishable prose. Preserve procedures
written for the reader.

### Sycophancy and acknowledgment loops

Remove unearned validation (`Excellent point`, `You're absolutely right`) and prompt
restatement (`You're asking about`, `To answer your question`). Answer directly.

### Confidence calibration

Review `Interestingly`, `Surprisingly`, `Importantly`, `Certainly`, `Undoubtedly`, `the
real question is`, `fundamentally`, `make no mistake`, and `the truth is` when they tell the
reader how to value the next claim. Let evidence carry the weight.

### Self-labeling significance

Review back-pointing labels such as `That last move is the contrarian one`, `This is the
interesting part`, and `The third bullet is the real story`. Reorder or explain the item so
the significance is visible.

## Structural surface patterns

### Uniform paragraph or sentence shape

Review metronomic repetition in sentence openings, lengths, clause patterns, and paragraph
sizes. Vary only where the result sounds more natural for this writer and format. Do not add
fragments, questions, or errors as camouflage.

### Formulaic opening

Replace broad context such as `In the rapidly evolving world of...` with the news, claim,
or reader need. Preserve required abstracts, executive summaries, and formal introductions.

### Title case headings

Use sentence case for prose subheadings when the publication has no contrary style guide.
Preserve a main title, proper nouns, product names, slide conventions, documentation
standards, and an explicit house style. Capitalization is a formatting preference, not an
authorship signal by itself.

### Excessive scaffolding

Review generic headers (`Overview`, `Key points`, `Summary`, `Conclusion`) and dense
sectioning when they add no navigation value. Keep headings and lists that support scanning,
accessibility, slides, or reference use. Numeric counts are review triggers, not hard rules.

### Inline-header list

Review bullets such as `**Performance:** Performance improved...` when the label repeats
the sentence. Keep labeled lists when labels genuinely organize comparable fields.

### Numbered-list inflation

Use numbering for ordered or countable items. Do not pad a list to a round number.

### Bare noun-phrase bullets

Review a run of short, symmetrical adjective-plus-noun bullets when none makes a checkable
claim. Preserve option lists, parameters, menus, ingredients, slide fragments, and changelogs.

### Hashtag stuffing

Review long trailing blocks of broad category tags. On social profiles, prefer a few
specific, useful tags. The exact count depends on platform and campaign.

### Hyphenated modifier stacks

Cut strings such as `high-quality, well-architected, future-proof solution` to the modifier
that matters. Use a hyphen before a noun when grammar requires it; do not hyphenate the
predicate form (`the report is high quality`).

## Integrity and tool artifacts

### Cutoff disclaimer

Review `As of my last update` and model-capability disclaimers in publishable prose. If the
date or information cutoff materially limits the claim, replace the model-centric wording
with an accurate source date or preserve the limitation.

### Speculative gap-filling

Flag guesses presented as background: `maintains a low profile`, `is believed to have`,
`likely began`, `appears to have studied`. Replace with sourced facts or remove the claim.

### Unfilled placeholder

Visible template slots such as `[Your Name]`, `[INSERT SOURCE URL]`, `2025-XX-XX`, and
placeholder comments are publishing defects. Fill them only with supplied facts. Templates
and intentional examples are exempt.

### Citation markup leak

Remove leaked interface tokens such as `citeturn0search0`,
`contentReference[oaicite:0]{index=0}`, `oai_citation`, `[attached_file:1]`, and
`grok_card`. Replace a meaningful citation with a real reference only when known.

### AI-tool URL parameter

Remove tracking parameters such as `utm_source=chatgpt.com`, `utm_source=copilot.com`,
`utm_source=openai`, `utm_source=claude.ai`, `utm_source=perplexity.ai`, and
`referrer=grok.com` when they are unnecessary. Their presence indicates tool passage, not
the authorship of surrounding prose.

## Writer-side diagnostics

### Paragraph contribution

Ask what new fact, qualification, evidence, action, or turn each paragraph contributes.
Cut a paragraph that only restates the premise.

### Dependency and reshuffle test

For sustained arguments and procedures, ask whether moving a paragraph breaks the logic.
If order does not matter, decide whether the piece should be an explicit list. Do not apply
this test to reference docs, slides, or modular content.

### Vocabulary diversity

Review long general-prose passages that recycle a small set of vague abstract nouns and
verbs. Do not use a universal type-token-ratio threshold: vocabulary range depends on
length, tokenization, language, genre, topic, and required terminology.

The safe fix is not a thesaurus pass. Add only supplied concrete instances, examples, or
distinctions that broaden the content. Preserve repeated technical terms, document names,
legal language, and the simple vocabulary of a writer who chose it.

### Patch versus rewrite

Recommend a wording rewrite when local edits would become numerous or inconsistent.
Recommend a structural proposal when the content-only outline reveals a document-level
problem. Do not use vocabulary-hit counts as a universal threshold.

## Severity guide

### P0: credibility or publishing failure

- unsupported or fabricated claim;
- speculative gap-filling that changes the record;
- leaked tool/citation artifacts;
- unresolved publishing placeholders;
- broken citation or factual-preservation failure.

### P1: clear reader-facing problem

- dense vocabulary or boilerplate clusters;
- significance, novelty, or promotional inflation;
- vague attribution;
- generic future narrative or hedge stack;
- formulaic opening or conclusion;
- chatbot, reasoning, sycophancy, or acknowledgment artifacts;
- repetitive rhetorical shells that obscure information.

### P2: contextual polish

- isolated word choices;
- punctuation and formatting preferences;
- occasional transition or rhetorical question;
- rhythm, heading, list, and paragraph-shape judgments.


---

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


---

# Structural audit

Use this reference for document-level analysis. A surface pass changes wording. A structural
pass examines the content plan: what the piece claims, how evidence is ordered, what causes
what, what is withheld, and how the ending resolves the argument or narrative.

Structural observations are craft diagnostics, not authorship judgments.

## Evidence boundary

The research motivating this module is:

> Jenna Russell et al., "StoryScope: Investigating idiosyncrasies in AI fiction,"
> arXiv:2604.03136v4 (2026), preprint under review.

In that benchmark, an in-domain classifier using LLM-annotated narrative features achieved
93.2% macro-F1 on long English fiction. A surface-rewriting experiment on 278
Gemini-generated stories reduced narrative detection from 95.5% to 93.9% macro-F1.

This result motivates examining structure after surface cleanup. It does **not** establish:

- a probability that an arbitrary text is AI-written;
- validity for nonfiction, short text, mixed authorship, unseen models, other languages, or
  second-language writing;
- that human-elevated features are better writing;
- that rarity is quality, creativity, copyright eligibility, or human creative control;
- that adding subplots, flashbacks, ambiguity, or disorder improves a piece.

The benchmark compared published human stories with model stories generated from prompts
reverse-engineered from those originals. Human revision, publication selection, prompt
compression, model version, and LLM-mediated annotation may contribute to the result.

## Eligibility gate

Run the full structural audit only when the user explicitly asks for a deep or structural
pass or selects `--depth structural`. The default `surface` depth never auto-runs this
module.

Use it advisorially for narrative nonfiction and long-form analysis.

If a surface pass suggests document-level problems, offer this audit as a separate next
step rather than silently running it.

Normally skip it for:

- ordinary email;
- slides and headlines;
- API references and parameter documentation;
- checklists, changelogs, and modular knowledge-base pages;
- short social posts;
- text too short to reveal a document-level pattern.

For skipped text, continue the integrity and surface passes.

## First build a content-only outline

Before proposing structural edits, summarize each section without copying its style:

```text
Section:
Primary claim or event:
Evidence or concrete detail:
Causal link:
Qualification or competing explanation:
New information introduced:
What the reader is expected to infer:
```

Then record:

- opening promise or thesis;
- strongest evidence or decisive event;
- exception, reversal, or constraint;
- conclusion or resolution;
- factual and chronological dependencies that cannot move.

Do not rewrite yet. The outline is the diagnostic.

Build the outline internally by default. Show it only when the user asks, the document is
complex enough that the map is itself useful, or a disputed diagnosis needs traceable
evidence. For ordinary audits, report the resulting structural findings directly. Do not
retell the whole source after the issue list already establishes the problem.

## Transferable checks

### 1. Inference budget

**Question:** Does the piece explain the same implication after the evidence has already
made it clear?

Flag:

- a thesis repeated at the opening, after every section, and again in the conclusion;
- a narrator or author stating the lesson immediately after the scene or evidence
  demonstrated it;
- several sentences that label the same fact as important, surprising, or transformative.

Fix:

- keep the most precise interpretation;
- remove the echo;
- let evidence carry an implication the intended reader can reasonably infer.

Preserve:

- an explicit thesis required by the genre;
- safety warnings;
- pedagogical summaries;
- accessibility-oriented signposting;
- research conclusions that accurately state the result and scope.

### 2. Causal compression

**Question:** Is a complex outcome forced into one clean cause, actor, or solution beyond
what the evidence supports?

Flag:

- a frictionless chain in a contested or multi-causal subject;
- a postmortem that erases contributing conditions;
- a strategy story where every fact points to one inevitable decision;
- a conclusion that converts correlation into causation.

Fix:

- add only supplied conditions, constraints, confounders, or competing explanations;
- narrow the causal claim;
- distinguish sequence, correlation, contribution, and cause.

Preserve:

- a proven root cause;
- an ordered procedure;
- a mathematical or logical derivation;
- a narrow incident timeline;
- a simple subject that genuinely has a simple explanation.

Never invent complexity to make a piece seem human.

### 3. Ambiguity quality

**Question:** Is uncertainty material, or is it decorative padding?

Separate:

- **epistemic uncertainty:** what is not known;
- **scope qualification:** where a claim applies;
- **tradeoff:** two objectives that cannot both be maximized;
- **empty hedge:** wording that changes no truth condition.

Fix empty hedges. Preserve the first three. Do not add false balance, weaken a clear
instruction, or force moral ambiguity into a decisive argument.

### 4. Recontextualization

**Question:** Does later evidence change how earlier material should be understood, or does
every section merely confirm the opening thesis?

For essays, case studies, history, profiles, and narrative nonfiction, a later fact may
legitimately revise the reader's first interpretation. For docs, executive summaries,
incident communication, and email, front-loading the answer is usually better.

Fix only when the source already contains a meaningful reversal or qualification that the
current order buries. Do not manufacture suspense or delay essential information.

### 5. Closure honesty

**Question:** Does the ending resolve more than the evidence permits?

Flag:

- a universal lesson from one example;
- `Ultimately, the key is...` followed by a generic abstraction;
- a success arc that drops unresolved costs or risks;
- an internal-realization ending substituted for a concrete decision or next step.

Fix:

- close on the supported implication, decision, open constraint, or next action;
- leave a genuine unresolved question unresolved;
- avoid both forced optimism and forced ambiguity.

### 6. Embodiment stack

**Question:** Are several bodily sensations, sensory details, and environment metaphors
performing the same emotion or significance?

Flag clusters such as tightening chest + cold sweat + dimming light when each repeats the
same beat.

Fix:

- keep one earned detail;
- use observable behavior;
- name the emotion directly when that is clearer;
- cut the redundant layer.

Relax for fiction and personal essays. Exempt literal medical, accessibility, culinary,
environmental, and product-sensory description.

### 7. External-world anchors

**Question:** What named source, event, example, place, person, quotation, or datum carries
each consequential generalization?

Fix:

- connect a claim to an existing verified anchor;
- narrow or remove an unsupported generalization;
- request the source when one is required.

Do not invent a reference. Do not add names merely to imitate the benchmark's human
distribution. Confidential, personal, and purely procedural writing may not need public
references.

### 8. Reader model

**Question:** What does the intended reader know, doubt, need to decide, or need to do next?

Flag generic steering:

- `Why should you care?`;
- `Whether you're a founder or an enterprise architect`;
- unexplained `you` that could address anyone;
- a conclusion with no recipient-specific implication.

Fix with the actual prerequisite, objection, decision, or action when supplied. Direct
address is optional; academic prose need not use `you`.

### 9. Choice repertoire

This is a batch-level check, not a one-document rarity score.

Across three or more related pieces, compare:

- opening shape;
- section sequence;
- example and evidence types;
- causal pattern;
- location of qualification or reversal;
- ending form;
- repeated rhetorical devices.

Change a repeated default only when another structure better fits the material. Do not
randomize one document or penalize templates, product documentation, or brand consistency.

## Fiction-only observations

StoryScope reported benchmark differences in thematic explicitness, causal continuity,
subplot use, protagonist agency, internal resolution, embodied emotion, sensory density,
reader address, named references, chronology, revelation, and moral framing.

Use these only as optional fiction craft questions:

- Does the narrator state a theme the scene already demonstrated?
- Is every event attached to one central track because the prompt was followed too
  literally?
- Does the ending close every interpretive gap?
- Do body and setting repeatedly announce emotion?
- Does a revelation change prior scenes or only confirm expectations?

Do not automatically optimize toward:

- more subplots;
- more ambiguity;
- external or fate-driven resolution;
- flashbacks, flash-forwards, dreams, or nonlinear chronology;
- more direct reader address;
- more dialogue, locations, brands, or named references;
- explicit emotion labels;
- messier causality.

These choices may be excellent or poor depending on the story.

## Structural consent

Without explicit approval, a structural audit may:

- diagnose;
- create the content-only outline;
- suggest a revised order;
- make local cuts that do not alter meaning or dependency;
- remove a repeated interpretive echo.

It may not:

- reorder sections, paragraphs, scenes, or events;
- change chronology, point of view, thesis, ending, or resolution;
- add or remove claims, evidence, examples, characters, or subplots;
- convert a list, table, slide, or reference page into a different form;
- change factual chronology in narrative nonfiction.

Before those changes, ask:

> This would change the document's structure, not just its phrasing. Should I apply these changes?

## Reporting

Keep the mode's existing top-level output headings.

When the structural audit runs or is advisory, report:

- the gate decision and reason in one sentence when it is not obvious;
- clear document-level problems;
- judgment calls left unchanged;
- local structural edits applied;
- global revisions awaiting consent;
- any source, fact, citation, or chronology risk that needed special handling.

Do not report an obvious `skipped` decision for short copy, ordinary email, slides, or
reference docs unless the user asked for structural analysis. Do not repeat the same
preservation result in the issue list, change summary, second pass, and a separate checklist.
Lead with the actionable result.

Never report an authorship probability or claim that the rewrite is undetectable.
