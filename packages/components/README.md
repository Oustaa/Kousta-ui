<div align="center">

# `@kousta-ui/components`

**The building blocks of Kousta&nbsp;UI** — buttons, modals, menus, selects and the
small primitives everything else is assembled from.

[![npm](https://img.shields.io/npm/v/@kousta-ui/components?color=9141ac&label=npm)](https://www.npmjs.com/package/@kousta-ui/components)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![react](https://img.shields.io/badge/react-%E2%89%A517-61dafb)](https://react.dev)

[Documentation](https://ui.kousta.org/docs/Components/overview) ·
[Table package](../table) ·
[Hooks](../hooks) ·
[Helpers](../helpers)

</div>

---

## Why this package

Most component libraries make you choose between _"style it yourself"_ and
_"fight the defaults"_. This one aims for a third option:

- **Sensible out of the box.** Every component works with zero configuration.
- **Overridable everywhere.** Icons, labels, class names and element props are
  props, not forks.
- **Configured once.** `ComponentPropsProvider` sets defaults for a whole tree,
  so you don't repeat `variant="primary"` on 200 buttons.
- **Plain CSS variables.** Theming is `--kui-*` custom properties — no build
  step, no CSS-in-JS runtime, no theme object.
- **Typed properly.** Generic components infer your row types; impossible prop
  combinations are impossible to write.

## Install

```bash
npm i @kousta-ui/components
```

```bash
yarn add @kousta-ui/components
```

Peer dependencies: `react >= 17`, `react-dom >= 17`.

## Quick start

```tsx
import { Modal, Button, Group } from "@kousta-ui/components";
import { useDisclosure } from "@kousta-ui/hooks";

// once, at your app root
import "@kousta-ui/components/esm/index.css";

export default function App() {
  const { opened, open, close } = useDisclosure(false);

  return (
    <Group gap="1rem">
      {/* Controlled — you own the state */}
      <Button variant="primary" onClick={open}>
        Open
      </Button>
      <Modal opened={opened} onClose={close} position="center" title="Hello">
        Controlled modal
      </Modal>

      {/* Uncontrolled — the modal owns its state, and renders its own trigger */}
      <Modal modalTrigger="Open me" position="right-top" fullHeight size="lg">
        Uncontrolled modal
      </Modal>
    </Group>
  );
}
```

> [!IMPORTANT]
> The stylesheet import is required once, anywhere in your app. Without it the
> components render unstyled.

## What's inside

| Component                                                                                | What it does                                                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`Button`](https://ui.kousta.org/docs/Components/Button)                                 | 5 colors × 4 styles, three sizes, built-in loading state                  |
| [`Modal`](https://ui.kousta.org/docs/Components/Modal)                                   | Controlled _or_ self-managed, 9 anchor positions, lifecycle hooks         |
| [`Menu`](https://ui.kousta.org/docs/Components/Menu)                                     | Compound dropdown — `Menu.Target`, `Menu.DropDown`, `Menu.Item`…          |
| [`ContextMenu`](https://ui.kousta.org/docs/Components/ContextMenu)                       | Right-click menu with groups, separators and nested sub-menus             |
| [`Select`](https://ui.kousta.org/docs/Components/Select)                                 | Searchable, clearable, multi-select, custom option rendering              |
| [`AsyncSelect`](https://ui.kousta.org/docs/Components/AsyncSelect)                       | `Select` + paginated fetching, infinite scroll and debounced search       |
| [`Input`](https://ui.kousta.org/docs/Components/Input)                                   | Native input plus label, errors, left/right sections                      |
| [`Label`](https://ui.kousta.org/docs/Components/Label)                                   | The label primitive the form controls share                               |
| [`FormElement`](https://ui.kousta.org/docs/Components/FormElement)                       | Label + control + error layout, horizontal or vertical                    |
| [`Group`](https://ui.kousta.org/docs/Components/Group)                                   | Flex row/column that merges adjacent children into one unit               |
| [`Pagination`](https://ui.kousta.org/docs/Components/Pagination)                         | Page list with configurable siblings and ellipsis truncation              |
| [`ErrorBoundary`](https://ui.kousta.org/docs/Components/ErrorBoundary)                   | Catches render errors, shows a fallback instead of a blank page           |
| [`WindowBoundary`](https://ui.kousta.org/docs/Components/WindowBoundary)                 | `IntersectionObserver` wrapper — enter/exit callbacks, once or every time |
| [`ComponentPropsProvider`](https://ui.kousta.org/docs/Components/ComponentPropsProvider) | Tree-wide defaults for every component above                              |

## A closer look

### Buttons

`variant` is `color` or `color-style`, so the whole matrix is one string:

```tsx
<Button variant="primary">Primary</Button>
<Button variant="danger-outline">Delete</Button>
<Button variant="success-light" size="sm">Approve</Button>
<Button variant="neutral-link" loading>Saving…</Button>
```

Colors: `primary` · `success` · `warning` · `danger` · `neutral`
Styles: _(solid)_ · `outline` · `light` · `link`

### Selects

`options` maps _your_ data shape onto the control — `value` and `label` are key
paths, resolved by [`@kousta-ui/helpers`](../helpers), so `label` can interpolate
several fields at once:

```tsx
<Select<User>
  data={users}
  options={{ value: "id", label: "first_name last_name" }}
  label="Assignee"
  seachable
  clearable
  onChange={(id) => setAssignee(id)}
/>
```

`AsyncSelect` swaps `data` for a `getData` function and handles paging for you:

```tsx
<AsyncSelect<Product>
  getData={({ page, limit, searchTerm }) =>
    api.products({ page, limit, q: searchTerm })
  }
  extractDynamicData={(res) => res.products}
  hasMore={(res, page) => page < res.meta.last_page}
  options={{
    value: "id",
    renderOption: (row) => `#${row.id} — ${row.designation}`,
  }}
  searchTimeout={400}
/>
```

### Menus

```tsx
<Menu.Menu type="click" position="Bottom-Start">
  <Menu.Target>
    <Button variant="neutral-outline">Account</Button>
  </Menu.Target>
  <Menu.DropDown>
    <Menu.Label>Signed in as Oussama</Menu.Label>
    <Menu.Item leftSection={<UserIcon />}>Profile</Menu.Item>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item disabled>Sign out</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Set defaults once

Anything optional can be pushed up the tree. Components still accept the same
props locally — a prop you pass wins over the provider.

```tsx
<ComponentPropsProvider
  button={{ size: "md", variant: "primary" }}
  modal={{ withCloseBtn: true, closeOnClickOutside: true }}
  select={{ clearable: false, emptyMessage: "Nothing here yet" }}
  pagination={{ seblings: 2 }}
>
  <App />
</ComponentPropsProvider>
```

## Styling

Every element carries a stable, unhashed `kui-*` class next to its scoped module
class, so you can target it from your own stylesheet without `!important`:

```css
.kui-button {
  border-radius: 999px;
}
```

Global look and feel comes from CSS custom properties — override them on
`:root`:

```css
:root {
  --kui-primary-600: #2563eb;
  --kui-spacing-base: 0.875rem;
}
```

The full token list lives in [`@kousta-ui/styles`](../styles).

## TypeScript

Types ship with the package; no `@types/*` needed. Generic components take your
row type and infer the rest:

```ts
import type {
  ButtonProps,
  ModalProps,
  SelectProps,
} from "@kousta-ui/components";
```

Some props are mutually exclusive by design. A `Modal` is either controlled
(`opened` + `onClose`) or uncontrolled (`modalTrigger`) — mixing them is a type
error rather than a runtime surprise.

## Development

From the repository root:

```bash
yarn workspace @kousta-ui/components build   # tsc declarations + rollup bundles
yarn workspace @kousta-ui/components dev     # rebuild on change
yarn jest packages/components                # run the tests
yarn components:demo                         # live playground app
```

Output: `esm/` (ES modules + `index.css`), `cjs/` (CommonJS), `lib/` (`.d.ts`).

## License

MIT © Oussama Tailba
