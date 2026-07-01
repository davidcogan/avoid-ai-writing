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
