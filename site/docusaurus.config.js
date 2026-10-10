// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkObsidian from './plugins/remark-obsidian.mjs';

const REPO = 'https://github.com/dasmatus/schule-kb';

/** @type {import('@docusaurus/types').Config} */
export default {
  title: 'Školský trezor',
  tagline: 'Poznámky a maturitné materiály',
  favicon: 'img/favicon.svg',

  // GitHub Pages project site; both can be overridden from the workflow.
  url: process.env.SITE_URL ?? 'https://dasmatus.github.io',
  baseUrl: process.env.BASE_URL ?? '/schule-kb/',
  organizationName: 'dasmatus',
  projectName: 'schule-kb',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',

  i18n: { defaultLocale: 'sk', locales: ['sk'] },

  markdown: {
    // .md = CommonMark (Obsidian notes), .mdx = MDX (generated canvas pages)
    format: 'detect',
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 12,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          onInlineTags: 'ignore',
          showLastUpdateTime: true,
          remarkPlugins: [remarkObsidian, remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { respectPrefersColorScheme: true },
      docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      navbar: {
        title: 'Školský trezor',
        logo: { alt: '', src: 'img/favicon.svg' },
        items: [
          { to: '/maturita', label: 'Maturita', position: 'left' },
          { to: '/pojmy', label: 'Pojmy', position: 'left' },
          { to: '/mapy', label: 'Mapy', position: 'left' },
          { to: '/tags', label: 'Štítky', position: 'left' },
          { href: REPO, label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Generované z Obsidian trezoru <a href="${REPO}">${REPO.replace('https://', '')}</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'bash', 'json', 'python', 'java', 'cpp', 'sql', 'php'],
      },
      mermaid: { theme: { light: 'neutral', dark: 'dark' } },
    }),
};
