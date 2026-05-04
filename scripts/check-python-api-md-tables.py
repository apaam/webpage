#!/usr/bin/env python3
"""
Check (or fix) Markdown so bold section labels are separated from tables.

MDX / CommonMark table blocks should not immediately follow a line like
``**Parameters:**`` — insert a blank line in between.

Usage (from webpage repo root)::

    python3 scripts/check-python-api-md-tables.py           # check; exit 1 if issues
    python3 scripts/check-python-api-md-tables.py --fix     # rewrite files

Default scan: ``docs/python-api/**/*.md``. Override with ``--root REL_PATH``.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent


PATTERNS: list[tuple[str, re.Pattern[str], str]] = [
    ("**Parameters:**", re.compile(r"(\*\*Parameters:\*\*)\n(\|)"), r"\1\n\n\2"),
    ("**Overloads:**", re.compile(r"(\*\*Overloads:\*\*)\n(\|)"), r"\1\n\n\2"),
    (
        "**Parameters (overloaded):**",
        re.compile(r"(\*\*Parameters \(overloaded\):\*\*)\n(\|)"),
        r"\1\n\n\2",
    ),
]


def violations_in_text(text: str) -> list[tuple[str, int]]:
    """Return (label, count) for patterns that would change text."""
    out: list[tuple[str, int]] = []
    for label, pat, _ in PATTERNS:
        n = len(pat.findall(text))
        if n:
            out.append((label, n))
    return out


def fix_text(text: str) -> str:
    new = text
    for _, pat, repl in PATTERNS:
        new = pat.sub(repl, new)
    return new


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--root",
        type=Path,
        default=Path("docs/python-api"),
        help="Directory of .md files to scan (relative to repo root)",
    )
    ap.add_argument(
        "--fix",
        action="store_true",
        help="Insert blank lines; default is check-only",
    )
    args = ap.parse_args()

    repo = get_project_root()
    scan_dir = (repo / args.root).resolve()
    if not scan_dir.is_dir():
        print(f"error: not a directory: {scan_dir}", file=sys.stderr)
        return 2

    md_files = sorted(scan_dir.rglob("*.md"))
    bad_files: list[tuple[Path, list[tuple[str, int]]]] = []
    fixed_count = 0

    for path in md_files:
        text = path.read_text(encoding="utf-8")
        v = violations_in_text(text)
        if not v:
            continue
        rel = path.relative_to(repo)
        if args.fix:
            new = fix_text(text)
            if new != text:
                path.write_text(new, encoding="utf-8")
                fixed_count += 1
                print(f"fixed: {rel}")
        else:
            bad_files.append((rel, v))

    if args.fix:
        print(f"Updated {fixed_count} file(s) under {args.root}")
        return 0

    if not bad_files:
        print(f"OK: no tight label→table issues under {args.root}")
        return 0

    print(
        "Tables immediately after bold labels (add blank line before '|' row):",
        file=sys.stderr,
    )
    for rel, hits in bad_files:
        detail = ", ".join(f"{label} ×{n}" for label, n in hits)
        print(f"  {rel}: {detail}", file=sys.stderr)
    print(f"\n{len(bad_files)} file(s) need fixes. Run with --fix to apply.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
