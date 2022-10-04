import { Plugin } from "$fresh/server.ts";
import { PluginRenderContext } from "$fresh/src/server/types.ts";

export type TurnstilePluginOptions = {
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#disable-implicit-rendering
  disableImplicitRendering?: boolean;
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget
  onload?: string;
};
export function TurnstilePlugin(options?: TurnstilePluginOptions): Plugin {
  return {
    name: "turnstile",
    entrypoints: { "main": "$turnstile/plugin.ts" },
    render(ctx: PluginRenderContext) {
      ctx.render();
      return {
        scripts: [
          {
            entrypoint: "main",
            state: options ?? {},
          },
        ],
      };
    },
  };
}
