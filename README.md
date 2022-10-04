# fresh-turnstile
[Cloudflare Turnstile](https://www.cloudflare.com/lp/turnstile/) [plugin](https://fresh.deno.dev/docs/concepts/plugins) for [Deno Fresh](https://fresh.deno.dev/).

## Installation

First of all, create [your fresh app](https://fresh.deno.dev/docs/getting-started/create-a-project).

Add Turnstile to your `import_map.json`.
```json
{
  "imports": {
    "$turnstile/": "https://raw.githubusercontent.com/khuongduybui/fresh-turnstile/0.0.1-0/",
  }
}
```

Consume the Turnstile plugin in your app's `main.ts`.
```ts
import { TurnstilePlugin } from "$turnstile/index.ts";

await start(manifest, { plugins: [
  ...
  TurnstilePlugin(),
  ...
] });
```

## Client-side Rendering

### Implicit Rendering

#### Protecting a page

@TODO

#### Protecting a form

Add `<CfTurnstile sitekey="..." />` inside your form.

#### Disable implicit rendering

@TODO

### Explicit Rendering

@TODO

### Global access

@TODO

## Server-side Validation

@TODO

## A note about versioning

For now, the versions are `a.b.c-x.y.z` where `a.b.c` is the plugin version and `x.y.z` is the supported Turnstile API version.
For example, `0.0.1-0` is the initial release of plugin, which supports Turnstile API v0.

All tags starting with `0.0.` are **mutable**. Expect breaking changes!
Starting from `0.1.`, tags will be **immutable**. However, still expect breaking changes.
Starting from `1.`, semver will kick in and there will be no breaking changes until `2.`.
