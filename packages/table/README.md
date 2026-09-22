<div align="center">

# `@kousta-ui/table`

**A data table that does the boring parts for you** — sorting, search,
pagination, totals, row actions, bulk selection, column toggling and card view,
from one `headers` object.

[![npm](https://img.shields.io/npm/v/@kousta-ui/table?color=9141ac&label=npm)](https://www.npmjs.com/package/@kousta-ui/table)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![react](https://img.shields.io/badge/react-%E2%89%A517-61dafb)](https://react.dev)

[Documentation](https://ui.kousta.org/docs/Table/DataTable/overview) ·
[Components](../components) ·
[Hooks](../hooks) ·
[Helpers](../helpers)

</div>

---

## Why this package

A table is never _just_ a table — it grows a search box, then sorting, then
pagination, then "export selected", then a mobile layout. `DataTable` ships all
of that behind one declarative prop:

- **One source of truth.** `headers` describes the columns _and_ what each one
  can do — render, sort, total, hide.
- **Static or server-driven, same component.** Sort and paginate in the browser,
  or hand every interaction to your API. You pick per feature.
- **Every interaction is reportable.** `options.props.set` hands you the table's
  full state so you can put it in the URL or local storage and restore it later.
- **Layouts included.** Table view, card view, expandable rows and modal
  detail views are configuration, not a rewrite.
- **Nothing is locked in.** Icons, empty states, loading indicators, every
  `<table>`/`<tr>`/`<td>` prop and every class name is overridable.

## Install

```bash
npm i @kousta-ui/table
```

```bash
yarn add @kousta-ui/table
```

Peer dependencies: `react >= 17`, `react-dom >= 17`.
`@kousta-ui/components`, `@kousta-ui/hooks` and `@kousta-ui/helpers` come along
as regular dependencies.

## Quick start

```tsx
import { DataTable, type THeader } from "@kousta-ui/table";

// once, at your app root
import "@kousta-ui/table/esm/index.css";

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  location: { address: string; zipCode: string };
};

const headers: THeader<User> = {
  Name: { value: "name", sortBy: {} },
  Age: { value: "age", sortBy: {}, total: {} },
  Email: { value: "email" },
  Address: { value: "location.address" },
  "Zip code": {
    exec: (row) => <code>{row.location.zipCode}</code>,
  },
};

export default function Users({ users }: { users: User[] }) {
  return (
    <DataTable<User>
      title="users"
      data={users}
      headers={headers}
      loading={false}
      keyExtractor={(row) => row.id}
    />
  );
}
```

> [!IMPORTANT]
> The stylesheet import is required once, anywhere in your app. Without it the
> table renders unstyled.

## The `headers` object

The key is the column label; the value says how the column behaves.

| Field     | Type                          | What it does                                                                                       |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `value`   | `string`                      | Key path into the row — `"name"`, or `"location.address"` for nested data                          |
| `exec`    | `(row) => ReactNode`          | Render the cell yourself. Mutually exclusive with `value`                                          |
| `sortBy`  | `{ name?, sortFunc? }`        | Makes the header clickable. `name` is what gets sent to your API, `sortFunc` handles complex types |
| `total`   | `boolean \| { name?, func? }` | Adds a totals row. `func` replaces the default sum                                                 |
| `visible` | `boolean`                     | Whether the column starts shown — users can toggle it                                              |
| `canSee`  | `boolean`                     | Permission gate; a `false` column never renders at all                                             |

```ts
const headers: THeader<Product> = {
  Product: { value: "designation", sortBy: {} },
  Category: { value: "category.name", sortBy: { name: "category" } }, // API wants "category"
  Price: { value: "price", sortBy: {}, total: {} },
  Stock: { value: "qte", total: { func: (prev, cur) => prev + cur } },
  Internal: { value: "cost", canSee: user.isAdmin },
};
```

## Static vs. dynamic

This is the one decision worth making up front — it applies per feature, and the
same component handles both.

|                | **Static**                                              | **Dynamic**                                              |
| -------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| **Sorting**    | The table reorders `data` itself                        | Header click calls `actions.get`; you return sorted rows |
| **Search**     | `actions.search.static: true` + an `onSearch` predicate | `onSearch` receives params; you query the server         |
| **Pagination** | `pagination.type: "static"` — the table slices `data`   | Default. You feed it one page at a time                  |

```tsx
// Static: everything is already in memory
<DataTable
  data={allUsers}
  pagination={{ total: allUsers.length, page: 1, limit: 10, type: "static" }}
  actions={{ search: { static: true, onSearch: (row, { reg }) => reg.test(row.name) } }}
/>

// Dynamic: the server is the source of truth
<DataTable
  data={page.items}
  pagination={{ total: page.total, page: page.number, limit: 10 }}
  actions={{ get: (params) => fetchUsers(params) }}
/>
```

> [!NOTE]
> `pagination.type: "static"` controls **slicing only**. The footer still calls
> `actions.get` on a page change — pass one or the other, not both.

## Features at a glance

| Feature                           | Prop                                  | Docs                                                                                |
| --------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| Sorting                           | `headers[col].sortBy`                 | [Sorting](https://ui.kousta.org/docs/Table/DataTable/Sorting)                       |
| Search                            | `actions.search`                      | [Search](https://ui.kousta.org/docs/Table/DataTable/Search)                         |
| Pagination                        | `pagination`                          | [Pagination](https://ui.kousta.org/docs/Table/DataTable/Pagination)                 |
| Totals row                        | `headers[col].total`                  | [Total](https://ui.kousta.org/docs/Table/DataTable/Total)                           |
| Row edit / delete / custom        | `actions`, `options.extraActions`     | [Actions](https://ui.kousta.org/docs/Table/DataTable/Actions)                       |
| Bulk actions on selected rows     | `options.bulkActions`                 | [Actions](https://ui.kousta.org/docs/Table/DataTable/Actions)                       |
| Card view & custom views          | `options.cards`, `options.extraviews` | [Views](https://ui.kousta.org/docs/Table/DataTable/Views)                           |
| Row detail (modal or expand)      | `options.viewComp`                    | [Views](https://ui.kousta.org/docs/Table/DataTable/Views)                           |
| Quick filters                     | `options.selectFilter`                | [Filtering](https://ui.kousta.org/docs/Table/DataTable/Filtering)                   |
| Saving & restoring state          | `options.props`                       | [Props preserving](https://ui.kousta.org/docs/Table/DataTable/PropsPreserving)      |
| Icons, element props, empty state | `config`                              | [Config](https://ui.kousta.org/docs/Table/DataTable/Config)                         |
| Defaults for every table          | `TablePropsProvider`                  | [TablePropsProvider](https://ui.kousta.org/docs/Table/DataTable/TablePropsProvider) |

### Row and bulk actions

```tsx
<DataTable<User>
  /* … */
  actions={{
    edit: { onEdit: (row) => open(row), canEdit: (row) => !row.locked },
    delete: { onDelete: (row) => remove(row.id) },
  }}
  options={{
    extraActions: [{ title: "Duplicate", onClick: (row) => duplicate(row) }],
    bulkActions: [
      {
        title: "Export",
        onClick: (rows, clearSelected) => exportCsv(rows).then(clearSelected),
      },
    ],
  }}
/>
```

### Remembering where the user was

`options.props.set` is called with the table's whole state plus the table title,
so one handler can serve every table in your app:

```tsx
options={{
  props: {
    set: (props, tableTitle) =>
      localStorage.setItem(tableTitle, JSON.stringify(props)),
    get: () => JSON.parse(localStorage.getItem("users") ?? "{}"),
  },
}}
```

> [!NOTE]
> `get` restores `query`, `sortBy`, `direction` and `displayAs`. Page and limit
> are **not** restored through it — pass those via the `pagination` prop.
> See the [props-preserving guide](https://ui.kousta.org/docs/Table/DataTable/PropsPreserving)
> for the URL-query-param recipe and the current limitations.

## Also exported

`Table` is the unstyled-behaviour primitive underneath — plain `<table>`
semantics with the `kui-*` classes, for when you want markup control and none of
the machinery:

```tsx
import { Table } from "@kousta-ui/table";

<Table.Root>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Name</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    <Table.Tr>
      <Table.Td>Oussama</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table.Root>;
```

`TablePropsProvider` sets defaults — icons, action titles, element props,
`noHead`, `disableContextMenu` — for every table beneath it.

## Styling

Every element carries a stable `kui-*` class alongside its scoped module class:

```css
.kui-dtable-th-content {
  text-transform: none;
}
.kui-table-tr:hover {
  background: var(--kui-neutral-100);
}
```

Colors, spacing and type come from the `--kui-*` custom properties in
[`@kousta-ui/styles`](../styles) — override them on `:root`.

## TypeScript

```ts
import type {
  THeader,
  THeaderValue,
  TableProps,
  TOptions,
} from "@kousta-ui/table";
```

`DataTable<T>` is generic: `value` key paths, `exec(row)`, `keyExtractor` and
every action callback are all typed against your row.

## Development

From the repository root:

```bash
yarn workspace @kousta-ui/table build   # tsc declarations + rollup bundles
yarn workspace @kousta-ui/table dev     # rebuild on change
yarn jest packages/table                # run the tests
yarn table:demo                         # live playground app
```

Output: `esm/` (ES modules + `index.css`), `cjs/` (CommonJS), `lib/` (`.d.ts`).

> [!TIP]
> The docs site consumes the **built** output, not the source — run a build
> before checking a change in `yarn docs:dev`.

## License

MIT © Oussama Tailba
