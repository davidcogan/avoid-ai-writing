#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const mode = process.argv[2] || '--write';

if (!['--write', '--check'].includes(mode)) {
  console.error('usage: node scripts/build-skill.mjs [--write|--check]');
  process.exit(2);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/\r\n/g, '\n');
}

function runtimeLinks(markdown) {
  return markdown
    .replaceAll('./pattern-catalog.md', '#pattern-catalog')
    .replaceAll('./profiles.md', '#context-and-voice-profiles')
    .replaceAll('../references/STRUCTURAL-AUDIT.md', './references/STRUCTURAL-AUDIT.md')
    .replace(
      'Read the linked files directly from this skill package:',
      'The surface catalog and profiles are embedded later in this runtime file. Apply them in place:'
    );
}

const skill = read('src/skill-router.md');
const patternCatalog = read('src/pattern-catalog.md');
const profiles = read('src/profiles.md');
const runtimeAppendix = [patternCatalog, profiles]
  .map((text) => `\n\n---\n\n${text.trim()}\n`)
  .join('');
const runtime = `${runtimeLinks(skill).trim()}\n${runtimeAppendix}`;

const outputs = new Map([
  ['SKILL.md', runtime],
]);

let failed = false;
for (const [relativePath, content] of outputs) {
  const destination = path.join(root, relativePath);
  const normalized = `${content.trimEnd()}\n`;

  if (mode === '--write') {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, normalized, 'utf8');
    console.log(`wrote ${relativePath}`);
    continue;
  }

  if (!fs.existsSync(destination)) {
    console.error(`missing generated skill: ${relativePath}`);
    failed = true;
    continue;
  }

  const current = fs.readFileSync(destination, 'utf8').replace(/\r\n/g, '\n');
  if (current !== normalized) {
    console.error(`generated skill is stale: ${relativePath}`);
    failed = true;
  } else {
    console.log(`current ${relativePath}`);
  }
}

if (failed) {
  console.error('Run: node scripts/build-skill.mjs --write');
  process.exit(1);
}
