#!/usr/bin/env python3
"""
Export phynexis Python API docs to a single PDF.

Usage:
    cd webpage && python scripts/export-python-api-pdf.py
    cd webpage && python scripts/export-python-api-pdf.py --output phynexis-python-api.pdf

Requirements:
    - pandoc (brew install pandoc)
    - A LaTeX engine (xelatex or lualatex, e.g. from MacTeX or TinyTeX)

The script:
    1. Collects all .md files under docs/python-api/
    2. Merges them in order (index.md first, then by module/category)
    3. Converts to PDF via pandoc
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path


def get_project_root() -> Path:
    """Return the webpage project root (where this script lives in scripts/)."""
    return Path(__file__).resolve().parent.parent


def collect_markdown_files(api_dir: Path) -> list[Path]:
    """Collect all .md files under python-api/, ordered logically."""
    files: list[Path] = []

    # index.md first
    index = api_dir / "index.md"
    if index.exists():
        files.append(index)

    # Then traverse subdirectories in alphabetical order
    for subdir in sorted(api_dir.iterdir()):
        if not subdir.is_dir():
            continue
        if subdir.name.startswith("_") or subdir.name.startswith("."):
            continue
        if subdir.name == "deprecated":
            continue

        # Subdir index first
        sub_index = subdir / "index.md"
        if sub_index.exists():
            files.append(sub_index)

        # Then other .md files alphabetically
        for md in sorted(subdir.glob("*.md")):
            if md.name == "index.md":
                continue
            files.append(md)

    return files


def merge_markdown(files: list[Path]) -> str:
    """Merge markdown files into a single document with page breaks."""
    parts: list[str] = []

    for f in files:
        content = f.read_text(encoding="utf-8")
        # Remove frontmatter (--- ... ---)
        content = re.sub(r"^---\s*\n.*?---\s*\n", "", content, count=1, flags=re.DOTALL)
        # Adjust image paths: relative to docs/ → relative to project root
        content = re.sub(
            r"!\[(.*?)\]\((?!http)(.*?)\)",
            lambda m: f"![{m.group(1)}]({f.parent / m.group(2)})",
            content,
        )
        parts.append(content.strip())
        parts.append("\n\n\\newpage\n\n")

    return "\n\n".join(parts)


def build_pdf(merged_md: str, output: Path, project_root: Path) -> None:
    """Run pandoc to generate PDF."""
    cmd = [
        "pandoc",
        "-f", "markdown",
        "-t", "pdf",
        "--pdf-engine=xelatex",
        "-V", "geometry:margin=2.5cm",
        "-V", "mainfont=Times New Roman",
        "-V", "CJKmainfont=PingFang SC",  # macOS Chinese font; adjust for your system
        "--toc",
        "--toc-depth=3",
        "-o", str(output),
    ]

    result = subprocess.run(cmd, input=merged_md, capture_output=True, text=True, cwd=project_root)
    if result.returncode != 0:
        print("pandoc failed:", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        sys.exit(1)

    print(f"PDF generated: {output}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Export phynexis Python API docs to PDF")
    parser.add_argument(
        "--output", "-o",
        default="static/pdf/phynexis-python-api.pdf",
        help="Output PDF path (default: static/pdf/phynexis-python-api.pdf)"
    )
    args = parser.parse_args()

    project_root = get_project_root()
    api_dir = project_root / "docs" / "python-api"

    if not api_dir.exists():
        print(f"API docs directory not found: {api_dir}", file=sys.stderr)
        sys.exit(1)

    files = collect_markdown_files(api_dir)
    if not files:
        print("No markdown files found.", file=sys.stderr)
        sys.exit(1)

    print(f"Collecting {len(files)} markdown files...")
    merged = merge_markdown(files)

    output_path = project_root / args.output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(merged, output_path, project_root)


if __name__ == "__main__":
    main()
