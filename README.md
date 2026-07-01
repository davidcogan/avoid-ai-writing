# avoid-ai-writing

`avoid-ai-writing` is a Cursor Agent Skill that edits prose that sounds generated,
over-polished, vague, or structurally canned. It rewrites weak passages while preserving
facts, citations, technical terms, formatting, and the writer's voice.

The patterns are editing signals, not proof of authorship. Human writers use them too.

## Install

### User-level

Install once to use the skill across Cursor projects:

```bash
VERSION=v4.0.2
mkdir -p ~/.cursor/skills/avoid-ai-writing/references

curl -fsSL \
  "https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/${VERSION}/SKILL.md" \
  -o ~/.cursor/skills/avoid-ai-writing/SKILL.md

curl -fsSL \
  "https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/${VERSION}/references/STRUCTURAL-AUDIT.md" \
  -o ~/.cursor/skills/avoid-ai-writing/references/STRUCTURAL-AUDIT.md
```

### Project-level

Pin the skill in a repository when everyone working there should use the same version. Run
these commands from the repository root:

```bash
VERSION=v4.0.2
mkdir -p .cursor/skills/avoid-ai-writing/references

curl -fsSL \
  "https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/${VERSION}/SKILL.md" \
  -o .cursor/skills/avoid-ai-writing/SKILL.md

curl -fsSL \
  "https://raw.githubusercontent.com/davidcogan/avoid-ai-writing/${VERSION}/references/STRUCTURAL-AUDIT.md" \
  -o .cursor/skills/avoid-ai-writing/references/STRUCTURAL-AUDIT.md
```

Commit `.cursor/skills/avoid-ai-writing/` with the rest of the project.

Choose one scope for a given project. Installing both copies makes version debugging harder.

Restart Cursor or open a fresh chat after installation. To verify the setup, ask:

```text
Which version of avoid-ai-writing is loaded? Run it in detect mode on:
"Certainly! The future looks bright!"
```

The response should report version `4.0.2`, then flag the chatbot opener and generic
conclusion without rewriting the text.

## Use

Example requests:

```text
Remove the AI-isms from this post.
Make this sound less like AI.
Audit this draft, but do not rewrite it.
Edit README.md in place.
Rewrite this in my voice.
Run a structural audit before rewriting.
```

The three modes are:

- `rewrite` audits the text, returns a revised version, summarizes the edits, and checks its
  own rewrite.
- `detect` reports problems and judgment calls without changing the text.
- `edit` makes targeted changes to a file and verifies the result.

Specify context and voice when needed:

```text
--context docs|email|slides|research|linkedin|blog|technical-blog|investor-email|casual|fiction|narrative-nonfiction
--voice casual|professional|technical|warm|blunt
--depth surface|structural
```

Surface editing is the default. Structural analysis runs only when requested.

## What it catches

The surface pass checks:

- stock vocabulary and inflated verbs: `delve`, `leverage`, `serves as`, `game-changing`;
- generic framing: `In today's rapidly evolving landscape`, `Moreover`, `In conclusion`;
- unsupported importance: `pivotal moment`, `broader shift`, `the future looks bright`;
- repetitive shapes: symmetrical bullets, canned concessions, uniform paragraph rhythm;
- credibility problems: vague attribution, invented certainty, leaked citation tokens,
  placeholders, and model-interface residue.

It also catches writing problems that are not unique to AI. Precise technical terms,
deliberate repetition, and well-placed rhetorical questions stay when they serve the
document's audience.

Before:

> Certainly! Acme Analytics, a vibrant startup nestled in the heart of Boulder, raised a
> $40M Series B in June 2026. The platform serves as a comprehensive hub, featuring
> real-time dashboards and boasting query latency under one second. Moreover, this pivotal
> round underscores Acme's game-changing potential. Experts believe it is poised to
> revolutionize observability. In conclusion, the future looks bright!

After:

> Acme Analytics, a startup in Boulder, raised a $40M Series B in June 2026. Its platform
> includes real-time dashboards and has query latency under one second.

The rewrite keeps every supplied fact and drops the unsupported prediction. It does not
invent investors, customers, benchmarks, market size, or plans for the funding.

## What the StoryScope study added

Earlier versions focused mostly on visible style: vocabulary, punctuation, sentence rhythm,
formatting, and repeated rhetorical templates.

StoryScope began with 10,272 published human stories. The researchers reverse-engineered a
prompt from each story, then asked five language models to write new stories from those
prompts, producing 61,608 stories in total. Narrative features alone reached 93.2%
macro-F1 inside that benchmark. On a separate 278-story Gemini subset, removing surface
artifacts reduced macro-F1 by only 1.6 points, from 95.5% to 93.9%.

Changing words may leave the underlying argument or narrative untouched.

Version 4 added an optional structural audit for:

- explaining the same implication after the evidence has already made it clear;
- reducing a complicated outcome to one clean cause or solution;
- ignoring counterevidence while presenting a settled conclusion;
- repeating bodily, sensory, or environmental cues that all perform the same emotion;
- making broad claims without a concrete source, example, or audience-specific consequence.

The study covers long English fiction in this benchmark, so the skill does not treat its
findings as universal writing rules. It does not add flashbacks, ambiguity, subplots,
disorder, or personal anecdotes to make text seem human. Documentation, email, slides,
research, and technical writing keep their functional structure.

The audit can identify structural problems, but reordering sections, changing chronology,
altering a thesis, or adding and removing evidence requires explicit approval.

Source: Jenna Russell et al.,
["StoryScope: Investigating idiosyncrasies in AI fiction"](https://arxiv.org/abs/2604.03136),
arXiv:2604.03136v4 (2026), preprint under review.

## Editing safeguards

The preservation contract covers:

- facts, numbers, dates, names, links, quotations, and citations;
- negation, uncertainty, scope, units, and causal boundaries;
- code, commands, technical identifiers, tables, and intentional formatting;
- quoted or attributed material;
- genre conventions and a supplied writing sample.

If a safe fix needs evidence that was not provided, the skill leaves the claim unchanged and
asks for a source or author decision.

## Repository development

Build the installable root `SKILL.md` from the modules in `src/`. The structural audit
remains in `references/STRUCTURAL-AUDIT.md`.

```bash
npm run build
npm test
npm run test:deploy
```

An optional deterministic surface detector supports CI and other programmatic checks. The
Cursor skill does not require it.

Public fixtures and aggregate results are in [`evaluation/`](evaluation/).

## Credits

Maintained by [David Cogan](https://github.com/davidcogan). Derived from
[Conor Bronsdon's original project](https://github.com/conorbronsdon/avoid-ai-writing)
under the MIT License.

## License

MIT
