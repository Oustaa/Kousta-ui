import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Kousta UI",
  tagline: "a ui library focuses on performance and convenience",
  favicon: "img/logo.png",
  url: "https://ui.kousta.org",
  baseUrl: "/",

  organizationName: "Oustaa",
  projectName: "Kousta-ui",

  trailingSlash: false,

  onBrokenLinks: "warn",

  i18n: { defaultLocale: "en", locales: ["en"] },

  customFields: {
    API_BASE_URL: process.env.DOCUSAURUS_API_BASE_URL,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/Oustaa/Kousta-ui/blob/main/docs/",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
        },
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    liveCodeBlock: { playgroundPosition: "bottom" },
    image: "img/logo.png",
    ...(process.env.DOCSEARCH_APP_ID &&
      process.env.DOCSEARCH_API_KEY &&
      process.env.DOCSEARCH_INDEX_NAME
      ? {
        algolia: {
          appId: process.env.DOCSEARCH_APP_ID,
          apiKey: process.env.DOCSEARCH_API_KEY,
          indexName: process.env.DOCSEARCH_INDEX_NAME,
          contextualSearch: false,
        },
      }
      : {}),
    navbar: {
      logo: {
        alt: "kousta-ui logo",
        src: "img/logo-light.png",
        srcDark: "img/logo-dark.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "search",
          position: "right",
        },
        {
          href: "https://github.com/oustaa/kousta-ui",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Table", to: "/docs/category/table" },
            { label: "Components", to: "/docs/category/components" },
            { label: "Hooks", to: "/docs/category/hooks" },
            { label: "Helpers", to: "/docs/category/helpers" },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/5zDJG79A",
            },
          ],
        },
        {
          title: "More",
          items: [
            { label: "GitHub", href: "https://github.com/Oustaa/kousta-ui" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} kousta-ui, Kousta.`,
    },
    prism: {
      theme: prismThemes.okaidia,
      darkTheme: prismThemes.dracula,
    },

  } satisfies Preset.ThemeConfig,
};

export default config;
