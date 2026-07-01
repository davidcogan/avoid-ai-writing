#!/usr/bin/env bash
# Guard against drift between the machine-readable surface catalog and README.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
catalog="$repo_root/contracts/surface-categories.json"
readme="$repo_root/README.md"

catalog_count="$(
  python3 - "$catalog" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as f:
    data = json.load(f)

categories = data.get("categories")
if not isinstance(categories, list) or not categories:
    raise SystemExit("surface category contract has no categories")
if len(categories) != len(set(categories)):
    raise SystemExit("surface category contract contains duplicate ids")

print(len(categories))
PY
)"

readme_count="$(
  sed -n 's/.*\*\*\([0-9][0-9]*\) surface pattern categories\*\*.*/\1/p' \
    "$readme" | head -n1
)"

if [ -z "$readme_count" ]; then
  echo "could not find the '**NN surface pattern categories**' README bullet" >&2
  exit 1
fi

if [ "$catalog_count" != "$readme_count" ]; then
  echo "surface-pattern count drift: contract=$catalog_count README=$readme_count" >&2
  exit 1
fi

echo "surface pattern count in sync: $catalog_count"
