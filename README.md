# fresh-turnstile

[Cloudflare Turnstile](https://www.cloudflare.com/lp/turnstile/) [plugin](https://fresh.deno.dev/docs/concepts/plugins) for
[Deno Fresh](https://fresh.deno.dev/).

## Installation

First of all, create [your fresh app](https://fresh.deno.dev/docs/getting-started/create-a-project).

Add Turnstile to your `import_map.json`.

```json
{
  "imports": {
    "$turnstile/": "https://raw.githubusercontent.com/khuongduybui/fresh-turnstile/0.0.3-0/"
  }
}
```

Consume the Turnstile plugin in your app's `main.ts`.

```ts
import { TurnstilePlugin } from "$turnstile/index.ts";

await start(manifest, {
  plugins: [
    // ...
    TurnstilePlugin(),
    // ...
  ],
});
```

## Client-side Rendering

### Implicit Rendering

#### Protecting a form

Add `<CfTurnstile sitekey="..." />` inside your form. A hidden input named `cf-turnstile-response` will be added to your form with the token value once a
response is received from Turnstile. See the instructions in the [server-side validation](#server-side-validation) section further below for easy server-side
handling.

Please note that if you use AJAX / fetch to submit the form, you will need to call `getTurnstileAsync()` to get access to the `turnstile` object and then
invokes `turnstile.reset(widgetId)` to get a fresh token. See the section on [explicit rendering](#explicit-rendering) below for more instructions on how to get
access to the `turnstile` object. The `id` attribute you provide to `<CfTurnstile />` gets passthrough directly to the widget, so you can use that ID as
`widgetId` in `turnstile.getResponse(widgetId)` and `turnstile.reset(widgetId)`.

#### Protecting a page

You can add the `callback`, `errorCallback`, and `expiredCallback` props on `<CfTurnstile />` and dynamically handle these events.

The following code sample displays the response token on the page when it's received from Turnstile.

```tsx
import { useSignal } from "@preact/signals";
// ...
const response = useSignal("Waiting for validation...");
// ...
<CfTurnstile sitekey={sitekey} {...props} callback={(token) => response.value = token} />
<pre>{response}</pre>
```

**Note**: for implicit rendering, the [official docs](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) describe
`data-callback`, `data-error-callback`, and `data-expired-callback` as strings (function names) that get invoked later. However, this plugin makes uses of
`useId` and `useEffect` hooks to allow you to provide the callable props directly to `callback`, `errorCallback`, and `expiredCallback`.

#### Disable implicit rendering

Add the `disableImplicitRendering` option to your plugin declaration. (See the [installation](#installation) section above again for more information.)

```ts
await start(manifest, {
  plugins: [
    // ...
    TurnstilePlugin({ disableImplicitRendering: true }),
    // ...
  ],
});
```

Once you have disabled implicit rendering, see the next section to [explicitly render](#explicit-rendering) your Turnstile widgets.

### Explicit Rendering

You can get the `turnstile` global object from inside a `useEffect` hook like this:

```tsx
import { useEffect } from "preact/hooks";
import { getTurnstileAsync } from "$turnstile/plugin.ts";
//...
useEffect(() => {
  getTurnstileAsync().then((turnstile) => {
    // console.log(turnstile);
  });
});
```

Or you can directly use the `useTurnstileEffect` hook:

```tsx
import { useTurnstileEffect } from "$turnstile/plugin.ts";
// ...
useTurnstileEffect((turnstile) => {
  // console.log(turnstile);
});
```

Once you have got ahold of the `turnstile` object within an effect hook, you can now call `turnstile.render(...)` similar to how it is shown in
[official docs](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget).

## Server-side Validation

`fresh-turnstile` provides a default POST handler for easy server-side form validations.

You may use it like this in your route:

```tsx
import { CfTurnstileValidationResult, generatePostHandler } from "$turnstile/handlers/CfTurnstileValidation.ts";

import Page from "$flowbite/components/Page.tsx";

export const handler = { POST: generatePostHandler(cf_turnstile_secret_key) };

export default function CfTurnstileValidation({ data }: PageProps<CfTurnstileValidationResult | null>) {
  /* 3 scenarios can occur here:
   * 1. data is null => the form was not submitted correctly, or the secret key was not provided.
   * 2. data.success is false => the form was submitted correctly, but validation failed. data["error-codes"] should be a list of error codes (as strings).
   * 3. data.success is true => the form was submitted correctly and validated successfully. data.challenge_ts and data.hostname should be available for inspection.
   */
}
```

## A note about versioning

For now, the versions are `a.b.c-x.y.z` where `a.b.c` is the plugin version and `x.y.z` is the supported Turnstile API version. For example, `0.0.1-0` is the
initial release of plugin, which supports Turnstile API v0.

All tags starting with `0.0.` are **mutable**. Expect breaking changes! Starting from `0.1.`, tags will be **immutable**. However, still expect breaking
changes. Starting from `1.`, semver will kick in and there will be no breaking changes until `2.`.
