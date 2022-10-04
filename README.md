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

`fresh-turnstile` provides a default POST handler for easy server-side form validations.

You may use it like this in your route:

```tsx
import { CfTurnstileValidationResult, generatePostHandler } from "$turnstile/handlers/CfTurnstileValidation.ts";

import Page from "$flowbite/components/Page.tsx";

export const handler = { POST: generatePostHandler(cf_turnstile_secret_key) };

export default function CfTurnstileValidation({ data }: PageProps<CfTurnstileValidationResult | null>) {
  // 3 scenarios can occur here:
  // 1. data is null => the form was not submitted correctly, or the secret key was not provided.
  // 2. data.success is false => the form was submitted correctly, but validation failed. data["error-codes"] should be a list of error codes (as strings).
  // 3. data.success is true => the form was submitted correctly and validated successfully. data.challenge_ts and data.hostname should be available for inspection.
}
```

## A note about versioning

For now, the versions are `a.b.c-x.y.z` where `a.b.c` is the plugin version and `x.y.z` is the supported Turnstile API version.
For example, `0.0.1-0` is the initial release of plugin, which supports Turnstile API v0.

All tags starting with `0.0.` are **mutable**. Expect breaking changes!
Starting from `0.1.`, tags will be **immutable**. However, still expect breaking changes.
Starting from `1.`, semver will kick in and there will be no breaking changes until `2.`.
