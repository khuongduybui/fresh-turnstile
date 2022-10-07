import { Plugin } from "$fresh/server.ts";
import { PluginRenderContext } from "$fresh/src/server/types.ts";

export type TurnstilePluginOptions = {
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#disable-implicit-rendering
  disableImplicitRendering?: boolean;
};
export function TurnstilePlugin(options?: TurnstilePluginOptions): Plugin {
  return {
    name: "turnstile",
    entrypoints: { "main": import.meta.resolve("./plugin.ts") },
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
