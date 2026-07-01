# Evaluation

Version 4 was evaluated against the frozen v3.8 behavior with synthetic fixtures covering:

- surface-heavy AI-style prose;
- protected quotations and code;
- email;
- technical documentation;
- research language;
- slides;
- deliberate author punctuation;
- sustained strategy arguments;
- fiction;
- narrative nonfiction;
- second-language prose;
- default surface-depth and second-pass contracts.

## Results

- Blind comparison: v4 `360/360`; v3.8 `345/360`.
- Hash-bound candidate certification: `12/12` fixtures passed.
- Three-run behavioral stability: `36/36` outputs passed.
- Surface-depth and authoritative-second-pass stability: `9/9` outputs passed.
- Optimized runtime smoke tests: `4/4` surface and `2/2` structural fixtures passed.
- No critical fact-preservation, protected-span, format, authorship-verdict, or unauthorized
  structural-edit failures.

## Performance

See [`performance.json`](./performance.json).

- Default surface payload: 28.3% smaller than v3.8.
- Explicit structural total: 9.6% smaller than v3.8.
- Detector microbenchmark: no measurable regression.

## Public fixtures

- [`fixtures.json`](./fixtures.json): cross-genre A/B cases and invariants.
- [`depth-fixtures.json`](./depth-fixtures.json): opt-in structural-depth and authoritative
  second-pass cases.

Raw generated runs, blind assignment keys, local deployment records, absolute paths, and
post-install artifacts are intentionally excluded from the public repository.
