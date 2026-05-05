import {visit} from 'unist-util-visit';

/**
 * Remark plugin: parse `![alt](src){width=480 height=300 .class}` syntax,
 * AND wrap block-level images that have alt text in `<figure>` + `<figcaption>`.
 *
 * Runs AFTER Docusaurus's built-in image transform, so the markdown image is
 * already an `<img>` JSX element (`mdxJsxTextElement`) with `alt`/`src`/natural
 * `width`/`height`.
 *
 * - Attributes from `{...}` overwrite existing JSX attrs (so a declared `width`
 *   wins over Docusaurus's natural-dimension default).
 * - When user sets only `width` (or only `height`), the unspecified dimension is
 *   removed so the browser preserves aspect ratio.
 * - When the image is the sole non-whitespace child of a paragraph and has alt
 *   text, the paragraph is replaced by a `<figure>` containing the `<img>` and a
 *   `<figcaption>` rendering the alt text.
 */
function isImgJsx(node: any): boolean {
  return node?.type === 'mdxJsxTextElement' && node.name === 'img';
}

function isWhitespaceText(node: any): boolean {
  return node?.type === 'text' && /^\s*$/.test(node.value);
}

function getAttr(attrs: any[], name: string): any {
  return attrs.find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
}

function setAttr(attrs: any[], name: string, value: string) {
  const idx = attrs.findIndex((a) => a.type === 'mdxJsxAttribute' && a.name === name);
  const attr = {type: 'mdxJsxAttribute', name, value};
  if (idx >= 0) attrs[idx] = attr;
  else attrs.push(attr);
}

function removeAttr(attrs: any[], name: string) {
  const idx = attrs.findIndex((a) => a.type === 'mdxJsxAttribute' && a.name === name);
  if (idx >= 0) attrs.splice(idx, 1);
}

function applyImgAttrs(img: any, raw: string): void {
  const explicit = new Set<string>();
  for (const tok of raw.trim().split(/\s+/)) {
    if (tok.startsWith('.')) {
      setAttr(img.attributes, 'className', tok.slice(1));
    } else if (tok.startsWith('#')) {
      setAttr(img.attributes, 'id', tok.slice(1));
    } else {
      const eq = tok.indexOf('=');
      if (eq < 0) continue;
      const key = tok.slice(0, eq);
      const val = tok.slice(eq + 1).replace(/^["']|["']$/g, '');
      setAttr(img.attributes, key, val);
      explicit.add(key);
    }
  }
  if (explicit.has('width') && !explicit.has('height')) removeAttr(img.attributes, 'height');
  if (explicit.has('height') && !explicit.has('width')) removeAttr(img.attributes, 'width');
}

function makeFigure(img: any, alt: string): any {
  return {
    type: 'mdxJsxFlowElement',
    name: 'figure',
    attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'md-figure'}],
    children: [
      img,
      {
        type: 'mdxJsxFlowElement',
        name: 'figcaption',
        attributes: [],
        children: [{type: 'text', value: alt}],
      },
    ],
  };
}

export default function remarkImageAttributes() {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (!Array.isArray(node?.children)) return;
      const kids = node.children;
      for (let i = 0; i < kids.length; i++) {
        const img = kids[i];
        const next = kids[i + 1];
        if (!isImgJsx(img)) continue;
        if (next?.type === 'text') {
          const m = next.value.match(/^\{([^}]+)\}/);
          if (m) {
            applyImgAttrs(img, m[1]);
            next.value = next.value.slice(m[0].length);
          }
        }
      }
    });

    // Wrap block-level images in <figure>: a paragraph whose meaningful child
    // is a single <img> becomes a figure with figcaption from alt text.
    visit(tree, 'paragraph', (para: any, index: number, parent: any) => {
      if (!parent || index == null) return;
      const meaningful = para.children.filter((c: any) => !isWhitespaceText(c));
      if (meaningful.length !== 1) return;
      const img = meaningful[0];
      if (!isImgJsx(img)) return;
      const altAttr = getAttr(img.attributes, 'alt');
      const alt = typeof altAttr?.value === 'string' ? altAttr.value : '';
      if (!alt) return;
      parent.children[index] = makeFigure(img, alt);
    });
  };
}
