import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "../../styles/docs-extra.css";
import type { ReactNode } from "react";
import DocSearchWidget from "@/components/DocSearch";

const docSearchConfigured =
  !!process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID &&
  !!process.env.NEXT_PUBLIC_DOCSEARCH_SEARCH_API_KEY &&
  !!process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME;

export const metadata = {
  metadataBase: new URL("https://ui.kousta.org"),
  title: {
    default: "Kousta UI",
    template: "%s | Kousta UI",
  },
  description:
    "A React UI library focused on performance, accessibility, and convenience.",
  icons: {
    icon: "/img/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  const navbar = (
    <Navbar
      logo={
        <>
          <img
            alt="Kousta UI"
            className="kui-logo kui-logo--light"
            height={28}
            src="/img/logo-light.png"
            width={120}
          />
          <img
            alt="Kousta UI"
            className="kui-logo kui-logo--dark"
            height={28}
            src="/img/logo-dark.png"
            width={120}
          />
        </>
      }
      projectLink="https://github.com/Oustaa/kousta-ui"
    />
  );

  const footer = (
    <Footer>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <a href="/docs/Intro">Docs</a>
        <a href="/docs/Table/Table">Table</a>
        <a href="/docs/Components/overview">Components</a>
        <a href="/docs/hooks/overview">Hooks</a>
        <a href="/docs/helpers/overview">Helpers</a>
        <a href="https://discord.gg/5zDJG79A">Discord</a>
        <a href="https://github.com/Oustaa/kousta-ui">GitHub</a>
      </div>
      <p style={{ marginTop: "1.5rem", textAlign: "center", width: "100%" }}>
        Copyright © {new Date().getFullYear()} kousta-ui, Kousta.
      </p>
    </Footer>
  );

  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          docsRepositoryBase="https://github.com/Oustaa/kousta-ui/tree/main/docs"
          editLink="Edit this page on GitHub"
          footer={footer}
          navbar={navbar}
          pageMap={pageMap}
          search={docSearchConfigured ? <DocSearchWidget /> : undefined}
          sidebar={{ defaultMenuCollapseLevel: 2 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
