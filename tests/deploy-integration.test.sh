#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
candidate_version="$(
  sed -n '/^---[[:space:]]*$/,/^---[[:space:]]*$/ s/^version:[[:space:]]*//p' \
    "$repo_root/SKILL.md" | head -n1 | tr -d '\r'
)"
tmp="$(mktemp -d)"

cleanup() {
  rm -rf "$tmp"
}
trap cleanup EXIT

target="$tmp/skills/avoid-ai-writing"
backup_root="$tmp/backups"

count_skills() {
  python3 - "$1" <<'PY'
import os
import sys

print(sum(name == "SKILL.md" for _, _, files in os.walk(sys.argv[1]) for name in files))
PY
}

make_baseline() {
  mkdir -p "$target/plugins/avoid-ai-writing/skills/avoid-ai-writing"
  printf '%s\n' 'baseline root skill' > "$target/SKILL.md"
  printf '%s\n' 'baseline nested skill' > \
    "$target/plugins/avoid-ai-writing/skills/avoid-ai-writing/SKILL.md"
  printf '%s\n' 'baseline marker' > "$target/BASELINE-MARKER"
}

# Simulate the current full-repository installation with two discovered skills.
make_baseline

# An interruption after moving the old target must restore the baseline.
if AVOID_AI_TARGET="$target" \
   AVOID_AI_BACKUP_ROOT="$backup_root" \
   AVOID_AI_TEST_ABORT_AFTER_BACKUP=1 \
   bash "$repo_root/scripts/deploy-user-skill.sh" --install; then
  echo "interrupted deployment unexpectedly succeeded" >&2
  exit 1
fi

if [ "$(count_skills "$target")" != "2" ] ||
   [ ! -f "$target/BASELINE-MARKER" ]; then
  echo "interrupted deployment did not restore the exact baseline" >&2
  exit 1
fi

# Happy-path deployment installs one lean runtime skill.
AVOID_AI_TARGET="$target" \
AVOID_AI_BACKUP_ROOT="$backup_root" \
  bash "$repo_root/scripts/deploy-user-skill.sh" --install

if [ "$(count_skills "$target")" != "1" ]; then
  echo "expected one installed SKILL.md" >&2
  exit 1
fi

if [ ! -f "$target/references/STRUCTURAL-AUDIT.md" ]; then
  echo "structural reference missing after deployment" >&2
  exit 1
fi

python3 - "$target/SKILL.md" <<'PY'
import sys

with open(sys.argv[1], encoding="utf-8") as f:
    runtime = f.read()

assert "# Pattern catalog" in runtime
assert "# Context and voice profiles" in runtime
assert "# Structural audit" not in runtime
assert "./references/STRUCTURAL-AUDIT.md" in runtime
PY

backups=("$backup_root"/avoid-ai-writing-pre-v"${candidate_version}"-*)
if [ "${#backups[@]}" != "1" ] || [ ! -d "${backups[0]}" ]; then
  echo "expected exactly one rollback backup" >&2
  exit 1
fi

# An interruption after moving the candidate must restore the candidate.
if AVOID_AI_TARGET="$target" \
   AVOID_AI_BACKUP_ROOT="$backup_root" \
   AVOID_AI_TEST_ABORT_AFTER_CURRENT=1 \
   bash "$repo_root/scripts/rollback-user-skill.sh" --restore "${backups[0]}"; then
  echo "interrupted rollback unexpectedly succeeded" >&2
  exit 1
fi

if [ "$(count_skills "$target")" != "1" ] ||
   [ ! -f "$target/references/STRUCTURAL-AUDIT.md" ]; then
  echo "interrupted rollback did not restore the candidate" >&2
  exit 1
fi

# Happy-path rollback restores the exact two-skill baseline.
AVOID_AI_TARGET="$target" \
AVOID_AI_BACKUP_ROOT="$backup_root" \
  bash "$repo_root/scripts/rollback-user-skill.sh" --restore "${backups[0]}"

if [ "$(count_skills "$target")" != "2" ] ||
   [ ! -f "$target/BASELINE-MARKER" ]; then
  echo "rollback did not restore the exact baseline" >&2
  exit 1
fi

# Unsafe custom paths must fail before mutation.
if AVOID_AI_TARGET="$repo_root" \
   AVOID_AI_BACKUP_ROOT="$backup_root" \
   bash "$repo_root/scripts/deploy-user-skill.sh" --dry-run; then
  echo "deploy accepted a target overlapping the source" >&2
  exit 1
fi

unsafe_target="$tmp/unsafe/avoid-ai-writing"
if AVOID_AI_TARGET="$unsafe_target" \
   AVOID_AI_BACKUP_ROOT="$unsafe_target/backups" \
   bash "$repo_root/scripts/deploy-user-skill.sh" --dry-run; then
  echo "deploy accepted a backup root inside the target" >&2
  exit 1
fi

outside_backup="$tmp/outside-backup"
mkdir -p "$outside_backup"
printf '%s\n' 'outside skill' > "$outside_backup/SKILL.md"
if AVOID_AI_TARGET="$target" \
   AVOID_AI_BACKUP_ROOT="$backup_root" \
   bash "$repo_root/scripts/rollback-user-skill.sh" --dry-run "$outside_backup"; then
  echo "rollback accepted a backup outside the configured root" >&2
  exit 1
fi

overlap_backup="$backup_root/source-overlap-test"
mkdir -p "$overlap_backup"
printf '%s\n' 'overlap skill' > "$overlap_backup/SKILL.md"
if AVOID_AI_TARGET="$repo_root" \
   AVOID_AI_BACKUP_ROOT="$backup_root" \
   bash "$repo_root/scripts/rollback-user-skill.sh" --dry-run "$overlap_backup"; then
  echo "rollback accepted a target overlapping the source" >&2
  exit 1
fi

echo "deployment, interruption recovery, path safety, and rollback tests passed"
