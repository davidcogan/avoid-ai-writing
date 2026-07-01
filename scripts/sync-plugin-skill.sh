#!/usr/bin/env bash
# Regenerate the plugin's bundled skill from the canonical runtime package.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src_skill="$repo_root/SKILL.md"
src_refs="$repo_root/references"
dest="$repo_root/plugins/avoid-ai-writing/skills/avoid-ai-writing"

mkdir -p "$dest/references"
cp "$src_skill" "$dest/SKILL.md"

expected_refs=(
  "PATTERN-CATALOG.md"
  "PROFILES.md"
  "STRUCTURAL-AUDIT.md"
)

for file in "${expected_refs[@]}"; do
  cp "$src_refs/$file" "$dest/references/$file"
done

# Remove stale generated reference files without touching manifests or other plugin data.
shopt -s nullglob
for existing in "$dest/references/"*.md; do
  name="$(basename "$existing")"
  keep=false
  for expected in "${expected_refs[@]}"; do
    if [ "$name" = "$expected" ]; then
      keep=true
      break
    fi
  done
  if [ "$keep" = false ]; then
    rm "$existing"
  fi
done

skill_version="$(
  sed -n '/^---[[:space:]]*$/,/^---[[:space:]]*$/ s/^version:[[:space:]]*//p' \
    "$src_skill" | head -n1 | tr -d '\r'
)"

if [ -z "$skill_version" ]; then
  echo "could not parse 'version:' from SKILL.md frontmatter" >&2
  exit 1
fi

plugin_version="$(
  python3 - "$repo_root/plugins/avoid-ai-writing/.claude-plugin/plugin.json" <<'PY'
import json
import sys

path = sys.argv[1]
try:
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Missing plugin manifest: {path}", file=sys.stderr)
    sys.exit(1)
except json.JSONDecodeError as e:
    print(f"Invalid JSON in plugin manifest: {path}: {e}", file=sys.stderr)
    sys.exit(1)

version = data.get("version")
if not isinstance(version, str) or not version:
    print(f'Invalid or missing "version" in plugin manifest: {path}', file=sys.stderr)
    sys.exit(1)

print(version)
PY
)"

if [ "$skill_version" != "$plugin_version" ]; then
  echo "version mismatch: SKILL.md=$skill_version plugin.json=$plugin_version" >&2
  echo "Update plugin.json \"version\" to match SKILL.md frontmatter." >&2
  exit 1
fi

echo "synced plugin runtime package ($skill_version)"
