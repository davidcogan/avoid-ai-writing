#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const require = createRequire(import.meta.url);

const baselineFlag = process.argv.indexOf('--baseline');
const baselineRoot =
  (baselineFlag >= 0 ? process.argv[baselineFlag + 1] : null) ||
  process.env.AVOID_AI_BASELINE_ROOT;

if (!baselineRoot) {
  console.error(
    'Set AVOID_AI_BASELINE_ROOT or pass --baseline PATH to a v3.8 source/runtime checkout.'
  );
  process.exit(2);
}

const baselineSkillPath = path.join(baselineRoot, 'SKILL.md');
const runtimePath = path.join(root, 'SKILL.md');
const structuralPath = path.join(root, 'references', 'STRUCTURAL-AUDIT.md');

const baselineBytes = fs.statSync(baselineSkillPath).size;
const runtimeBytes = fs.statSync(runtimePath).size;
const structuralBytes = fs.statSync(structuralPath).size;

const baselineDetector = require(path.join(baselineRoot, 'detector', 'patterns.js'));
const candidateDetector = require(path.join(root, 'detector', 'patterns.js'));

const sample = [
  "In today's rapidly evolving landscape, teams leverage robust and comprehensive",
  "platforms to navigate delivery complexity. Moreover, this pivotal shift",
  "underscores the need for a seamless framework. The team measured 38 incidents",
  "during June and found that 11 involved unclear ownership. Engineers also",
  "reported build latency and procurement delays. These facts should remain",
  "separate from any unsupported claim that one tool will solve every problem.",
].join(' ');

function run(detector, iterations) {
  const start = process.hrtime.bigint();
  for (let index = 0; index < iterations; index += 1) {
    detector.analyzeText(sample);
  }
  return Number(process.hrtime.bigint() - start) / 1e6;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

for (let index = 0; index < 100; index += 1) {
  baselineDetector.analyzeText(sample);
  candidateDetector.analyzeText(sample);
}

const iterations = 1000;
const baselineRounds = [];
const candidateRounds = [];

for (let round = 0; round < 7; round += 1) {
  if (round % 2 === 0) {
    baselineRounds.push(run(baselineDetector, iterations));
    candidateRounds.push(run(candidateDetector, iterations));
  } else {
    candidateRounds.push(run(candidateDetector, iterations));
    baselineRounds.push(run(baselineDetector, iterations));
  }
}

const baselineMedian = median(baselineRounds);
const candidateMedian = median(candidateRounds);
const detectorDeltaPercent = ((candidateMedian - baselineMedian) / baselineMedian) * 100;

const result = {
  capturedAt: new Date().toISOString(),
  contextPayload: {
    currentV3Bytes: baselineBytes,
    candidateDefaultSurfaceBytes: runtimeBytes,
    candidateStructuralReferenceBytes: structuralBytes,
    candidateStructuralTotalBytes: runtimeBytes + structuralBytes,
    defaultSurfaceChangePercent:
      ((runtimeBytes - baselineBytes) / baselineBytes) * 100,
    explicitStructuralChangePercent:
      (((runtimeBytes + structuralBytes) - baselineBytes) / baselineBytes) * 100,
    approximateTokens: {
      method: 'UTF-8 bytes divided by 4; directional estimate only',
      currentV3: Math.round(baselineBytes / 4),
      candidateDefaultSurface: Math.round(runtimeBytes / 4),
      candidateWithStructural: Math.round((runtimeBytes + structuralBytes) / 4),
    },
  },
  detector: {
    sampleWords: sample.split(/\s+/).length,
    iterationsPerRound: iterations,
    rounds: 7,
    currentV3MedianMs: baselineMedian,
    candidateV4MedianMs: candidateMedian,
    changePercent: detectorDeltaPercent,
    note:
      'Local microbenchmark only. End-to-end model latency depends on provider, load, and output length.',
  },
  runtimeLoading: {
    defaultSurface: 'one SKILL.md payload; no reference-file read required',
    explicitStructural: 'one additional local STRUCTURAL-AUDIT.md read',
  },
};

const output = `${JSON.stringify(result, null, 2)}\n`;
if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evaluation', 'performance.json'), output, 'utf8');
}
process.stdout.write(output);
