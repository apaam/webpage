#!/usr/bin/env python3
"""
Export phynexis Python API docs to a single PDF.

Usage:
    cd webpage && python scripts/export-python-api-pdf.py
    cd webpage && python scripts/export-python-api-pdf.py --title "Custom Title"
    cd webpage && python scripts/export-python-api-pdf.py -o phynexis-python-api.pdf

Requirements:
    - mytoolkit templates at ~/workspace/templates/md-to-pdf/
    - pandoc
    - typst

The script:
    1. Collects all .md files under docs/python-api/
    2. Extracts title from the first file's frontmatter (fallback to default)
    3. Merges them in order (index.md first, then by module/category)
    4. Converts to PDF via pandoc -> typst using the manual template
"""

import argparse
import re
import subprocess
import sys
import tempfile
import uuid
from pathlib import Path


def get_project_root() -> Path:
    """Return the webpage project root (where this script lives in scripts/)."""
    return Path(__file__).resolve().parent.parent


def get_templates_dir() -> Path:
    """Return the mytoolkit md-to-pdf templates directory."""
    return Path.home() / "workspace" / "templates" / "md-to-pdf"


def parse_frontmatter_title(content: str) -> str | None:
    """Extract title from YAML frontmatter."""
    m = re.match(r"^---\s*\n(.*?)---\s*\n", content, re.DOTALL)
    if not m:
        return None
    fm = m.group(1)
    title_m = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', fm, re.MULTILINE)
    if title_m:
        return title_m.group(1).strip().strip('"\'')
    return None


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
    """Merge markdown files into a single document."""
    parts: list[str] = []

    for f in files:
        content = f.read_text(encoding="utf-8")
        # Remove frontmatter (--- ... ---)
        content = re.sub(r"^---\s*\n.*?---\s*\n", "", content, count=1, flags=re.DOTALL)
        parts.append(content.strip())
        parts.append("\n\n")

    return "\n\n".join(parts)


def build_pdf(
    merged_md: str,
    output: Path,
    title: str | None,
    subtitle: str | None,
    date: str | None,
) -> None:
    """Build PDF via pandoc -> typst using the manual template."""
    templates_dir = get_templates_dir()
    template_file = templates_dir / "manual" / "template.typ"
    if not template_file.exists():
        print(f"Template not found: {template_file}", file=sys.stderr)
        sys.exit(1)

    # Write merged markdown to temp file
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".md", encoding="utf-8", delete=False
    ) as f:
        f.write(merged_md)
        tmp_md = Path(f.name)

    try:
        # pandoc: disable citations to avoid Typst @label errors
        result = subprocess.run(
            ["pandoc", "-f", "markdown-citations", "-t", "typst", str(tmp_md)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            print("pandoc failed:", file=sys.stderr)
            print(result.stderr, file=sys.stderr)
            sys.exit(1)

        typ_body = result.stdout.replace("#horizontalrule", "#line(length: 100%)")
        # Convert pandoc tables to three-line tables
        typ_body = typ_body.replace("#table(", "#three-line-table(")

        # Build template params
        params: list[str] = []
        if title is not None:
            params.append(f'title: "{title}"')
        if subtitle is not None:
            params.append(f'subtitle: "{subtitle}"')
        if date is not None:
            params.append(f'date: "{date}"')
        param_str = ", ".join(params)

        # Write temp typ file in templates dir
        tmp_name = f".{uuid.uuid4().hex}.typ"
        tmp_typ = templates_dir / tmp_name
        rel_template = "manual/template.typ"

        with open(tmp_typ, "w", encoding="utf-8") as f:
            f.write(f'#import "{rel_template}": manual, three-line-table\n\n')
            if param_str:
                f.write(f"#show: manual.with({param_str})\n\n")
            else:
                f.write(f"#show: manual.with()\n\n")
            f.write(typ_body)

        try:
            output.parent.mkdir(parents=True, exist_ok=True)
            result = subprocess.run(
                ["typst", "compile", "--root", "/", tmp_name, str(output)],
                capture_output=True,
                text=True,
                cwd=str(templates_dir),
            )
            if result.returncode != 0:
                print("typst failed:", file=sys.stderr)
                print(result.stderr, file=sys.stderr)
                sys.exit(1)
            print(f"PDF generated: {output}")
        finally:
            tmp_typ.unlink(missing_ok=True)
    finally:
        tmp_md.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Export phynexis Python API docs to PDF")
    parser.add_argument(
        "--output", "-o",
        default="static/pdf/phynexis-python-api.pdf",
        help="Output PDF path (default: static/pdf/phynexis-python-api.pdf)",
    )
    parser.add_argument(
        "--title", "-t",
        default=None,
        help="Cover page title (default: extracted from index.md frontmatter)",
    )
    parser.add_argument(
        "--subtitle", "-s",
        default=None,
        help="Cover page subtitle",
    )
    parser.add_argument(
        "--date", "-d",
        default=None,
        help="Cover page date (default: today)",
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

    # Extract title from first file's frontmatter if not provided
    title = args.title
    if title is None:
        first_content = files[0].read_text(encoding="utf-8")
        title = parse_frontmatter_title(first_content)
    if title is None:
        title = "Phynexis Python API Reference"

    # Default date to today
    date = args.date
    if date is None:
        from datetime import date as dt
        date = dt.today().strftime("%Y-%m-%d")

    print(f"Collecting {len(files)} markdown files...")
    merged = merge_markdown(files)

    output_path = project_root / args.output
    build_pdf(merged, output_path, title, args.subtitle, date)


if __name__ == "__main__":
    main()
