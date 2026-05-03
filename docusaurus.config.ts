import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Phynexis',
  tagline: 'A universal particle engine integrating NetDEM, CFDDEM, and computational mechanics modules',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://apaam.github.io',
  baseUrl: '/webpage/',
  trailingSlash: true,

  organizationName: 'apaam',
  projectName: 'webpage',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  markdown: {
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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
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
          to: '/docs/documentation/user-manual',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/examples/',
          position: 'left',
          label: 'Examples',
        },
        {
          to: '/docs/gallery/animations',
          position: 'left',
          label: 'Gallery',
        },
        {
          to: '/docs/download/',
          position: 'left',
          label: 'Download',
        },
        {
          href: 'pathname:///doxygen/html/index.html',
          position: 'left',
          label: 'API (Doxygen)',
        },
        {
          to: '/docs/about/help-and-support',
          position: 'left',
          label: 'About',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Project',
          items: [
            {label: 'Documentation', to: '/docs/documentation/user-manual'},
            {label: 'Examples', to: '/docs/examples/'},
            {label: 'Download', to: '/docs/download/'},
            {label: 'API (Doxygen)', href: 'pathname:///doxygen/html/index.html'},
          ],
        },
        {
          title: 'Links',
          items: [
            {label: 'DeepWiki', href: 'https://deepwiki.com/apaam/webpage'},
            {label: 'APAAM Lab', href: 'https://apaam.github.io'},
          ],
        },
        {
          title: 'About',
          items: [
            {label: 'Publications', to: '/docs/about/publications'},
            {label: 'Acknowledgements', to: '/docs/about/acknowledgement'},
            {label: 'Help & Support', to: '/docs/about/help-and-support'},
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
