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
