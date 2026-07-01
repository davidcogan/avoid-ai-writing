const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contract = JSON.parse(
  fs.readFileSync(path.join(root, 'contracts', 'public-contract.json'), 'utf8')
);

let failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function frontmatterValue(markdown, key) {
  const end = markdown.indexOf('\n---', 4);
  const frontmatter = markdown.slice(0, end);
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].replace(/^["']|["']$/g, '') : null;
}

function assertIncludesAll(text, values, label) {
  const missing = values.filter((value) => !text.includes(value));
  assert.deepEqual(missing, [], `${label} missing: ${missing.join(', ')}`);
}

const skill = read('SKILL.md');
const profiles = read('references/PROFILES.md');
const patterns = read('references/PATTERN-CATALOG.md');
const structural = read('references/STRUCTURAL-AUDIT.md');

console.log('Skill package contract');

test('public name and version match the contract', () => {
  assert.equal(frontmatterValue(skill, 'name'), contract.name);
  assert.equal(frontmatterValue(skill, 'version'), contract.version);
});

test('main SKILL.md stays below 500 lines', () => {
  const lines = skill.split('\n').length;
  assert.ok(lines < 500, `SKILL.md has ${lines} lines`);
});

test('legacy modes, flags, contexts, and voices remain documented', () => {
  assertIncludesAll(skill, contract.modes, 'modes');
  assertIncludesAll(skill, contract.legacyFlags, 'legacy flags');
  assertIncludesAll(profiles, contract.legacyContexts, 'legacy contexts');
  assertIncludesAll(profiles, contract.voices, 'voice profiles');
});

test('additive depth flag and contexts are documented', () => {
  assertIncludesAll(skill, contract.addedFlags, 'added flags');
  assertIncludesAll(profiles, contract.addedContexts, 'added contexts');
  assert.equal(contract.defaultDepth, 'surface');
  assert.ok(skill.includes('Under the default `surface` depth, do not perform'));
});

test('output headings and order remain compatible', () => {
  for (const [mode, headings] of Object.entries(contract.outputs)) {
    let previous = -1;
    for (const heading of headings) {
      const index = skill.indexOf(heading);
      assert.ok(index >= 0, `${mode} output heading missing: ${heading}`);
      assert.ok(index > previous, `${mode} output heading out of order: ${heading}`);
      previous = index;
    }
  }
});

test('all directly linked references exist', () => {
  const links = [...skill.matchAll(/\]\(\.\/(references\/[^)]+\.md)\)/g)].map((match) => match[1]);
  assert.ok(links.length >= 3, 'expected at least three direct reference links');
  for (const link of links) {
    assert.ok(fs.existsSync(path.join(root, link)), `missing reference: ${link}`);
  }
});

test('preservation and structural-consent gates are present', () => {
  assertIncludesAll(skill, contract.protectedMaterial, 'protected material');
  assert.ok(
    skill.includes("This would change the document's structure, not just its phrasing."),
    'structural consent prompt missing'
  );
  assert.ok(
    skill.includes('source or author input needed'),
    'missing-source fallback missing'
  );
});

test('StoryScope is scoped as a fiction preprint, not a universal detector', () => {
  assert.ok(structural.includes('preprint under review'));
  assert.ok(structural.includes('does **not** establish'));
  assert.ok(structural.includes('Do not automatically optimize toward'));
  assert.ok(structural.includes('Never report an authorship probability'));
  assert.ok(structural.includes('default `surface` depth never auto-runs'));
});

test('genre-gate fixtures cover every context and protection cases', () => {
  const fixtures = JSON.parse(read('tests/fixtures/genre-gates.json'));
  const ids = fixtures.map((fixture) => fixture.id);
  assert.equal(new Set(ids).size, ids.length, 'fixture ids must be unique');
  const contexts = new Set(fixtures.map((fixture) => fixture.context));
  for (const context of [...contract.legacyContexts, ...contract.addedContexts]) {
    assert.ok(contexts.has(context), `no genre-gate fixture for context: ${context}`);
  }
  assert.ok(fixtures.every((fixture) => fixture.preserve.length > 0));
  const allowedGates = new Set(['run', 'advisory', 'skip', 'conditional']);
  assert.ok(
    fixtures.every((fixture) => allowedGates.has(fixture.structuralGate)),
    'every fixture must declare a valid structural gate'
  );
  for (const context of ['docs', 'email', 'slides', 'casual', 'linkedin']) {
    assert.ok(
      fixtures.some(
        (fixture) => fixture.context === context && fixture.structuralGate === 'skip'
      ),
      `expected an explicit structural skip fixture for context: ${context}`
    );
  }
  assert.ok(
    fixtures.every(
      (fixture) =>
        fixture.structuralGate === 'skip' || fixture.structuralGate === 'conditional'
    ),
    'unauthorized profile fixtures must not auto-run structural analysis'
  );
  assert.ok(fixtures.some((fixture) => fixture.id === 'second-language-essay'));
  assert.ok(fixtures.some((fixture) => fixture.id === 'quoted-ai-patterns'));
});

test('A/B fixtures define preservation and no-invention constraints', () => {
  const fixtures = JSON.parse(read('evaluation/fixtures.json'));
  const ids = fixtures.map((fixture) => fixture.id);
  assert.equal(new Set(ids).size, ids.length, 'A/B fixture ids must be unique');
  assert.ok(fixtures.length >= 12, 'expected at least 12 A/B fixtures');
  assert.deepEqual(
    new Set(fixtures.map((fixture) => fixture.group)),
    new Set(['compatibility', 'genre-protection', 'structural'])
  );
  for (const fixture of fixtures) {
    assert.ok(fixture.request);
    assert.ok(fixture.text);
    assert.ok(fixture.mustPreserve.length > 0);
    assert.ok(fixture.mustNotAdd.length > 0);
    assert.ok(fixture.evaluationGoal);
  }
});

test('depth-contract fixtures cover opt-in structure and authoritative second pass', () => {
  const fixtures = JSON.parse(read('evaluation/depth-fixtures.json'));
  assert.deepEqual(
    fixtures.map((fixture) => fixture.id),
    [
      'default-surface-long-blog',
      'default-surface-long-fiction',
      'second-pass-authoritative-version',
    ]
  );
  assert.ok(fixtures.every((fixture) => fixture.mustPreserve.length > 0));
  assert.ok(fixtures.every((fixture) => fixture.mustNotAdd.length > 0));
  assert.ok(
    fixtures[0].expectedBehavior.includes('must not run or report'),
    'long blog must preserve default surface depth'
  );
  assert.ok(
    fixtures[1].expectedBehavior.includes('Do not run'),
    'long fiction must preserve default surface depth'
  );
  assert.ok(
    fixtures[2].expectedBehavior.includes('Final corrected version'),
    'second-pass fixture must require an authoritative final version'
  );
});

test('runtime source files contain no replacement characters', () => {
  const files = [
    'SKILL.md',
    'references/PATTERN-CATALOG.md',
    'references/PROFILES.md',
    'references/STRUCTURAL-AUDIT.md',
  ];
  for (const file of files) {
    assert.ok(!read(file).includes('\uFFFD'), `${file} contains U+FFFD`);
  }
});

test('release metadata versions stay synchronized', () => {
  const packageJson = JSON.parse(read('package.json'));
  const surfaceCategories = JSON.parse(read('contracts/surface-categories.json'));
  assert.equal(packageJson.version, contract.version);
  assert.equal(surfaceCategories.version, contract.version);
  assert.equal(surfaceCategories.categories.length, 47);
  assert.equal(frontmatterValue(skill, 'version'), contract.version);
});

test('flattened distributions include all required modules', () => {
  const runtime = read('dist/avoid-ai-writing-runtime.md');
  const standalone = read('dist/avoid-ai-writing-standalone.md');
  assert.ok(runtime.includes('# Pattern catalog'));
  assert.ok(runtime.includes('# Context and voice profiles'));
  assert.ok(!runtime.includes('# Structural audit'));
  assert.ok(runtime.includes('./references/STRUCTURAL-AUDIT.md'));
  assert.ok(!runtime.includes('\uFFFD'));
  assert.ok(standalone.includes('# Pattern catalog'));
  assert.ok(standalone.includes('# Context and voice profiles'));
  assert.ok(standalone.includes('# Structural audit'));
  assert.ok(!standalone.includes('\uFFFD'));
});

test('public package is Cursor-only', () => {
  const files = [
    'SKILL.md',
    'README.md',
    'AGENTS.md',
    'package.json',
    'scripts/build-distributions.mjs',
  ];
  const forbidden = /\b(?:Claude|Cowork|OpenClaw|Hermes|Codex)\b|cursor-rules|claude-plugin/i;
  for (const file of files) {
    assert.ok(!forbidden.test(read(file)), `${file} contains a non-Cursor distribution reference`);
  }
});

test('surface catalog keeps the major legacy rule families', () => {
  assertIncludesAll(
    patterns,
    [
      'Vocabulary tiers',
      'Template and transition phrases',
      'Significance inflation',
      'Copula avoidance',
      'Synonym cycling',
      'Vague attribution',
      'Chatbot artifacts',
      'Novelty inflation',
      'Reasoning artifacts',
      'Uniform paragraph or sentence shape',
      'Title case headings',
      'Vocabulary diversity',
      'Unfilled placeholder',
      'Citation markup leak',
      'AI-tool URL parameter',
    ],
    'legacy pattern families'
  );
});

if (failed > 0) {
  console.error(`\n${failed} skill package check(s) failed.`);
  process.exit(1);
}

console.log('\nSkill package contract holds.');
