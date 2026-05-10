import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import remarkImageAttributes from './src/remark/image-attributes';

const baseUrl = '/webpage/';

/**
 * Escape hatch for static files under `static/`: same pattern as Markdown `pathname:///pdf/...`.
 * Link strips `pathname://` and prepends `baseUrl` so the browser loads `/webpage/...`, not `/...`
 * (otherwise `docusaurus serve` redirects `/doxygen/...` → `/webpage/`).
 */
function pathnameForStaticAsset(pathFromStaticRoot: string): string {
  const relative = pathFromStaticRoot.replace(/^\/+/, '');
  return `pathname:///${relative}`;
}

const config: Config = {
  title: 'Phynexis',
  tagline: 'A universal particle engine integrating NetDEM, CFDDEM, and computational mechanics modules',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://apaam.github.io',
  baseUrl,
  trailingSlash: true,

  organizationName: 'apaam',
  projectName: 'webpage',

  onBrokenLinks: 'warn',
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/apaam/webpage/edit/main/',
          remarkPlugins: [remarkMath, remarkImageAttributes],
          rehypePlugins: [
            rehypeKatex,
            [rehypeCitation, {bibliography: './static/files/refs.bib'}],
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Phynexis',
      logo: {
        alt: 'Phynexis',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/manual/',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'API',
          position: 'left',
          items: [
            {
              to: '/docs/python-api/',
              label: 'Python',
            },
            {
              href: pathnameForStaticAsset('doxygen/html/'),
              label: 'C++ (Doxygen)',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          to: '/docs/examples/',
          position: 'left',
          label: 'Examples',
        },
        {
          to: '/docs/gallery/animations/',
          position: 'left',
          label: 'Gallery',
        },
        {
          to: '/docs/download/',
          position: 'left',
          label: 'Download',
        },
        {
          to: '/docs/about/',
          label: 'About',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Manual',
          items: [
            {label: 'Manual home', to: '/docs/manual/'},
            {label: 'Installation', to: '/docs/manual/installation/'},
          ],
        },
        {
          title: 'API',
          items: [
            {label: 'Python API', to: '/docs/python-api/'},
            {
              label: 'C++ (Doxygen)',
              href: pathnameForStaticAsset('doxygen/html/'),
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Examples', to: '/docs/examples/'},
            {label: 'Download', to: '/docs/download/'},
          ],
        },
        {
          title: 'About',
          items: [
            {label: 'About', to: '/docs/about/'},
            {
              label: 'APAAM lab site',
              href: 'https://lzhshou.github.io/docs/publications/papers/',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Phynexis · APAAM Lab`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'cpp', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
