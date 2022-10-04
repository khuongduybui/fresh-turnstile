import { Plugin } from "$fresh/server.ts";
import { PluginRenderContext } from "$fresh/src/server/types.ts";

export type TurnstilePluginOptions = Record<never, never>;

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
