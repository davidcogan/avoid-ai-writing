---
name: avoid-ai-writing
description: Audits and rewrites content to remove AI writing patterns ("AI-isms") while preserving facts, intent, voice, and genre conventions. Use when asked to humanize AI-sounding text, remove AI-isms, clean up AI slop, make text sound less like AI or ChatGPT, audit writing for AI tells, or run a deeper structural writing audit. Supports detect-only, rewrite, and edit-in-place modes; context and voice profiles; and an optional permissioned structural pass.
version: 4.1.0
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

- **`rewrite`** (default): identify in-scope issues, rewrite the text, summarize meaningful
  changes, and run a corrective second pass.
- **`detect`**: identify issues without rewriting. Separate clear editorial problems from
  judgment calls.
- **`edit`**: edit a named file in place with minimal, targeted changes. Preserve passages
  that already work, then re-read the file and verify the result. For a large file, confirm
  the section or scope before editing unless the user clearly requested the entire file.

Natural language is enough:

- "Remove AI-isms from this post."
- "Humanize this draft."
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

`--depth surface` is the default. `--depth structural` authorizes analysis of
document-level organization but not silent global restructuring.

`--iterate N` is capped at 2. The built-in corrective pass counts as the second pass.
Report `converged in 2 passes` only when no remaining **in-scope** issue is found; do not
imply that the text is proven human or undetectable.

Mode triggers:

- Use `detect` for "detect," "flag only," "audit only," "just flag," "scan," or equivalent.
- Use `edit` when the writer names a file and asks for in-place cleanup.
- Otherwise use `rewrite`.

## References

1. The **[pattern catalog](./pattern-catalog.md)** defines the surface rules: vocabulary
   tiers, template and rhetorical patterns, and their carve-outs. Apply it in full on
   every audit.
2. **[Context and voice profiles](./profiles.md)** define profile selection, precedence,
   and the tolerance matrix. Apply them when choosing a context, voice, or author sample.
3. **[STRUCTURAL-AUDIT.md](../references/STRUCTURAL-AUDIT.md)** is a separate
   document-level reference. Read it only when the user requests a deep or structural
   pass or selects `--depth structural`.

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

- **P0 - credibility or publishing failure:** unsupported or fabricated claims,
  speculative gap-filling, leaked tool or citation artifacts, unresolved publishing
  placeholders, broken citations, or material meaning corruption.
- **P1 - clear reader-facing problem:** dense vocabulary or boilerplate clusters;
  significance, novelty, or promotional inflation; vague attribution; unsupported causal
  certainty; generic future narratives and hedge stacks; formulaic openings or
  conclusions; chatbot, reasoning, sycophancy, or acknowledgment artifacts; repetitive
  rhetorical shells that obscure information.
- **P2 - contextual polish:** isolated word choices; punctuation, formatting, and cadence
  preferences; occasional transitions or rhetorical questions; heading, list, and
  paragraph-shape judgments.

For quick passes, prioritize P0 and P1. A full audit includes P2 without forcing edits.

## Output format

Every response uses these exact headings, in this order.

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
