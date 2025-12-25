// docusaurus.config.ts
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Ousta UI",
  tagline: "a ui library focuses on performance and convenience",
  favicon: "img/favicon.ico",
  url: "https://ui.ousta.dev",
  baseUrl: "/",

  organizationName: "Oustaa",
  projectName: "Ousta-ui",

  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: { defaultLocale: "en", locales: ["en"] },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/Oustaa/usta-ui/blob/main/docs/",
        },
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    liveCodeBlock: { playgroundPosition: "bottom" },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "ousta-ui",
      logo: { alt: "ousta-ui logo", src: "img/logo.svg" },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/oustaa/ousta-ui",
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
              href: "https://discordapp.com/invite/docusaurus",
            },
            { label: "Twitter", href: "https://twitter.com/docusaurus" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "GitHub", href: "https://github.com/Oustaa/usta-ui" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ousta-ui, Ousta.`,
    },
    prism: {
      theme: prismThemes.okaidia,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
