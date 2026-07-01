#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const mode = process.argv[2] || '--write';

if (!['--write', '--check'].includes(mode)) {
  console.error('usage: node scripts/build-distributions.mjs [--write|--check]');
  process.exit(2);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/\r\n/g, '\n');
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return markdown;
  const end = markdown.indexOf('\n---\n', 4);
  if (end < 0) throw new Error('SKILL.md frontmatter is not closed');
  return markdown.slice(end + 5);
}

function frontmatterValue(markdown, key) {
  const end = markdown.indexOf('\n---\n', 4);
  const frontmatter = markdown.slice(0, end);
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) throw new Error(`SKILL.md frontmatter is missing ${key}`);
  return match[1].replace(/^["']|["']$/g, '');
}

function anchorLinks(markdown) {
  return markdown
    .replaceAll('./references/PATTERN-CATALOG.md', '#pattern-catalog')
    .replaceAll('./references/PROFILES.md', '#context-and-voice-profiles')
    .replaceAll('./references/STRUCTURAL-AUDIT.md', '#structural-audit');
}

function runtimeLinks(markdown) {
  return markdown
    .replaceAll('./references/PATTERN-CATALOG.md', '#pattern-catalog')
    .replaceAll('./references/PROFILES.md', '#context-and-voice-profiles')
    .replace(
      'Read the linked files directly from this skill package:',
      'The surface catalog and profiles are embedded later in this runtime file. Apply them in place:'
    );
}

const skill = read('SKILL.md');
const version = frontmatterValue(skill, 'version');
const patternCatalog = read('references/PATTERN-CATALOG.md');
const profiles = read('references/PROFILES.md');
const structuralAudit = read('references/STRUCTURAL-AUDIT.md');
const references = [patternCatalog, profiles, structuralAudit];

const appendix = references.map((text) => `\n\n---\n\n${text.trim()}\n`).join('');
const standalone = `${anchorLinks(skill).trim()}\n${appendix}`;
const runtimeAppendix = [patternCatalog, profiles]
  .map((text) => `\n\n---\n\n${text.trim()}\n`)
  .join('');
const runtime = `${runtimeLinks(skill).trim()}\n${runtimeAppendix}`;

const cursorFrontmatter = `---
description: Audit and rewrite prose to remove AI-writing patterns while preserving facts, intent, voice, and genre conventions. Supports detect, rewrite, edit-in-place, context and voice profiles, plus a permissioned structural audit. Cursor port of avoid-ai-writing v${version}.
globs: ["**/*.md", "**/*.mdx", "**/*.txt", "**/*.rst", "**/*.adoc"]
alwaysApply: false
---`;

const cursorRule = `${cursorFrontmatter}\n\n${anchorLinks(stripFrontmatter(skill)).trim()}\n${appendix}`;

const outputs = new Map([
  ['dist/avoid-ai-writing-runtime.md', runtime],
  ['dist/avoid-ai-writing-standalone.md', standalone],
  ['cursor-rules/avoid-ai-writing.mdc', cursorRule],
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
    console.error(`missing generated distribution: ${relativePath}`);
    failed = true;
    continue;
  }

  const current = fs.readFileSync(destination, 'utf8').replace(/\r\n/g, '\n');
  if (current !== normalized) {
    console.error(`generated distribution is stale: ${relativePath}`);
    failed = true;
  } else {
    console.log(`current ${relativePath}`);
  }
}

if (failed) {
  console.error('Run: node scripts/build-distributions.mjs --write');
  process.exit(1);
}
