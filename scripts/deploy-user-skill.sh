#!/usr/bin/env bash
# Transactionally deploy the lean runtime package after explicit approval.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mode="${1:---dry-run}"
target="${AVOID_AI_TARGET:-$HOME/.cursor/skills/avoid-ai-writing}"
backup_root="${AVOID_AI_BACKUP_ROOT:-$HOME/.cursor/skill-backups}"

if [ "$mode" != "--dry-run" ] && [ "$mode" != "--install" ]; then
  echo "usage: bash scripts/deploy-user-skill.sh [--dry-run|--install]" >&2
  exit 2
fi

python3 - "$repo_root" "$target" "$backup_root" <<'PY'
import os
import sys

source, target, backup = map(os.path.realpath, sys.argv[1:])

def contains(parent, child):
    return os.path.commonpath([parent, child]) == parent

if source == target or contains(source, target) or contains(target, source):
    raise SystemExit("source and target must be separate directory trees")
if contains(target, backup):
    raise SystemExit("backup root must not be inside the deployment target")
PY

runtime_sources=(
  "SKILL.md"
  "references/STRUCTURAL-AUDIT.md"
)

for file in "${runtime_sources[@]}"; do
  if [ ! -f "$repo_root/$file" ]; then
    echo "missing runtime source file: $file" >&2
    exit 1
  fi
done

version="$(
  sed -n '/^---[[:space:]]*$/,/^---[[:space:]]*$/ s/^version:[[:space:]]*//p' \
    "$repo_root/SKILL.md" | head -n1 | tr -d '\r'
)"

name="$(
  sed -n '/^---[[:space:]]*$/,/^---[[:space:]]*$/ s/^name:[[:space:]]*//p' \
    "$repo_root/SKILL.md" | head -n1 | tr -d '\r'
)"

if [ "$name" != "avoid-ai-writing" ] || [ -z "$version" ]; then
  echo "runtime source has invalid name or version" >&2
  exit 1
fi

echo "candidate version: $version"
echo "source: $repo_root"
echo "target: $target"
echo "backup root: $backup_root"
echo "runtime mapping:"
echo "  SKILL.md -> SKILL.md"
echo "  references/STRUCTURAL-AUDIT.md -> references/STRUCTURAL-AUDIT.md"

if [ "$mode" = "--dry-run" ]; then
  echo "dry run only; no files changed"
  echo "after approval: bash scripts/deploy-user-skill.sh --install"
  exit 0
fi

echo "running full validation before deployment"
(
  cd "$repo_root"
  npm test
)

target_parent="$(dirname "$target")"
mkdir -p "$target_parent" "$backup_root"

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup="$backup_root/avoid-ai-writing-pre-v${version}-$timestamp"
failed="$backup_root/avoid-ai-writing-failed-v${version}-$timestamp"
staging="$target_parent/.avoid-ai-writing-staging-$$"

previous_moved=false
installed=false

recover() {
  status="${1:-$?}"
  trap - EXIT INT TERM HUP

  if [ "$installed" != true ] &&
     [ "$previous_moved" = true ] &&
     [ ! -e "$target" ] &&
     [ -e "$backup" ]; then
    mv "$backup" "$target"
    echo "deployment interrupted; previous runtime restored" >&2
  fi

  if [ -d "$staging" ]; then
    rm -rf "$staging"
  fi

  exit "$status"
}
trap 'recover $?' EXIT
trap 'recover 130' INT
trap 'recover 143' TERM
trap 'recover 129' HUP

mkdir -p "$staging/references"
cp "$repo_root/SKILL.md" "$staging/SKILL.md"
cp "$repo_root/references/STRUCTURAL-AUDIT.md" "$staging/references/STRUCTURAL-AUDIT.md"

skill_count="$(
  python3 - "$staging" <<'PY'
import os
import sys

root = sys.argv[1]
print(sum(name == "SKILL.md" for _, _, files in os.walk(root) for name in files))
PY
)"

if [ "$skill_count" != "1" ]; then
  echo "staged runtime must contain exactly one SKILL.md; found $skill_count" >&2
  exit 1
fi

if [ -e "$target" ]; then
  previous_moved=true
  mv "$target" "$backup"
fi

if [ "${AVOID_AI_TEST_ABORT_AFTER_BACKUP:-0}" = "1" ]; then
  python3 - "$target" <<'PY'
import os
import sys
import tempfile

target = os.path.realpath(sys.argv[1])
tmp = os.path.realpath(tempfile.gettempdir())
if os.path.commonpath([tmp, target]) != tmp:
    raise SystemExit("test abort hook is restricted to the temporary directory")
PY
  kill -TERM "$$"
fi

mv "$staging" "$target"

installed_count="$(
  python3 - "$target" <<'PY'
import os
import sys

root = sys.argv[1]
print(sum(name == "SKILL.md" for _, _, files in os.walk(root) for name in files))
PY
)"

if [ "$installed_count" != "1" ] ||
   [ ! -f "$target/references/STRUCTURAL-AUDIT.md" ]; then
  mv "$target" "$failed"
  if [ "$previous_moved" = true ]; then
    mv "$backup" "$target"
  fi
  echo "post-install validation failed; previous runtime restored" >&2
  exit 1
fi

installed=true
trap - EXIT INT TERM HUP

echo "installed avoid-ai-writing v$version"
if [ "$previous_moved" = true ]; then
  echo "rollback backup: $backup"
  echo "rollback command:"
  echo "  bash \"$repo_root/scripts/rollback-user-skill.sh\" --restore \"$backup\""
else
  echo "no previous runtime existed; no backup created"
fi
echo "restart Cursor before validating skill discovery"
