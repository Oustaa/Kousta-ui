<div align="center">

# `@kousta-ui/helpers`

**Read and write nested object properties from a string path** — the tiny
utility that lets Kousta&nbsp;UI accept `"location.address"` wherever a value is
expected.

[![npm](https://img.shields.io/npm/v/@kousta-ui/helpers?color=9141ac&label=npm)](https://www.npmjs.com/package/@kousta-ui/helpers)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![deps](https://img.shields.io/badge/dependencies-none-success)](package.json)

[Documentation](https://ui.kousta.org/docs/helpers/overview) ·
[Components](../components) ·
[Table](../table) ·
[Hooks](../hooks)

</div>

---

## Why this exists

`DataTable` headers and `Select` options are configured with strings:

```ts
{ value: "location.address" }
{ value: "id", label: "first_name last_name" }
```

These two functions are what turns those strings into values. They're published
on their own because the path resolver does something a plain `a?.b?.c` lookup
doesn't: it reads a **whole template**, so one string can pull several fields
and keep the literal text between them.

## Install

```bash
npm i @kousta-ui/helpers
```

```bash
yarn add @kousta-ui/helpers
```

## `getNestedProperty`

```ts
getNestedProperty<T>(obj: Record<string, unknown>, key: string): T | undefined
```

Resolve one path, or several at once.

```ts
import { getNestedProperty } from "@kousta-ui/helpers";

const user = {
  _id: 234,
  first_name: "Oussama",
  last_name: "Tailba",
  versions: { name: "@latest", date: { year: 2024 } },
};

getNestedProperty(user, "first_name"); // "Oussama"
getNestedProperty(user, "versions.name"); // "@latest"
getNestedProperty(user, "versions.date.year"); // 2024
```

**Several keys in one string.** Whitespace and punctuation are kept as-is, and
each bare word is looked up:

```ts
getNestedProperty(user, "first_name last_name"); // "Oussama Tailba"
getNestedProperty(user, "(first_name) (_id)"); // "(Oussama) (234)"
```

That is why a `Select` can be configured with
`options={{ value: "id", label: "first_name last_name" }}` and render a full
name without a `renderOption` function.

| Character                                | Treated as                                            |
| ---------------------------------------- | ----------------------------------------------------- |
| `.`                                      | Path separator — descends into the object             |
| `_` `-`                                  | Part of the key — `first_name` is one lookup, not two |
| `(` `)` `[` `]` `{` `}` `/` `\|` _space_ | Literal text, copied into the result                  |

> [!NOTE]
> A multi-key template always returns a **string**, since the pieces are
> concatenated. A single key returns the value at that path with its own type —
> a number, an array, an object — so type the call site with the generic:
> `getNestedProperty<number>(user, "_id")`.

## `updateNestedProperties`

```ts
updateNestedProperties<T>(obj: T, key: string, newValue: unknown): T
```

Write to a path, creating any missing objects along the way.

```ts
import { updateNestedProperties } from "@kousta-ui/helpers";

updateNestedProperties(user, "versions.name", "@LTS");
// { …, versions: { name: "@LTS", date: { year: 2024 } } }

updateNestedProperties(user, "meta.tags.primary", "ui");
// intermediate objects are created as needed
```

> [!WARNING]
> The copy is **shallow**. A top-level write (`"name"`) leaves the source object
> untouched, but a nested write (`"versions.name"`) mutates the nested object,
> which the returned value still shares with the original. Treat the result as
> the new value and stop using the input — or deep-clone first if the source has
> to stay intact.

## TypeScript

Types ship with the package. Both functions are generic:

```ts
const year = getNestedProperty<number>(user, "versions.date.year");
const next = updateNestedProperties(user, "versions.name", "@LTS"); // typeof user
```

## Development

From the repository root:

```bash
yarn workspace @kousta-ui/helpers build   # tsc declarations + rollup bundles
yarn workspace @kousta-ui/helpers dev     # rebuild on change
yarn jest packages/helpers                # run the tests
```

Output: `esm/` (ES modules), `cjs/` (CommonJS), `lib/` (`.d.ts`).

## License

MIT © Oussama Tailba
