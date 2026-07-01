#!/usr/bin/env bash
# Transactionally restore an exact pre-deployment backup after explicit approval.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mode="${1:---dry-run}"
backup="${2:-}"
target="${AVOID_AI_TARGET:-$HOME/.cursor/skills/avoid-ai-writing}"
backup_root="${AVOID_AI_BACKUP_ROOT:-$HOME/.cursor/skill-backups}"

if [ "$mode" != "--dry-run" ] && [ "$mode" != "--restore" ]; then
  echo "usage: bash scripts/rollback-user-skill.sh [--dry-run|--restore] BACKUP_PATH" >&2
  exit 2
fi

if [ -z "$backup" ] || [ ! -d "$backup" ]; then
  echo "backup directory does not exist: ${backup:-<missing>}" >&2
  exit 1
fi

python3 - "$repo_root" "$backup_root" "$backup" "$target" <<'PY'
import os
import sys

source, root, backup, target = map(os.path.realpath, sys.argv[1:])

def contains(parent, child):
    return os.path.commonpath([parent, child]) == parent

if os.path.commonpath([root, backup]) != root:
    raise SystemExit("backup path must be inside the configured backup root")
if backup == root:
    raise SystemExit("backup path must name a versioned backup directory")
if backup == target:
    raise SystemExit("backup and target must be different")
if source == target or contains(source, target) or contains(target, source):
    raise SystemExit("source and target must be separate directory trees")
if contains(target, root):
    raise SystemExit("backup root must not be inside the rollback target")
PY

if [ ! -f "$backup/SKILL.md" ]; then
  echo "backup does not contain SKILL.md: $backup" >&2
  exit 1
fi

echo "restore from: $backup"
echo "restore to: $target"

if [ "$mode" = "--dry-run" ]; then
  echo "dry run only; no files changed"
  echo "after approval:"
  echo "  bash \"$repo_root/scripts/rollback-user-skill.sh\" --restore \"$backup\""
  exit 0
fi

mkdir -p "$backup_root"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
replaced="$backup_root/avoid-ai-writing-rolled-back-candidate-$timestamp"

current_moved=false
restored=false

recover() {
  status="${1:-$?}"
  trap - EXIT INT TERM HUP

  if [ "$restored" != true ] &&
     [ "$current_moved" = true ] &&
     [ ! -e "$target" ] &&
     [ -e "$replaced" ]; then
    mv "$replaced" "$target"
    echo "rollback interrupted; candidate runtime restored" >&2
  fi

  exit "$status"
}
trap 'recover $?' EXIT
trap 'recover 130' INT
trap 'recover 143' TERM
trap 'recover 129' HUP

if [ -e "$target" ]; then
  current_moved=true
  mv "$target" "$replaced"
fi

if [ "${AVOID_AI_TEST_ABORT_AFTER_CURRENT:-0}" = "1" ]; then
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

mv "$backup" "$target"

if [ ! -f "$target/SKILL.md" ]; then
  mv "$target" "$backup"
  if [ "$current_moved" = true ]; then
    mv "$replaced" "$target"
  fi
  echo "rollback validation failed; candidate runtime restored" >&2
  exit 1
fi

restored=true
trap - EXIT INT TERM HUP

echo "rollback complete"
if [ "$current_moved" = true ]; then
  echo "replaced candidate retained at: $replaced"
fi
echo "restart Cursor before validating skill discovery"
