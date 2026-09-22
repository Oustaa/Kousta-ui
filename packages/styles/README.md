<div align="center">

# `@kousta-ui/styles`

**The design tokens every Kousta&nbsp;UI package is built on** — colors, spacing
and typography as plain CSS custom properties.

[![internal](https://img.shields.io/badge/package-internal-lightgrey)](package.json)
[![css](https://img.shields.io/badge/output-CSS%20variables-9141ac)](dist)

[Documentation](https://ui.kousta.org/docs/styles/styles-and-customization) ·
[Components](../components) ·
[Table](../table)

</div>

---

## What this is

A single generated stylesheet, `dist/tokens.css`, holding one `:root` block of
`--kui-*` variables.

> [!NOTE]
> This package is **private** — it isn't published to npm and you never install
> it directly. `@kousta-ui/components` and `@kousta-ui/table` import it for you;
> the tokens arrive with their `index.css`.

Because the tokens are ordinary custom properties, theming needs no build step,
no provider and no JavaScript. Redefine what you want, after the library's
stylesheet:

```css
@import "@kousta-ui/components/esm/index.css";

:root {
  --kui-primary-600: #2563eb;
  --kui-primary-700: #1d4ed8;
  --kui-spacing-base: 0.875rem;
  --kui-text-base: 0.9375rem;
}
```

## The tokens

### Colors

Five families, ten steps each (`50` → `900`), from lightest to darkest:

| Family    | Variables                                | Used for                              |
| --------- | ---------------------------------------- | ------------------------------------- |
| `primary` | `--kui-primary-50` … `--kui-primary-900` | Default buttons, active states, focus |
| `success` | `--kui-success-50` … `--kui-success-900` | Confirmations, positive actions       |
| `warning` | `--kui-warning-50` … `--kui-warning-900` | Cautions, pending states              |
| `danger`  | `--kui-danger-50` … `--kui-danger-900`   | Destructive actions, errors           |
| `neutral` | `--kui-neutral-50` … `--kui-neutral-900` | Text, borders, surfaces               |

`500`–`600` are the solid mid-tones components reach for; `50`–`200` back the
`light` variants; `700`+ handle hover and pressed states.

### Spacing

| Token                | Value     |
| -------------------- | --------- |
| `--kui-spacing-2xs`  | `0.25rem` |
| `--kui-spacing-xs`   | `0.5rem`  |
| `--kui-spacing-sm`   | `0.75rem` |
| `--kui-spacing-base` | `1rem`    |
| `--kui-spacing-md`   | `1.25rem` |
| `--kui-spacing-lg`   | `1.5rem`  |
| `--kui-spacing-xl`   | `1.75rem` |
| `--kui-spacing-2xl`  | `2rem`    |
| `--kui-spacing-3xl`  | `3rem`    |

### Typography

| Token               | Value      |
| ------------------- | ---------- |
| `--kui-text-xs`     | `0.5rem`   |
| `--kui-text-sm`     | `0.75rem`  |
| `--kui-text-base`   | `1rem`     |
| `--kui-text-medium` | `1.125rem` |
| `--kui-text-lg`     | `1.5rem`   |
| `--kui-text-xl`     | `2.75rem`  |
| `--kui-text-2xl`    | `4rem`     |

## Layout

```
variables/
├── index.css       # @imports the three files below — the build entry point
├── colors.css
├── spacing.css
└── typography.css
dist/
├── tokens.css      # generated: the three files inlined into one
└── tokens.css.map
```

## Editing tokens

Change a value in `variables/`, never in `dist/` — that directory is generated
and overwritten on every build.

```bash
yarn workspace @kousta-ui/styles build     # variables/index.css → dist/tokens.css
yarn workspace @kousta-ui/styles dev       # rebuild on change
yarn workspace @kousta-ui/styles lint      # stylelint
```

The build is a small PostCSS script (`build.js`) that flattens the `@import`
chain with `postcss-import` and writes a source map alongside the output.

> [!IMPORTANT]
> Adding a new token means rebuilding the packages that consume it —
> `yarn build` at the repository root does both in order.

## License

MIT © Oussama Tailba
