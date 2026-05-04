#!/usr/bin/env python3
"""
Export apaam-webpage docs (excluding python-api) to a single PDF.

Usage:
    cd webpage && python scripts/export-docs-pdf.py
    cd webpage && python scripts/export-docs-pdf.py --title "Custom Title"
    cd webpage && python scripts/export-docs-pdf.py -o static/pdf/phynexis-docs.pdf

Requirements:
    - mytoolkit templates at ~/workspace/templates/md-to-pdf/
    - pandoc
    - typst

The script:
    1. Collects .md files in navbar order (Docs → Examples → Gallery → Download → About),
       with each section ordered like the Docusaurus sidebar (see sidebars.ts)
    2. Extracts title from the first file's frontmatter (fallback to default)
    3. Fixes Docusaurus absolute image paths (/img/... -> absolute filesystem paths)
    4. Disables pandoc citation processing to avoid Typst @label errors
    5. Converts to PDF via pandoc -> typst with --root / so absolute image paths resolve
"""

import argparse
import re
import subprocess
import sys
import tempfile
import uuid
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))
import pdf_doc_order  # noqa: E402


def get_project_root() -> Path:
    """Return the webpage project root."""
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


def merge_markdown(files: list[Path], project_root: Path) -> str:
    """Merge markdown files into a single document with fixed image paths."""
    parts: list[str] = []

    for f in files:
        content = f.read_text(encoding="utf-8")
        # Remove frontmatter
        content = re.sub(r"^---\s*\n.*?---\s*\n", "", content, count=1, flags=re.DOTALL)

        # Fix Docusaurus absolute paths: /img/xxx -> absolute filesystem path
        def fix_abs_img(m: re.Match) -> str:
            alt = m.group(1)
            rest = m.group(2)
            path_match = re.match(r"(/[^\s\"\)]+)", rest)
            if path_match:
                path = path_match.group(1)
                abs_path = project_root / "static" / path.lstrip("/")
                rest = rest.replace(path, str(abs_path), 1)
            return f"![{alt}]({rest})"

        content = re.sub(r"!\[(.*?)\]\((/[^\)]+)\)", fix_abs_img, content)

        # Fix relative image paths (non-absolute, non-http)
        content = re.sub(
            r"!\[(.*?)\]\((?!http)(?!file://)(?!/)([^\s\)]+)\)",
            lambda m: f"![{m.group(1)}]({f.parent / m.group(2)})",
            content,
        )

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
    """Build PDF via pandoc -> typst with --root / for absolute image paths."""
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
    parser = argparse.ArgumentParser(description="Export apaam-webpage docs to PDF")
    parser.add_argument(
        "--output", "-o",
        default="static/pdf/phynexis-docs.pdf",
        help="Output PDF path (default: static/pdf/phynexis-docs.pdf)",
    )
    parser.add_argument(
        "--title", "-t",
        default=None,
        help="Cover page title (default: extracted from first doc frontmatter)",
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
    docs_dir = project_root / "docs"

    if not docs_dir.exists():
        print(f"Docs directory not found: {docs_dir}", file=sys.stderr)
        sys.exit(1)

    files = pdf_doc_order.ordered_paths_for_combined_docs_pdf(project_root)
    if not files:
        print("No markdown files found.", file=sys.stderr)
        sys.exit(1)

    # Extract title from first file's frontmatter if not provided
    title = args.title
    if title is None:
        first_content = files[0].read_text(encoding="utf-8")
        title = parse_frontmatter_title(first_content)
    if title is None:
        title = "Phynexis Documentation"

    # Default date to today
    date = args.date
    if date is None:
        from datetime import date as dt
        date = dt.today().strftime("%Y-%m-%d")

    print(f"Collecting {len(files)} markdown files...")
    merged = merge_markdown(files, project_root)

    output_path = project_root / args.output
    build_pdf(merged, output_path, title, args.subtitle, date)


if __name__ == "__main__":
    main()
