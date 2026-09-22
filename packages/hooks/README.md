<div align="center">

# `@kousta-ui/hooks`

**Four small React hooks, zero dependencies.** The stateful bits Kousta&nbsp;UI
needed often enough to extract — useful on their own, with or without the rest
of the library.

[![npm](https://img.shields.io/npm/v/@kousta-ui/hooks?color=9141ac&label=npm)](https://www.npmjs.com/package/@kousta-ui/hooks)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![deps](https://img.shields.io/badge/dependencies-none-success)](package.json)

[Documentation](https://ui.kousta.org/docs/hooks/overview) ·
[Components](../components) ·
[Table](../table) ·
[Helpers](../helpers)

</div>

---

## Install

```bash
npm i @kousta-ui/hooks
```

```bash
yarn add @kousta-ui/hooks
```

No stylesheet, no provider, no peer dependency beyond React itself.

## The hooks

| Hook                                          | One line                                               |
| --------------------------------------------- | ------------------------------------------------------ |
| [`useDisclosure`](#usedisclosure)             | Open / closed state for modals, drawers and menus      |
| [`useScrollLock`](#usescrolllock)             | Freeze page scroll without the layout jumping          |
| [`usePagination`](#usepagination)             | Page, limit and total, with bounds checked for you     |
| [`useDebounceCallback`](#usedebouncecallback) | Debounce a callback, always calling the latest version |

---

### `useDisclosure`

```ts
const { opened, open, close, toggle } = useDisclosure(initial?: boolean);
```

A boolean and the three functions you always end up writing next to it.

```tsx
import { useDisclosure } from "@kousta-ui/hooks";

function Drawer() {
  const { opened, open, close, toggle } = useDisclosure(false);

  return (
    <>
      <button onClick={toggle}>Menu</button>
      {opened && <aside onBlur={close}>…</aside>}
    </>
  );
}
```

---

### `useScrollLock`

```ts
const { lockScroll, unlockScroll } = useScrollLock();
```

Sets `overflow: hidden` on `<body>` **and** compensates for the scrollbar width
with matching padding — so locking the page doesn't shift your layout sideways.

```tsx
const { lockScroll, unlockScroll } = useScrollLock();

useEffect(() => {
  if (opened) lockScroll();
  return unlockScroll;
}, [opened]);
```

> [!NOTE]
> Both functions are stable across renders, so they're safe in dependency
> arrays. Cleanup is yours to call — this hook never touches `<body>` on unmount
> by itself.

---

### `usePagination`

```ts
const {
  page, limit, total, totalPages,
  nextPage, prevPage, setPage, setLimit, setTotal,
} = usePagination({ total, page?, limit? }); // page: 1, limit: 10
```

Holds the three numbers a paginated view needs and derives `totalPages` from
them. Every mutator is bounds-checked — `nextPage` on the last page, `prevPage`
on the first, and `setPage` outside `1…totalPages` are all no-ops, so you never
have to guard at the call site.

```tsx
import { usePagination } from "@kousta-ui/hooks";
import { Pagination } from "@kousta-ui/components";

function Products() {
  const { page, limit, totalPages, setPage, setTotal } = usePagination({
    total: 0,
  });

  useEffect(() => {
    api.products({ page, limit }).then((res) => setTotal(res.total));
  }, [page, limit]);

  return <Pagination page={page} totalPages={totalPages} onChange={setPage} />;
}
```

Pairs directly with the table's `pagination` prop — see
[`@kousta-ui/table`](../table).

---

### `useDebounceCallback`

```ts
const debounced = useDebounceCallback(callback, delayMs);
```

Returns a debounced version of your function. The timer resets on every call,
and the callback is held in a ref — so the invocation that eventually fires uses
the **latest** props and state, not the ones captured when the timer started.

```tsx
const search = useDebounceCallback((term: string) => {
  api.search(term, { filters }); // reads today's `filters`, not yesterday's
}, 400);

<input onChange={(e) => search(e.target.value)} />;
```

The returned function is stable as long as `delay` doesn't change.

---

## TypeScript

Types ship with the package. `useDebounceCallback` preserves your callback's
parameter types:

```ts
const fn = useDebounceCallback((id: number, q: string) => {}, 300);
fn(1, "abc"); // ✅
fn("1"); // ✗ type error
```

## Development

From the repository root:

```bash
yarn workspace @kousta-ui/hooks build   # tsc declarations + rollup bundles
yarn workspace @kousta-ui/hooks dev     # rebuild on change
yarn jest packages/hooks                # run the tests
```

Output: `esm/` (ES modules), `cjs/` (CommonJS), `lib/` (`.d.ts`).

## License

MIT © Oussama Tailba
