
# Ousta-UI Documentation Prompts

This file contains separated, focused prompts to generate or update documentation for each Ousta-UI package.

---

## 1. Docs Home Page Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Update and fix the Ousta-UI documentation home page (Docusaurus).

**Requirements:**
- Clearly explain what Ousta-UI is
- Describe the purpose of each package:
  - components
  - table, dataTable
  - hooks
  - helpers
- Include a Quick Start section
- Explain customization via Providers and CSS variables
- Link to all package docs
- Maintain a clear, welcoming structure for new users

**Output:**
Ready-to-paste Docusaurus MDX for the docs home page.

---

## 2. Components Package Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Create or update documentation for the `components` package.

**Requirements:**
- Document every component
- For each component include:
  - Description
  - When and why to use it
  - Accessibility notes
- Document every prop:
  - Name, type, default value
  - Clear description and usage guidance
- Include inline previews for:
  - Every example
  - Visual/behavioral props
- Previews must be embedded in MDX (no Storybook)
- Document `ComponentsPropsProvider`:
  - Purpose and usage
  - Provider-level overrides
  - Precedence rules
  - Inline previews for provider usage

**Output:**
Production-ready MDX docs per component.

---

## 3. Table & DataTable Package Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Create or update documentation for `table` and `dataTable` packages.

**Requirements:**
- Explain differences between Table and DataTable
- Document every component and configuration option
- For each prop:
  - Full description
  - Usage guidance
  - Edge cases
- Inline previews for:
  - Examples
  - Visual and behavioral props
- Document `TablePropsProvider`:
  - How it overrides defaults
  - Provider vs local props behavior
  - Inline previews

**Output:**
Complete MDX docs with embedded previews.

---

## 4. Hooks Package Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Create documentation for the `hooks` package.

**Requirements:**
- Document every hook:
  - Purpose
  - Parameters
  - Return values
- Include:
  - Basic usage example
  - Real-world usage example (if applicable)
- Explain when and why to use each hook

**Output:**
Clear, developer-focused MDX docs.

---

## 5. Helpers Package Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Create documentation for the `helpers` package.

**Important Notes:**
- Helpers are framework-agnostic
- Usable with any JS UI library and Node.js

**Requirements:**
- For each helper:
  - Problem it solves
  - Input/output details
  - Edge cases
- Include:
  - Basic example
  - Advanced example
  - Node.js usage example (if relevant)

**Output:**
Framework-agnostic MDX documentation.

---

## 6. Styles & Theming Prompt

**Role:** Senior UI library documentation engineer.

**Task:**
Create a Styles & Customization documentation section.

**Requirements:**
- Document all global CSS variables
- Focus heavily on `--Oui-rounded`
- Explain:
  - It is a border-radius multiplier
  - Applies globally to all components
  - Default multiplier is 0 (sharp edges)
- Include visual examples for:
  - 0
  - 0.5
  - 1
- Show how it affects components

**Output:**
MDX docs with clear explanations and inline visual previews.

---

## 6. Styles & Theming Prompt
**Task:**
Update The library name from "Ousta-UI" to "Kousta-ui"

**Requirements:**
- Update all references to "Ousta-UI" to "Kousta-ui"
- Update all references to "ousta-ui" to "kousta-ui"
- Update all references to --Oui- to --Kui-
- Update docs domain from ui.ousta.dev to ui.kousta.org
- Update the repo from https://github.com/Oustaa/ousta-ui to https://github.com/Oustaa/kousta-ui
- Update the package name from @ousta/ousta-ui to @ousta/kousta-ui
- Update README.md to reflect the new name, and the docs changes as well.

---

End of file.
