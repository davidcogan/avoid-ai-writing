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
