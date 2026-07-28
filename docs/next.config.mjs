import path from "node:path";
import { fileURLToPath } from "node:url";
import nextra from "nextra";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const withNextra = nextra({
  contentDirBasePath: "/docs",
  search: {
    codeblocks: false,
  },
});

export default withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: [
    "@kousta-ui/components",
    "@kousta-ui/table",
    "@kousta-ui/hooks",
    "@kousta-ui/helpers",
  ],
});
