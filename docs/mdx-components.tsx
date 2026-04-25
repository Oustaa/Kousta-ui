import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import { DocBadge } from "@/components/DocBadge";

const docsComponents = getDocsMDXComponents();

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...docsComponents,
    Badge: DocBadge,
    ...components,
  } as MDXComponents;
}
