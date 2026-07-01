#!/usr/bin/env bash
# Validate the machine-readable surface category inventory.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
catalog="$repo_root/contracts/surface-categories.json"

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

echo "surface category contract valid: $catalog_count"
